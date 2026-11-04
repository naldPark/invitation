import PlayIcon from "../../icons/play-icon.svg?react"

const VIDEO_URL = "https://youtu.be/Z0lnA7Amg1M"

export const CeremonyVideoButton = () => {
  return (
    <div className="ceremony-video">
      <a
        className="ceremony-video-link"
        href={VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayIcon className="play-icon" />
        식중 애니메이션 보러가기
      </a>
    </div>
  )
}
