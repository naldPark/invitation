import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          분당앤스퀘어
          <div className="detail">경기 성남시 분당구 탄천상로151번길 20 4층</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 수인분당 <b>오리역 6번 출구</b> 
            <br />
            → 6번 출구 에스컬레이터 이용
            <br />
            → 도보로 50m 이동
          </div>
          <div />
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비 등 이용
            <br />
            <b>분당앤스퀘어</b> 검색
          </div>
          <div />
          <div className="content">
            <b>
              ※ 편안한 방문을 위해 넉넉한 주차 공간을 준비하였습니다.
            </b>
            <br />
            <b>
              ※ 주차는 최대 2시간까지 무료로 이용하실 수 있습니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
