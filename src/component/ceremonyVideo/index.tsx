import { useEffect, useState } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import PlayIcon from "../../icons/play-icon.svg?react"
import { SHOW_FORCE } from "../../config"

dayjs.extend(utc)
dayjs.extend(timezone)

const VIDEO_URL = "https://youtu.be/Z0lnA7Amg1M"

const SHOW_FROM = dayjs.tz("2026-10-17 11:10", "Asia/Seoul")

export const CeremonyVideoButton = () => {
  const [visible, setVisible] = useState(
    () => SHOW_FORCE || !dayjs().tz("Asia/Seoul").isBefore(SHOW_FROM),
  )

  useEffect(() => {
    if (SHOW_FORCE || visible) return

    const tick = () => {
      if (!dayjs().tz("Asia/Seoul").isBefore(SHOW_FROM)) {
        setVisible(true)
      }
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [visible])

  if (!visible) return null

  return (
    <div className="ceremony-video">
      <a
        className="ceremony-video-link"
        href={VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayIcon className="play-icon" />
        식중영상 보러가기
      </a>
    </div>
  )
}
