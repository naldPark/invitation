import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"

const GROOM_INFO = [
  {
    relation: "신랑",
    name: "신재원",
    account: "신한은행 110-374-689758",
  },
  {
    relation: "신랑 아버지",
    name: "신민용",
    account: "국민은행 213-24-0367-900",
  },
  {
    relation: "신랑 어머니",
    name: "정유진",
    account: "신한은행 110-423-419934",
  },
]

const BRIDE_INFO = [
  {
    relation: "신부",
    name: "박영익",
    account: "카카오뱅크 3333-01-1204413",
  },
  {
    relation: "신부 아버지",
    name: "박원기",
    account: "하나은행 4459-1026-8153-07",
  },
  {
    relation: "신부 어머니",
    name: "강경란",
    account: "농협 134-12-133332",
  },
]

export const Information = () => {
  const { openModal, closeModal } = useModal()

  return (
    <>
      <LazyDiv className="card information">
        <h2 className="english">Information</h2>
        <div className="info-card">
          <div className="label">식사 안내</div>
          <div className="content">장소: 5층 연회장에서 준비됩니다.</div>
          <div className="content">시간: 오전 10시 50분부터 이용 가능합니다.</div>
        </div>
      </LazyDiv>
      <LazyDiv className="card information">
        <div className="info-card">
          <div className="label">마음 전하기</div>
          <div className="content">
            참석이 어려워 직접 축하해주지 못하는
            <br />
            분들을 위해 계좌번호를 기재하였습니다.
            <br />
            넓은 마음으로 양해 부탁드립니다.
          </div>

          <div className="break" />

          <Button
            style={{ width: "100%" }}
            onClick={() => {
              openModal({
                className: "donation-modal",
                closeOnClickBackground: true,
                header: <div className="title">신랑측 계좌번호</div>,
                content: (
                  <>
                    {GROOM_INFO.map(({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            try {
                              navigator.clipboard.writeText(account)
                              alert(account + "\n복사되었습니다.")
                            } catch {
                              alert("복사에 실패했습니다.")
                            }
                          }}
                        >
                          복사하기
                        </Button>
                      </div>
                    ))}
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
            신랑측 계좌번호 보기
          </Button>
          <div className="break" />
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              openModal({
                className: "donation-modal",
                closeOnClickBackground: true,
                header: <div className="title">신부측 계좌번호</div>,
                content: (
                  <>
                    {BRIDE_INFO.map(({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            try {
                              navigator.clipboard.writeText(account)
                              alert(account + "\n복사되었습니다.")
                            } catch {
                              alert("복사에 실패했습니다.")
                            }
                          }}
                        >
                          복사하기
                        </Button>
                      </div>
                    ))}
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
            신부측 계좌번호 보기
          </Button>
        </div>
      </LazyDiv>
    </>
  )
}
