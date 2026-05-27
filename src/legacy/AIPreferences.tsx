import { useCallback, useRef, useState } from 'react'
import './AIPreferences.css'

const imgCellularConnection = 'https://www.figma.com/api/mcp/asset/dfad98d7-f7bf-4607-a56f-8046eab55a96'
const imgWifi = 'https://www.figma.com/api/mcp/asset/df61dd5f-cb4e-4d82-a59c-c2a8bd86e3f5'
const imgBattery = 'https://www.figma.com/api/mcp/asset/9fec367f-abd3-4ace-ba0c-77ecd3ff8c9e'
const imgObject = 'https://www.figma.com/api/mcp/asset/d31c17cb-0d23-4574-bb0f-0c9b365f4546'
const imgUnion2 = 'https://www.figma.com/api/mcp/asset/efff024c-28d5-49d3-9994-0ad4628c74d9'
const imgIcon = 'https://www.figma.com/api/mcp/asset/8f0d09a1-b070-4982-a0be-ab3d280168cf'
const imgStar1 = 'https://www.figma.com/api/mcp/asset/d057fb5c-1f87-4473-b8bf-5e9558401e52'
const imgStar2 = 'https://www.figma.com/api/mcp/asset/e75947eb-d5b8-4cc2-9bb4-15b0de63c995'
const imgBackArrow = 'https://www.figma.com/api/mcp/asset/ca6776fd-2457-4bb2-a873-667b1adc7be3'
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/ac8f337b-7070-4c86-895a-fd42b3f911e5'
const imgImage15 = 'https://www.figma.com/api/mcp/asset/49d04f9b-19d0-435f-8e1e-d547cfda6707'
const imgEllipse3083 = 'https://www.figma.com/api/mcp/asset/8bb52bb7-0cce-489e-bf8e-422d48b14d67'
const imgEllipse3084 = 'https://www.figma.com/api/mcp/asset/8d4852b6-4099-4d82-bd05-cde473bb9955'
const imgEllipse3085 = 'https://www.figma.com/api/mcp/asset/5aa85018-8bd7-4d1c-9cb3-a0d564dc48a4'
const imgEllipse3086 = 'https://www.figma.com/api/mcp/asset/dadf3c43-a074-4488-8484-9c8d7a9e62ab'
const imgEllipse3087 = 'https://www.figma.com/api/mcp/asset/9256c489-eb7a-4f29-ad56-b155589a00de'
const imgEllipse3088 = 'https://www.figma.com/api/mcp/asset/c827ed47-c80a-4a46-941f-dbc37e5afcb7'
const imgEllipse3089 = 'https://www.figma.com/api/mcp/asset/21a49313-0aca-4fb0-b5c3-340cebcd2793'
const imgVector2775 = 'https://www.figma.com/api/mcp/asset/677eeb99-c50f-4069-b0a2-9fe530b710ad'
const imgVector2776 = 'https://www.figma.com/api/mcp/asset/61b2e88c-32ff-4c1c-b142-5d18d26b8e23'
const imgVector2777 = 'https://www.figma.com/api/mcp/asset/d2950975-8fda-457b-9c14-f3866c955cf9'
const imgVector2778 = 'https://www.figma.com/api/mcp/asset/c5fab3af-67f9-49a6-b7f8-5f9b47915116'
const imgVector2779 = 'https://www.figma.com/api/mcp/asset/637cdbff-c43d-4aa1-8487-0df971caba0c'
const imgVector2780 = 'https://www.figma.com/api/mcp/asset/b7745902-ab49-487f-bfaf-c1becd8049a1'
const imgVector2781 = 'https://www.figma.com/api/mcp/asset/160912e9-7bc8-49fa-85bf-2fde599fbba4'

// ===== Constants for slider geometry =====
const TRACK_W = 345
const THUMB_W = 36
const THUMB_MIN_LEFT = 2
const THUMB_MAX_LEFT = TRACK_W - 2 - THUMB_W // 307
const CENTER_X = TRACK_W / 2 // 172.5

function thumbLeftFromValue(v: number) {
  return THUMB_MIN_LEFT + v * (THUMB_MAX_LEFT - THUMB_MIN_LEFT)
}

