/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect } from "react"
import { StoreContext } from "./context"

const NAVER_MAP_CLIENT_ID = "ubunas3akp"
const KAKAO_SDK_JS_KEY = "a430452224cfcb3ee2eea019ba05725c"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`
const KAKAO_SDK_URL = `https://developers.kakao.com/sdk/js/kakao.min.js`

export const useNaver = () => {
  const { naver, setNaver } = useContext(StoreContext)
  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID) {
      return
    }

    if (!document.querySelector(`script[src="${NAVER_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.src = NAVER_MAP_URL
      document.head.appendChild(script)
      script.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
    }
  }, [setNaver])

  return naver
}

const initKakao = (setKakao: (kakao: any) => void) => {
  const Kakao = (window as any).Kakao
  if (!Kakao) {
    return
  }
  if (!Kakao.isInitialized()) {
    Kakao.init(KAKAO_SDK_JS_KEY)
  }
  setKakao(Kakao)
}

export const useKakao = () => {
  const { kakao, setKakao } = useContext(StoreContext)
  useEffect(() => {
    if (!KAKAO_SDK_JS_KEY) {
      return
    }

    if (document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      initKakao(setKakao)
      return
    }

    const script = document.createElement("script")
    script.addEventListener("load", () => initKakao(setKakao))
    script.src = KAKAO_SDK_URL
    document.head.appendChild(script)
  }, [setKakao])

  return kakao
}
