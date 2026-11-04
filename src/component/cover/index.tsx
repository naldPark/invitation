import { LazyDiv } from "../lazyDiv"
import { CeremonyVideoButton } from "../ceremonyVideo"

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <CeremonyVideoButton />
      <h2 className="english">Thank you</h2>
      <div className="message">
        <p>함께해 주셔서 감사합니다.</p>
        <p>귀한 걸음으로 축복해 주신</p>
        <p>모든 분들께 진심으로 감사드립니다.</p>
      </div>
      <div className="names">
        재원
        <div className="divider" />
        영익
      </div>
      <div className="info">2026년 10월 17일</div>
    </LazyDiv>
  )
}