function valueFromThumbLeft(left: number) {
  return Math.max(0, Math.min(1, (left - THUMB_MIN_LEFT) / (THUMB_MAX_LEFT - THUMB_MIN_LEFT)))
}

function fillFromThumbLeft(thumbLeft: number) {
  const fillLeft = Math.max(2, Math.min(thumbLeft - 4, CENTER_X - 22))
  const fillRight = Math.max(2, TRACK_W - Math.max(thumbLeft + THUMB_W + 4, CENTER_X + 22))
  return { fillLeft, fillRight }
}

// ===== Draggable Slider =====
type SliderProps = {
  label: string
  leftText: string
  rightText: string
  value: number
  onChange: (v: number) => void
}

function PreferenceSlider({ label, leftText, rightText, value, onChange }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!trackRef.current || !dragging.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left - THUMB_W / 2
    onChange(valueFromThumbLeft(x))
  }, [onChange])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    handleMove(e.clientX)
  }, [handleMove])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    handleMove(e.clientX)
  }, [handleMove])

  const handlePointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  const thumbLeft = thumbLeftFromValue(value)
  const { fillLeft, fillRight } = fillFromThumbLeft(thumbLeft)

  // Choose tick image based on position (just visual consistency)
  const tickImg = label === '幽默' ? imgVector2776 : imgVector2775

  return (
    <div className="ap-sliderGroup">
      <p className="ap-sliderLabel">{label}</p>
      <div
        className="ap-track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="ap-trackBg" />
        <div className="ap-fill" style={{ left: fillLeft, right: fillRight }} />
        <div className="ap-tickMark" style={{ left: 'calc(50%)' }}>
          <img src={tickImg} alt="" />
        </div>
        <div className="ap-thumb" style={{ left: thumbLeft }}>
          <img src={imgEllipse3083} alt="" draggable={false} />
        </div>
      </div>
      <div className="ap-sliderEnds">
        <span>{leftText}</span>
        <span>{rightText}</span>
      </div>
    </div>
  )
}

// ===== Content Length Selector =====
type LengthOption = '简短' | '标准' | '详尽'

const LENGTH_POSITIONS: Record<LengthOption, number> = {
  '简短': 3,
  '标准': 117.5,
  '详尽': 232,
}

const LENGTH_SUBS: Partial<Record<LengthOption, string[]>> = {
  '简短': ['简洁段落', '覆盖主要信息'],
  '标准': ['中等篇幅', '兼顾细节与效率'],
  '详尽': ['完整展开', '深入分析每个要点'],
}

