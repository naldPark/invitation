import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"
import coverImage from "../../images/cover.webp"
import { LazyDiv } from "../lazyDiv"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

const WEDDING_DATE = dayjs.tz("2026-10-17 11:20", "Asia/Seoul")
const WEDDING_DATE_FORMAT = "YYYY년 MMMM D일 dddd A h시 m분"

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>
      <div className="image-wrapper">
        <img src={coverImage} alt="sample" />
      </div>
      <div className="subtitle">Save the date for the wedding of</div>
      <div className="names">
        재원
        <div className="divider" />
        영익
      </div>
      <div className="info">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</div>
      <div className="info">분당앤스퀘어</div>
    </LazyDiv>
  )
}
