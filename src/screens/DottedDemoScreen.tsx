import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import dotsActionAddCircle from '../assets/dotted/dots-action-add-circle.svg'
import dotsActionCamera from '../assets/dotted/dots-action-camera.svg'
import dotsActionKeyboard from '../assets/dotted/dots-action-keyboard.svg'
import dotsChipCameraGuide from '../assets/dotted/dots-chip-camera-guide.svg'
import dotsChipGoods from '../assets/dotted/dots-chip-goods.svg'
import dotsChipOutfit from '../assets/dotted/dots-chip-outfit.svg'
import dotsChipTravel from '../assets/dotted/dots-chip-travel.svg'
import dotsNavBack from '../assets/dotted/dots-nav-back.svg'
import dotsNavMore from '../assets/dotted/dots-nav-more.svg'
import dotsStatusCap from '../assets/dotted/dots-status-cap.svg'
import dotsStatusCellular from '../assets/dotted/dots-status-cellular.svg'
import dotsStatusWifi from '../assets/dotted/dots-status-wifi.svg'

const prompts = [
  { label: '穿搭指南', icon: dotsChipOutfit },
  { label: '好物买手', icon: dotsChipGoods },
  { label: '旅行攻略', icon: dotsChipTravel },
  { label: '上帝摄像机', icon: dotsChipCameraGuide },
]

export function DottedDemoScreen() {
  const chipsRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 })
  const releaseTimerRef = useRef<number | null>(null)
  const [chipsElasticX, setChipsElasticX] = useState(0)
  const [isChipsReleasing, setIsChipsReleasing] = useState(false)

  const releaseChips = () => {
    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current)
    }
    setIsChipsReleasing(true)
    setChipsElasticX(0)
    releaseTimerRef.current = window.setTimeout(() => {
      setIsChipsReleasing(false)
      releaseTimerRef.current = null
    }, 360)
  }

  const setBoundedElastic = (value: number) => {
    setIsChipsReleasing(false)
    setChipsElasticX(Math.max(-24, Math.min(24, value)))
  }

  const handleChipsWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    if (!el) return

    const delta = Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const atStart = el.scrollLeft <= 0
    const atEnd = el.scrollLeft >= maxScrollLeft - 1

    if ((atStart && delta < 0) || (atEnd && delta > 0)) {
      event.preventDefault()
      setBoundedElastic(delta < 0 ? 16 : -16)
      window.setTimeout(releaseChips, 90)
      return
    }

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      el.scrollLeft += event.deltaY
    }
  }

  const handleChipsPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    if (!el) return

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
    }
    el.setPointerCapture(event.pointerId)
    setIsChipsReleasing(false)
  }

  const handleChipsPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    const drag = dragRef.current
    if (!el || !drag.active) return

    const deltaX = event.clientX - drag.startX
    const nextScrollLeft = drag.startScrollLeft - deltaX
    const maxScrollLeft = el.scrollWidth - el.clientWidth

    if (nextScrollLeft < 0) {
      el.scrollLeft = 0
      setBoundedElastic(-nextScrollLeft * 0.28)
      return
    }

    if (nextScrollLeft > maxScrollLeft) {
      el.scrollLeft = maxScrollLeft
      setBoundedElastic((maxScrollLeft - nextScrollLeft) * 0.28)
      return
    }

    el.scrollLeft = nextScrollLeft
    if (chipsElasticX !== 0) setChipsElasticX(0)
  }

  const handleChipsPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    dragRef.current.active = false
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }
    releaseChips()
  }

  return (
    <div className="dotted-demo-page" data-node-id="1417:539">
      <div className="dotted-demo">
        <div className="dotted-demo__topbar" data-node-id="1417:540">
          <div className="dotted-demo__statusbar" data-node-id="1417:541">
            <div className="dotted-demo__status-time">9:41</div>
            <div className="dotted-demo__status-levels" aria-hidden="true">
              <img className="dotted-demo__cellular" src={dotsStatusCellular} alt="" />
              <img className="dotted-demo__wifi" src={dotsStatusWifi} alt="" />
              <span className="dotted-demo__battery">
                <img className="dotted-demo__battery-cap" src={dotsStatusCap} alt="" />
                <span className="dotted-demo__battery-fill" />
              </span>
            </div>
          </div>
        </div>

        <nav className="dotted-demo__nav" aria-label="点点导航">
          <button className="dotted-demo__nav-btn" type="button" aria-label="返回">
            <img src={dotsNavBack} alt="" aria-hidden="true" />
          </button>
          <div className="dotted-demo__title">点点</div>
          <button className="dotted-demo__nav-btn" type="button" aria-label="更多">
            <img src={dotsNavMore} alt="" aria-hidden="true" />
          </button>
        </nav>

        <main className="dotted-demo__blank" aria-label="空白对话区" />

        <div className="dotted-demo__dock">
          <div
            className="dotted-demo__chips"
            aria-label="快捷提示"
            ref={chipsRef}
            onWheel={handleChipsWheel}
            onPointerDown={handleChipsPointerDown}
            onPointerMove={handleChipsPointerMove}
            onPointerUp={handleChipsPointerUp}
            onPointerCancel={handleChipsPointerUp}
          >
            <div
              className={`dotted-demo__chips-track${isChipsReleasing ? ' dotted-demo__chips-track--release' : ''}`}
              style={{ transform: `translateX(${chipsElasticX}px)` }}
            >
              {prompts.map((prompt) => (
                <button className="dotted-demo__chip" type="button" key={prompt.label}>
                  <img src={prompt.icon} alt="" aria-hidden="true" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dotted-demo__composer">
            <div className="dotted-demo__voice-row">
              <div className="dotted-demo__leading-area">
                <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                  <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                </button>
              </div>

              <button className="dotted-demo__voice" type="button">按住说话</button>

              <div className="dotted-demo__trailing-area">
                <button className="dotted-demo__round-btn" type="button" aria-label="键盘">
                  <img src={dotsActionKeyboard} alt="" aria-hidden="true" />
                </button>
                <button className="dotted-demo__round-btn" type="button" aria-label="拍照">
                  <img src={dotsActionCamera} alt="" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="dotted-demo__ai-note">内容由 AI 生成</div>
          </div>
        </div>
      </div>
    </div>
  )
}
