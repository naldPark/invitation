import { useEffect, useRef, useState, type MouseEvent } from "react"
import DownloadIcon from "../../icons/download-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { PhotoViewer } from "./photoViewer"

// src/images 와 src/images/album 안의 webp가 파일 이름 순으로 올라갑니다.
const photoModules = {
  ...import.meta.glob<string>("../../images/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }),
  ...import.meta.glob<string>("../../images/album/*.webp", {
    eager: true,
    import: "default",
    query: "?url",
  }),
}

const photos = Object.entries(photoModules)
  .sort(([a], [b]) =>
    fileName(a).localeCompare(fileName(b), "en", { numeric: true }),
  )
  .map(([path, src]) => ({ src, name: fileName(path) }))

const EAGER_COUNT = 6

function fileName(path: string) {
  const clean = path.split("?")[0]
  return clean.split("/").pop() ?? clean
}

async function downloadPhoto(src: string, filename: string) {
  const response = await fetch(src)
  if (!response.ok) throw new Error("사진을 받지 못했습니다.")
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export const Gallery = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [loaded, setLoaded] = useState<Set<number>>(
    () =>
      new Set(
        Array.from(
          { length: Math.min(EAGER_COUNT, photos.length) },
          (_, index) => index,
        ),
      ),
  )

  useEffect(() => {
    const root = gridRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const nextIndexes: number[] = []
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          nextIndexes.push(Number((entry.target as HTMLElement).dataset.index))
          observer.unobserve(entry.target)
        })
        if (nextIndexes.length === 0) return
        setLoaded((prev) => {
          const next = new Set(prev)
          nextIndexes.forEach((index) => next.add(index))
          return next
        })
      },
      { rootMargin: "900px 0px" },
    )

    root
      .querySelectorAll<HTMLElement>("[data-index]")
      .forEach((cell) => observer.observe(cell))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (viewerIndex === null) return
    ;[viewerIndex - 1, viewerIndex + 1].forEach((index) => {
      const photo = photos[index]
      if (!photo) return
      const image = new Image()
      image.src = photo.src
    })
  }, [viewerIndex])

  const onDownload = async (
    event: MouseEvent<HTMLButtonElement>,
    src: string,
    name: string,
  ) => {
    event.stopPropagation()
    if (downloading) return
    setDownloading(src)
    try {
      await downloadPhoto(src, name)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <LazyDiv className="card album">
      <h2 className="english">Gallery</h2>
      {photos.length > 0 ? (
        <>
          <p className="album-count">{photos.length}장의 사진</p>
          <div className="photo-grid" ref={gridRef}>
            {photos.map((photo, index) => (
              <div key={photo.src} className="photo-cell" data-index={index}>
                <button
                  type="button"
                  className="photo-open"
                  aria-label={`사진 ${index + 1} 크게 보기`}
                  onClick={() => setViewerIndex(index)}
                >
                  {loaded.has(index) && (
                    <img
                      src={photo.src}
                      alt=""
                      decoding="async"
                      draggable={false}
                      onLoad={(event) => {
                        event.currentTarget
                          .closest(".photo-cell")
                          ?.classList.add("ready")
                      }}
                    />
                  )}
                </button>
                {loaded.has(index) && (
                  <button
                    type="button"
                    className="photo-download"
                    aria-label={`사진 ${index + 1} 저장`}
                    disabled={downloading === photo.src}
                    onClick={(event) =>
                      onDownload(event, photo.src, photo.name)
                    }
                  >
                    <DownloadIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="album-empty">사진을 준비하고 있어요.</p>
      )}
      {viewerIndex !== null && (
        <PhotoViewer
          src={photos[viewerIndex].src}
          index={viewerIndex}
          total={photos.length}
          onClose={() => setViewerIndex(null)}
          onPrev={() =>
            setViewerIndex((current) =>
              current === null || current <= 0 ? current : current - 1,
            )
          }
          onNext={() =>
            setViewerIndex((current) =>
              current === null || current >= photos.length - 1
                ? current
                : current + 1,
            )
          }
        />
      )}
    </LazyDiv>
  )
}
