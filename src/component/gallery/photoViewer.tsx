import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react"

const MIN_SCALE = 1
const MAX_SCALE = 4
const DOUBLE_TAP_MS = 280

type Props = {
  src: string
  onClose: () => void
}

type Point = { x: number; y: number }

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const PhotoViewer = ({ src, onClose }: Props) => {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  const scaleRef = useRef(1)
  const translateRef = useRef({ x: 0, y: 0 })
  const pinchRef = useRef<{
    startDistance: number
    startScale: number
    startTranslate: Point
    startMidpoint: Point
  } | null>(null)
  const panRef = useRef<{
    startPoint: Point
    startTranslate: Point
    moved: boolean
  } | null>(null)
  const lastTapRef = useRef<{ time: number; point: Point } | null>(null)
  const singleTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pinchedRef = useRef(false)

  const applyTransform = useCallback(
    (nextScale: number, nextTranslate: Point) => {
      const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE)
      const finalTranslate =
        clampedScale === MIN_SCALE ? { x: 0, y: 0 } : nextTranslate

      scaleRef.current = clampedScale
      translateRef.current = finalTranslate
      setScale(clampedScale)
      setTranslate(finalTranslate)
    },
    [],
  )

  useEffect(() => {
    document.body.classList.add("photo-viewer-open")
    return () => {
      document.body.classList.remove("photo-viewer-open")
      if (singleTapTimerRef.current) clearTimeout(singleTapTimerRef.current)
    }
  }, [])

  const clearSingleTapTimer = () => {
    if (singleTapTimerRef.current) {
      clearTimeout(singleTapTimerRef.current)
      singleTapTimerRef.current = null
    }
  }

  const onTouchStart = (e: ReactTouchEvent) => {
    if (e.touches.length === 2) {
      clearSingleTapTimer()
      lastTapRef.current = null
      pinchedRef.current = true
      const a = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      const b = { x: e.touches[1].clientX, y: e.touches[1].clientY }
      panRef.current = null
      pinchRef.current = {
        startDistance: distance(a, b),
        startScale: scaleRef.current,
        startTranslate: { ...translateRef.current },
        startMidpoint: midpoint(a, b),
      }
      return
    }

    if (e.touches.length === 1) {
      const point = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      panRef.current = {
        startPoint: point,
        startTranslate: { ...translateRef.current },
        moved: false,
      }
      pinchedRef.current = false

      const now = Date.now()
      const lastTap = lastTapRef.current
      if (
        lastTap &&
        now - lastTap.time < DOUBLE_TAP_MS &&
        distance(point, lastTap.point) < 40
      ) {
        clearSingleTapTimer()
        lastTapRef.current = null
        panRef.current = null
        if (scaleRef.current > MIN_SCALE) {
          applyTransform(MIN_SCALE, { x: 0, y: 0 })
        } else {
          applyTransform(2.5, { x: 0, y: 0 })
        }
        return
      }
      lastTapRef.current = { time: now, point }
    }
  }

  const onTouchMove = (e: ReactTouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault()
      const a = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      const b = { x: e.touches[1].clientX, y: e.touches[1].clientY }
      const nextDistance = distance(a, b)
      const nextMidpoint = midpoint(a, b)
      const { startDistance, startScale, startTranslate, startMidpoint } =
        pinchRef.current

      applyTransform(startScale * (nextDistance / startDistance), {
        x: startTranslate.x + (nextMidpoint.x - startMidpoint.x),
        y: startTranslate.y + (nextMidpoint.y - startMidpoint.y),
      })
      return
    }

    if (e.touches.length === 1 && panRef.current) {
      const point = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      const dx = point.x - panRef.current.startPoint.x
      const dy = point.y - panRef.current.startPoint.y

      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        panRef.current.moved = true
        clearSingleTapTimer()
        lastTapRef.current = null
      }

      if (scaleRef.current > MIN_SCALE) {
        e.preventDefault()
        applyTransform(scaleRef.current, {
          x: panRef.current.startTranslate.x + dx,
          y: panRef.current.startTranslate.y + dy,
        })
      }
    }
  }

  const onTouchEnd = (e: ReactTouchEvent) => {
    if (e.touches.length < 2) {
      pinchRef.current = null
    }

    if (e.touches.length === 0) {
      const wasMoved = panRef.current?.moved ?? false
      panRef.current = null

      if (scaleRef.current < 1.05) {
        applyTransform(MIN_SCALE, { x: 0, y: 0 })
      }

      if (
        !wasMoved &&
        !pinchedRef.current &&
        scaleRef.current === MIN_SCALE &&
        lastTapRef.current
      ) {
        clearSingleTapTimer()
        singleTapTimerRef.current = setTimeout(() => {
          if (scaleRef.current === MIN_SCALE) onClose()
        }, DOUBLE_TAP_MS)
      }
    }
  }

  return (
    <div className="photo-viewer">
      <button
        type="button"
        className="photo-viewer-close"
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className="photo-viewer-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <img
          src={src}
          alt="갤러리 사진"
          draggable={false}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          }}
        />
      </div>
    </div>
  )
}