function ContentLengthSelector({ active, onSelect }: { active: LengthOption; onSelect: (o: LengthOption) => void }) {
  const options: LengthOption[] = ['简短', '标准', '详尽']
  const activeLeft = LENGTH_POSITIONS[active]
  const sub = LENGTH_SUBS[active]

  return (
    <div className="ap-lengthTrack">
      <div className="ap-lengthBg" />
      {/* Active indicator */}
      <div className="ap-lengthActive" style={{ left: activeLeft }}>
        <span className="ap-lengthActiveLabel">{active}</span>
        {sub && (
          <div className="ap-lengthActiveSub">
            {sub.map((s) => <span key={s}>{s}</span>)}
          </div>
        )}
      </div>
      {/* Tick marks */}
      <div className="ap-lengthTick" style={{ left: 'calc(33.3% + 0.5px)' }}>
        <img src={imgVector2777} alt="" />
      </div>
      <div className="ap-lengthTick" style={{ left: 'calc(66.6% + 0.5px)' }}>
        <img src={imgVector2777} alt="" />
      </div>
      {/* Clickable zones */}
      {options.map((opt, i) => (
        <div
          key={opt}
          className="ap-lengthZone"
          style={{ left: `${i * 33.33}%`, width: '33.33%' }}
          onClick={() => onSelect(opt)}
        >
          {opt !== active && (
            <span className="ap-lengthInactiveLabel">{opt}</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ===== Time Row =====
function TimeRow({ label, day, time, onDayClick, onTimeClick }: {
  label: string
  day: string
  time: string
  onDayClick: () => void
  onTimeClick: () => void
}) {
  return (
    <div className="ap-timeRow">
      <span className="ap-timeLabel">{label}</span>
      <div className="ap-timePill">
        <span className="ap-timeVal ap-timeClickable" onClick={onDayClick}>{day}</span>
        <div className="ap-timeSep">
          <img src={imgVector2781} alt="" />
        </div>
        <span className="ap-timeVal ap-timeClickable" onClick={onTimeClick}>{time}</span>
      </div>
    </div>
  )
}

// ===== Day/Time Picker Popover =====
function PickerPopover({ options, onSelect, onClose }: {
  options: string[]
  onSelect: (v: string) => void
  onClose: () => void
}) {
  return (
    <div className="ap-pickerOverlay" onClick={onClose}>
      <div className="ap-picker" onClick={(e) => e.stopPropagation()}>
        {options.map((opt) => (
          <div key={opt} className="ap-pickerItem" onClick={() => { onSelect(opt); onClose() }}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== Toast =====
function Toast({ message }: { message: string }) {
  return <div className="ap-toast">{message}</div>
}

// ===== Main Component =====
export default function AIPreferences() {
  // Slider states (initial values from Figma)
  const [empathy, setEmpathy] = useState(0.823)    // 共情
  const [humor, setHumor] = useState(0.489)         // 幽默
  const [criticism, setCriticism] = useState(0.207)  // 批判

  // Content length
  const [contentLength, setContentLength] = useState<LengthOption>('简短')

  // Time settings
  const [weekDay, setWeekDay] = useState('每周日')
  const [weekTime, setWeekTime] = useState('20:00')
  const [monthDay, setMonthDay] = useState('每月1日')
  const [monthTime, setMonthTime] = useState('18:00')

  // Picker state
  const [picker, setPicker] = useState<{ options: string[]; onSelect: (v: string) => void } | null>(null)

  // Toast
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 1500)
  }

  const dayOptions = ['每周一', '每周二', '每周三', '每周四', '每周五', '每周六', '每周日']
  const timeOptions = ['18:00', '19:00', '20:00', '21:00', '22:00']
  const monthDayOptions = ['每月1日', '每月5日', '每月10日', '每月15日']

  // Personality speech bubble content based on slider values
  const getSpeechText = () => {
    if (humor > 0.7) return '恭喜你解锁「三连熬」成就，你的枕头已经在考虑提交离职报告了。要不今晚给它个面子？'
    if (empathy > 0.7) return '听起来你最近很辛苦呢，要不要聊聊？有时候说出来就会好很多。'
    if (criticism > 0.7) return '你的时间管理需要改进，建议先列出优先级再行动，别总被琐事牵着走。'
    return '恭喜你解锁「三连熬」成就，你的枕头已经在考虑提交离职报告了。要不今晚给它个面子？'
  }

  return (
    <div className="ap-page">
      <div className="ap-phone">
        {/* Top gradient overlay */}
        <div className="ap-topBar">
          <div className="ap-status">
            <div className="ap-statusInner">
              <div className="ap-statusTime">9:41</div>
              <div className="ap-statusIcons">
                <img className="ap-iconCell" src={imgCellularConnection} alt="" />
                <img className="ap-iconWifi" src={imgWifi} alt="" />
                <img className="ap-iconBatt" src={imgBattery} alt="" />
              </div>
            </div>
          </div>
          <div className="ap-nav">
            <div className="ap-navBack" onClick={() => showToast('返回上一页')}>
              <img src={imgBackArrow} alt="" />
            </div>
            <span className="ap-navTitle">AI 偏好</span>
            <div className="ap-navPlaceholder" />
          </div>
          <div className="ap-saveBtn" onClick={() => showToast('偏好已保存')}>保存</div>
        </div>

        {/* Scrollable content */}
        <div className="ap-scroll">
          {/* ====== Card 1: MindBack 人格 ====== */}
          <div className="ap-card1">
            <div className="ap-card1-decor" aria-hidden="true"><img src={imgObject} alt="" /></div>
            <div className="ap-card1-dot1" aria-hidden="true"><img src={imgEllipse3084} alt="" /></div>
            <div className="ap-card1-dot2" aria-hidden="true"><img src={imgEllipse3086} alt="" /></div>
            <div className="ap-card1-dot3" aria-hidden="true"><img src={imgEllipse3087} alt="" /></div>
            <div className="ap-card1-dot4" aria-hidden="true"><img src={imgEllipse3085} alt="" /></div>

            <div className="ap-badge" style={{ left: 24, top: 18 }}>
              <div className="ap-badgeIcon"><img src={imgIcon} alt="" /></div>
              <span className="ap-badgeText" style={{ color: '#78aafa' }}>MindBack 人格</span>
            </div>

            <div className="ap-card1-content">
              <div className="ap-personality">
                <div className="ap-personalityHead">
                  <div className="ap-titleRow">
                    <span className="ap-titleText">段子手顾问</span>
                    <div className="ap-star1"><img src={imgStar1} alt="" /></div>
                    <div className="ap-star2"><img src={imgStar2} alt="" /></div>
                  </div>
                  <p className="ap-desc">嘻嘻哈哈中把问题拆解了，你还没反应过来。</p>
                </div>

                <div className="ap-bubble">
                  <img className="ap-bubbleBg" src={imgUnion2} alt="" />
                  <p className="ap-bubbleText">{getSpeechText()}</p>
                </div>
              </div>

              <PreferenceSlider label="共情" leftText="就事论事" rightText="先抱再说" value={empathy} onChange={setEmpathy} />
              <PreferenceSlider label="幽默" leftText="严肃正经" rightText="嘴欠但可爱" value={humor} onChange={setHumor} />
              <PreferenceSlider label="批判" leftText="温柔陪伴" rightText="直说不装" value={criticism} onChange={setCriticism} />
            </div>
          </div>

          {/* ====== Card 2: 内容与节奏偏好 ====== */}
          <div className="ap-card2">
            <div className="ap-card2-decor" aria-hidden="true"><img src={imgImage15} alt="" /></div>
            <div className="ap-card2-star" aria-hidden="true"><img src={imgVector2779} alt="" /></div>
            <div className="ap-card2-starSmall" aria-hidden="true"><img src={imgVector2780} alt="" /></div>
            <div className="ap-card2-dot1" aria-hidden="true"><img src={imgEllipse3088} alt="" /></div>
            <div className="ap-card2-dot2" aria-hidden="true"><img src={imgEllipse3089} alt="" /></div>

            <div className="ap-badge" style={{ left: 24, top: 18 }}>
              <div className="ap-badgeIcon"><img src={imgIcon1} alt="" /></div>
              <span className="ap-badgeText" style={{ color: '#916964' }}>内容与节奏偏好</span>
            </div>

            <div className="ap-card2-content">
              <div className="ap-lengthSection">
                <p className="ap-sectionTitle">内容篇幅</p>
                <ContentLengthSelector active={contentLength} onSelect={setContentLength} />
              </div>

              <div className="ap-divider"><img src={imgVector2778} alt="" /></div>

              <div className="ap-timeSection">
                <div className="ap-timeHeader">
                  <p className="ap-sectionTitle">发送时间</p>
                  <p className="ap-timeHint">
                    周记最早可在当周周日 19:00 发送，月章最早可在次月 1 日 19:00 发送。
                  </p>
                </div>
                <div className="ap-timeRows">
                  <TimeRow
                    label="周记推送时间"
                    day={weekDay}
                    time={weekTime}
                    onDayClick={() => setPicker({ options: dayOptions, onSelect: setWeekDay })}
                    onTimeClick={() => setPicker({ options: timeOptions, onSelect: setWeekTime })}
                  />
                  <TimeRow
                    label="月章推送时间"
                    day={monthDay}
                    time={monthTime}
                    onDayClick={() => setPicker({ options: monthDayOptions, onSelect: setMonthDay })}
                    onTimeClick={() => setPicker({ options: timeOptions, onSelect: setMonthTime })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Picker popover */}
        {picker && (
          <PickerPopover
            options={picker.options}
            onSelect={picker.onSelect}
            onClose={() => setPicker(null)}
          />
        )}

        {/* Toast */}
        {toast && <Toast message={toast} />}
      </div>
    </div>
  )
}
