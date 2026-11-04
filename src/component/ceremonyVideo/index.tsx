import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import PlayIcon from "../../icons/play-icon.svg?react"

const VIDEO_SRC = "/ceremony/index.m3u8"

export const CeremonyVideoButton = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const attachedRef = useRef(false)
  const openRef = useRef(false)
  const historyRef = useRef(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => {
      if (!openRef.current) return
      openRef.current = false
      historyRef.current = false
      videoRef.current?.pause()
      setOpen(false)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("ceremony-video-open", open)
    return () => document.body.classList.remove("ceremony-video-open")
  }, [open])

  useEffect(() => {
    return () => {
      hlsRef.current?.destroy()
      hlsRef.current = null
    }
  }, [])

  const startPlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (attachedRef.current) {
      video.play().catch(() => {})
      return
    }
    attachedRef.current = true

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC
      video.play().catch(() => {})
      return
    }

    if (!Hls.isSupported()) return
    const hls = new Hls({ maxBufferLength: 20, startFragPrefetch: true })
    hlsRef.current = hls
    hls.loadSource(VIDEO_SRC)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {})
    })
  }

  const openPlayer = () => {
    openRef.current = true
    playerRef.current?.classList.add("open")
    setOpen(true)
    startPlayback()
    if (historyRef.current) return
    window.history.pushState({ ceremonyVideo: true }, "")
    historyRef.current = true
  }

  const closePlayer = () => {
    openRef.current = false
    videoRef.current?.pause()
    setOpen(false)
    if (!historyRef.current) return
    historyRef.current = false
    window.history.back()
  }

  return (
    <div className="ceremony-video">
      <button type="button" className="ceremony-video-link" onClick={openPlayer}>
        <PlayIcon className="play-icon" />
        식중 애니메이션 보러가기
      </button>
      <div
        ref={playerRef}
        className={`ceremony-player${open ? " open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="식중 애니메이션"
      >
        <button
          type="button"
          className="ceremony-player-close"
          aria-label="닫기"
          onClick={closePlayer}
        />
        <video ref={videoRef} controls playsInline preload="none" />
      </div>
    </div>
  )
}
