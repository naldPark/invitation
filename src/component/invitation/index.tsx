import { Fragment } from "react/jsx-runtime"
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"
import { useKakao } from "../store"
const GROOM_INFO = [
  { relation: "신랑", name: "신재원", phone: "010-2578-8068" },
  { relation: "신랑 아버지", name: "신민용", phone: "010-2779-0514" },
  { relation: "신랑 어머니", name: "정유진", phone: "010-7372-8068" },
]

const BRIDE_INFO = [
  { relation: "신부", name: "박영익", phone: "010-9154-3073" },
  { relation: "신부 아버지", name: "박원기", phone: "010-4303-2073" },
  { relation: "신부 어머니", name: "강경란", phone: "010-3771-2073" },
]

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  const kakao = useKakao()
  const handleShare = () => {
    // 카카오 SDK가 아직 로드되지 않았을 때의 예외 처리
    if (!kakao) {
      alert("카카오톡 공유를 준비 중입니다. 잠시 후 다시 시도해 주세요.")
      return
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "재원 ❤️ 영익 결혼합니다",
        description: "저희의 첫 걸음에 소중한 분들을 초대합니다",
        imageUrl: "https://1017.life/preview_image.jpg",
        link: {
          mobileWebUrl: "https://1017.life",
          webUrl: "https://1017.life",
        },
      },
      itemContent: {
        profileText: "",
        profileImageUrl: "",
        titleImageUrl: "",
        titleImageText: "",
        titleImageCategory: "",
        items: [
          {
            item: "날짜",
            itemOp: "2026년 10월 17일 토요일",
          },
          {
            item: "시간",
            itemOp: "오전 11시 20분",
          },
          {
            item: "장소",
            itemOp: "분당앤스퀘어 4층 아모르홀",
          },
        ],
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: {
            mobileWebUrl: "https://1017.life",
            webUrl: "https://1017.life",
          },
        },
      ],
    })
  }
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">맑고 상쾌한 10월 17일,</div>
      <div className="content">사랑하는 여러분을 모시고</div>
      <div className="content">우리의 특별한 날을 함께하려 합니다.</div>
      <div className="break" />
      <div className="content">선선한 바람 속엔 따스함을 담고,</div>
      <div className="content">쌀쌀한 날엔 서로의 온기를 나누며</div>
      <div className="content">함께 웃는 부부가 되겠습니다.</div>
      <div className="break" />
      <div className="content">기쁜 날 함께하시어</div>
      <div className="content">우리의 앞날을 축복해주세요!</div>

      <div className="break" />

      <div className="name">
        신민용 · 정유진
        <span className="relation">
          의 <span className="relation-name">차남</span>
        </span>{" "}
        재원
      </div>
      <div className="name">
        박원기 · 강경란
        <span className="relation">
          의 <span className="relation-name">장녀</span>
        </span>{" "}
        영익
      </div>

      <div className="break" />

      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">축하 인사 전하기</div>
                <div className="subtitle">
                  전화, 문자메세지로 축하 인사를 전해보세요.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {GROOM_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="contact-info">
                  {BRIDE_INFO.map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ),
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                닫기
              </Button>
            ),
          })
        }}
      >
        연락하기
      </Button>
      <Button onClick={handleShare} style={{ marginTop: "5px" }}>
        청첩장 공유하기
      </Button>
    </LazyDiv>
  )
}
