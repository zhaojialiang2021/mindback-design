import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type WheelEvent } from 'react'
import dotsActionAddCircle from '../assets/dotted/dots-action-add-circle.svg'
import dotsActionCamera from '../assets/dotted/dots-action-camera.svg'
import dotsActionKeyboard from '../assets/dotted/dots-action-keyboard.svg'
import dotsActionSend from '../assets/dotted/dots-action-send.svg'
import dotsChipCameraGuide from '../assets/dotted/dots-chip-camera-guide.svg'
import dotsChipGoods from '../assets/dotted/dots-chip-goods.svg'
import dotsChipOutfit from '../assets/dotted/dots-chip-outfit.svg'
import dotsChipTravel from '../assets/dotted/dots-chip-travel.svg'
import dotsKeyboard from '../assets/dotted/dots-keyboard-ios-latest.png'
import dotsMessageTail from '../assets/dotted/dots-message-tail.svg'
import dotsMessageTailUser from '../assets/dotted/dots-message-tail-user.svg'
import dotsNavBack from '../assets/dotted/dots-nav-back.svg'
import dotsNavMore from '../assets/dotted/dots-nav-more.svg'
import dotsStatusCap from '../assets/dotted/dots-status-cap.svg'
import dotsStatusCellular from '../assets/dotted/dots-status-cellular.svg'
import dotsStatusWifi from '../assets/dotted/dots-status-wifi.svg'

type DemoStep = 'empty' | 'asked' | 'date' | 'created' | 'triggered'

type TaskMessage = {
  id: string
  role: 'user' | 'dots'
  text: string
  hasTail?: boolean
  isRecognizing?: boolean
  isCanceling?: boolean
  isLoading?: boolean
}

const prompts = [
  { label: '穿搭指南', icon: dotsChipOutfit, selectedIconClass: 'dotted-demo__selected-skill-icon--outfit' },
  { label: '好物买手', icon: dotsChipGoods, selectedIconClass: 'dotted-demo__selected-skill-icon--goods' },
  { label: '旅行攻略', icon: dotsChipTravel, selectedIconClass: 'dotted-demo__selected-skill-icon--travel' },
  { label: '上帝摄像机', icon: dotsChipCameraGuide, selectedIconClass: 'dotted-demo__selected-skill-icon--camera-guide' },
]

type SkillPrompt = (typeof prompts)[number]

const firstExample = '帮我盯北京到东京的机票，低于3000元通知我'
const dateExample = '7月20日出发，直飞优先'
const firstVoiceStages = ['帮我盯北京到东京的机票', '帮我盯北京到东京的机票，低于3000元', firstExample]
const dateVoiceStages = ['7月20日出发', '7月20日出发，直飞', dateExample]
const voiceWaveformBars = [4, 10, 14, 6, 8, 20, 10, 12, 10, 4, 10, 10, 16, 6, 12, 14, 8, 12, 8, 8, 16, 12, 12, 6, 12, 8, 8]

function DottedVoiceWaveform({ canceling = false }: { canceling?: boolean }) {
  return (
    <span className={`dotted-demo__voice-waveform${canceling ? ' dotted-demo__voice-waveform--canceling' : ''}`} aria-hidden="true">
      {voiceWaveformBars.map((height, index) => (
        <span
          className="dotted-demo__voice-waveform-bar"
          key={`${height}-${index}`}
          style={{ '--bar-height': `${height}px`, '--bar-delay': `${index * -38}ms` } as CSSProperties}
        />
      ))}
    </span>
  )
}

function DottedTaskMessage({ message }: { message: TaskMessage }) {
  return (
    <div
      className={`dotted-demo__chat-row dotted-demo__chat-row--${message.role}${message.isRecognizing ? ' dotted-demo__chat-row--recognizing' : ''}${message.isCanceling ? ' dotted-demo__chat-row--recognizing-cancel' : ''}`}
    >
      <div className={`dotted-demo__chat-bubble dotted-demo__chat-bubble--${message.role}`}>
        {message.isLoading ? (
          <span className="dotted-demo__recognition-loading" aria-label="正在识别语音">
            <span />
            <span />
            <span />
          </span>
        ) : (
          message.text
        )}
        {message.hasTail && (
          <img
            className={`dotted-demo__chat-tail dotted-demo__chat-tail--${message.role}`}
            src={message.role === 'user' ? dotsMessageTailUser : dotsMessageTail}
            alt=""
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}

function FlightTaskCard({
  mode,
  onConfirm,
}: {
  mode: 'confirm' | 'active' | 'triggered'
  onConfirm?: () => void
}) {
  const isTriggered = mode === 'triggered'
  const isConfirm = mode === 'confirm'

  return (
    <article className={`dotted-task-card dotted-task-card--${mode}`} aria-label="机票价格任务">
      <div className="dotted-task-card__head">
        <div>
          <div className="dotted-task-card__eyebrow">机票价格监听</div>
          <h2>北京 → 东京</h2>
        </div>
      </div>
      <div className="dotted-task-card__grid">
        <div>
          <span>出发日期</span>
          <strong>7月20日</strong>
        </div>
        <div>
          <span>价格阈值</span>
          <strong>¥3000 以下</strong>
        </div>
        <div>
          <span>偏好</span>
          <strong>直飞优先</strong>
        </div>
        <div>
          <span>通知</span>
          <strong>{isTriggered ? '已通知' : '到价提醒'}</strong>
        </div>
      </div>
      {isTriggered ? (
        <div className="dotted-task-card__price">
          <span>当前最低价</span>
          <strong>¥2890</strong>
        </div>
      ) : isConfirm ? (
        <div className="dotted-task-card__actions">
          <button className="mb-button mb-button--filled mb-button--medium" type="button" onClick={onConfirm}>
            确认创建
          </button>
        </div>
      ) : (
        <p>点点会持续检查价格变化。这里是 H5 演示模拟，不连接真实票务数据。</p>
      )}
    </article>
  )
}

function DottedTaskNotice() {
  return (
    <div className="dotted-task-notice" aria-label="模拟系统通知">
      <div className="dotted-task-notice__app">点点</div>
      <div className="dotted-task-notice__title">你盯的机票到价了</div>
      <div className="dotted-task-notice__body">北京到东京最低价已到 ¥2890</div>
    </div>
  )
}

export function DottedTaskDemoScreen() {
  const [step, setStep] = useState<DemoStep>('empty')
  const [messages, setMessages] = useState<TaskMessage[]>([])
  const [isInputActive, setIsInputActive] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<SkillPrompt | null>(null)
  const [chipsElasticX, setChipsElasticX] = useState(0)
  const [isChipsReleasing, setIsChipsReleasing] = useState(false)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [isVoiceCanceling, setIsVoiceCanceling] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [isVoiceLoading, setIsVoiceLoading] = useState(false)
  const chatStreamRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const voiceTimerRef = useRef<number | null>(null)
  const voiceIntervalRef = useRef<number | null>(null)
  const recognizedVoiceTextRef = useRef('')
  const voiceDragRef = useRef({
    canceling: false,
    pointerId: null as number | null,
    startY: 0,
  })
  const dragRef = useRef({
    active: false,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    pressedPrompt: null as SkillPrompt | null,
  })
  const suppressChipClickRef = useRef(false)
  const releaseTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current)
      }
      if (voiceTimerRef.current) {
        window.clearTimeout(voiceTimerRef.current)
      }
      if (voiceIntervalRef.current) {
        window.clearInterval(voiceIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVoiceRecording) return

    const stages = step === 'asked' ? dateVoiceStages : firstVoiceStages
    let index = 0
    voiceTimerRef.current = window.setTimeout(() => {
      setIsVoiceLoading(false)
      recognizedVoiceTextRef.current = stages[0]
      setVoiceTranscript(stages[0])
      voiceIntervalRef.current = window.setInterval(() => {
        index = Math.min(index + 1, stages.length - 1)
        recognizedVoiceTextRef.current = stages[index]
        setVoiceTranscript(stages[index])
        if (index === stages.length - 1 && voiceIntervalRef.current) {
          window.clearInterval(voiceIntervalRef.current)
          voiceIntervalRef.current = null
        }
      }, 520)
    }, 420)

    return () => {
      if (voiceTimerRef.current) {
        window.clearTimeout(voiceTimerRef.current)
        voiceTimerRef.current = null
      }
      if (voiceIntervalRef.current) {
        window.clearInterval(voiceIntervalRef.current)
        voiceIntervalRef.current = null
      }
    }
  }, [isVoiceRecording, step])

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (chatStreamRef.current) {
        chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [messages, step, isVoiceRecording, voiceTranscript, isVoiceLoading])

  useEffect(() => {
    if (!isInputActive) return
    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isInputActive, selectedSkill])

  const addMessages = useCallback((nextMessages: TaskMessage[]) => {
    setMessages((currentMessages) => [...currentMessages, ...nextMessages])
  }, [])

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

    const pressedChip = (event.target as HTMLElement).closest<HTMLButtonElement>('.dotted-demo__chip')
    const pressedPrompt = prompts.find((prompt) => prompt.label === pressedChip?.dataset.skill) ?? null

    dragRef.current = {
      active: true,
      isDragging: false,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      pressedPrompt,
    }
    el.setPointerCapture(event.pointerId)
    setIsChipsReleasing(false)
  }

  const handleChipsPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    const drag = dragRef.current
    if (!el || !drag.active) return

    const deltaX = event.clientX - drag.startX
    if (Math.abs(deltaX) <= 6 && !drag.isDragging) return

    drag.isDragging = true
    suppressChipClickRef.current = true
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
    const pressedPrompt = dragRef.current.pressedPrompt
    const shouldSelect = Boolean(pressedPrompt && !dragRef.current.isDragging)

    dragRef.current.active = false
    dragRef.current.pressedPrompt = null
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }

    if (shouldSelect && pressedPrompt) {
      suppressChipClickRef.current = true
      selectSkill(pressedPrompt)
      window.setTimeout(() => {
        suppressChipClickRef.current = false
      }, 0)
      return
    }

    releaseChips()
    window.setTimeout(() => {
      suppressChipClickRef.current = false
    }, 0)
  }

  const handleChipsPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    dragRef.current.active = false
    dragRef.current.pressedPrompt = null
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }
    releaseChips()
  }

  const fillExample = () => {
    if (step === 'empty') {
      setSelectedSkill(null)
      setMessageText(firstExample)
      setIsInputActive(true)
      return
    }

    if (step === 'asked') {
      setSelectedSkill(null)
      setMessageText(dateExample)
      setIsInputActive(true)
    }
  }

  const selectSkill = (prompt: SkillPrompt) => {
    setSelectedSkill(prompt)
    setIsInputActive(true)
  }

  const removeSelectedSkill = () => {
    setSelectedSkill(null)
  }

  const handleSkillClick = (prompt: SkillPrompt) => {
    if (suppressChipClickRef.current) return
    selectSkill(prompt)
  }

  const dismissInput = () => {
    inputRef.current?.blur()
    setIsInputActive(false)
  }

  const submitTaskText = useCallback((rawText: string) => {
    const text = rawText.trim()
    if (!text) return

    if (step === 'empty') {
      addMessages([
        { id: `user-task-${Date.now()}`, role: 'user', text, hasTail: true },
        {
          id: `dots-ask-date-${Date.now()}`,
          role: 'dots',
          text: '可以。我还需要知道出发日期，才能开始盯价格。\n你想看哪一天出发？',
          hasTail: true,
        },
      ])
      setStep('asked')
      setMessageText('')
      setSelectedSkill(null)
      setIsInputActive(false)
      return
    }

    if (step === 'asked') {
      addMessages([
        { id: `user-date-${Date.now()}`, role: 'user', text, hasTail: true },
        {
          id: `dots-confirm-${Date.now()}`,
          role: 'dots',
          text: '我整理好了，确认后会开始持续监听。',
        },
      ])
      setStep('date')
      setMessageText('')
      setSelectedSkill(null)
      setIsInputActive(false)
    }
  }, [addMessages, step])

  const sendMessage = () => {
    submitTaskText(messageText)
  }

  const finishVoice = useCallback((canceling: boolean) => {
    voiceDragRef.current.canceling = false
    voiceDragRef.current.pointerId = null
    setIsVoiceRecording(false)
    setIsVoiceCanceling(false)
    setIsVoiceLoading(false)
    if (!canceling && (step === 'empty' || step === 'asked')) {
      submitTaskText(recognizedVoiceTextRef.current || (step === 'asked' ? dateExample : firstExample))
    }
    recognizedVoiceTextRef.current = ''
    setVoiceTranscript('')
  }, [step, submitTaskText])

  const startVoice = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    voiceDragRef.current = {
      canceling: false,
      pointerId: event.pointerId,
      startY: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsInputActive(false)
    setSelectedSkill(null)
    recognizedVoiceTextRef.current = ''
    setVoiceTranscript('')
    setIsVoiceLoading(true)
    setIsVoiceRecording(true)
    setIsVoiceCanceling(false)
  }

  const moveVoice = (event: PointerEvent<HTMLButtonElement>) => {
    const voiceDrag = voiceDragRef.current
    if (!isVoiceRecording || voiceDrag.pointerId !== event.pointerId) return
    const canceling = voiceDrag.startY - event.clientY > 48
    voiceDrag.canceling = canceling
    setIsVoiceCanceling(canceling)
  }

  const endVoice = (event: PointerEvent<HTMLButtonElement>) => {
    const voiceDrag = voiceDragRef.current
    if (voiceDrag.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    finishVoice(isVoiceCanceling || voiceDrag.canceling || voiceDrag.startY - event.clientY > 48)
  }

  const cancelVoice = (event: PointerEvent<HTMLButtonElement>) => {
    if (voiceDragRef.current.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    finishVoice(true)
  }

  useEffect(() => {
    if (!isVoiceRecording) return

    const finishFromWindow = (event: globalThis.PointerEvent | MouseEvent) => {
      const voiceDrag = voiceDragRef.current
      if (voiceDrag.pointerId === null) return
      if ('pointerId' in event && event.pointerId !== voiceDrag.pointerId) return
      finishVoice(voiceDrag.canceling || voiceDrag.startY - event.clientY > 48)
    }

    const cancelFromWindow = (event: globalThis.PointerEvent) => {
      const voiceDrag = voiceDragRef.current
      if (voiceDrag.pointerId === null || event.pointerId !== voiceDrag.pointerId) return
      finishVoice(true)
    }

    window.addEventListener('pointerup', finishFromWindow)
    window.addEventListener('pointercancel', cancelFromWindow)
    window.addEventListener('mouseup', finishFromWindow)
    return () => {
      window.removeEventListener('pointerup', finishFromWindow)
      window.removeEventListener('pointercancel', cancelFromWindow)
      window.removeEventListener('mouseup', finishFromWindow)
    }
  }, [finishVoice, isVoiceRecording])

  const confirmTask = () => {
    addMessages([
      { id: `user-confirm-${Date.now()}`, role: 'user', text: '确认创建', hasTail: true },
      {
        id: `dots-created-${Date.now()}`,
        role: 'dots',
        text: '已开始帮你盯。价格低于3000元时，我会通知你。',
        hasTail: true,
      },
    ])
    setStep('created')
  }

  const triggerPrice = () => {
    addMessages([
      {
        id: `dots-triggered-${Date.now()}`,
        role: 'dots',
        text: '价格有变化：北京到东京 7月20日直飞最低价已到 ¥2890。',
        hasTail: true,
      },
    ])
    setStep('triggered')
  }

  const resetDemo = () => {
    setStep('empty')
    setMessages([])
    setIsInputActive(false)
    setMessageText('')
    setSelectedSkill(null)
    setIsVoiceRecording(false)
    setIsVoiceCanceling(false)
    setVoiceTranscript('')
    setIsVoiceLoading(false)
    recognizedVoiceTextRef.current = ''
  }

  const showKeyboardButton = step === 'empty' || step === 'asked'
  const hasMessageText = messageText.trim().length > 0
  const displayedMessages: TaskMessage[] =
    isVoiceRecording && (voiceTranscript || isVoiceLoading)
      ? [
          ...messages,
          {
            id: 'voice-recognition',
            role: 'user',
            text: voiceTranscript,
            hasTail: true,
            isRecognizing: true,
            isCanceling: isVoiceCanceling,
            isLoading: isVoiceLoading && !voiceTranscript,
          },
        ]
      : messages

  return (
    <div className="dotted-task-shell">
      <div
        className={`dotted-demo-page dotted-task-page${isInputActive ? ' dotted-demo-page--input' : ''}${selectedSkill ? ' dotted-demo-page--skill' : ''}${isVoiceRecording ? ' dotted-demo-page--voice' : ''}`}
      >
        <div className="dotted-demo dotted-task-demo">
          <div className="dotted-demo__topbar">
            <div className="dotted-demo__statusbar">
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

          <main
            className="dotted-demo__blank"
            aria-label="点点任务创建演示"
            onClick={isInputActive ? dismissInput : undefined}
          />
          {step === 'triggered' && <DottedTaskNotice />}

          <div
            className="dotted-demo__chat-stream dotted-task-demo__chat"
            ref={chatStreamRef}
            onClick={isInputActive ? dismissInput : undefined}
          >
            {displayedMessages.map((message) => (
              <DottedTaskMessage key={message.id} message={message} />
            ))}
            {(step === 'date' || step === 'created' || step === 'triggered') && (
              <div className="dotted-task-demo__card-row">
                <FlightTaskCard
                  mode={step === 'date' ? 'confirm' : step === 'triggered' ? 'triggered' : 'active'}
                  onConfirm={confirmTask}
                />
              </div>
            )}
          </div>

          {isInputActive ? (
            <div
              className={`dotted-demo__input-panel dotted-task-demo__input-panel${selectedSkill ? ' dotted-demo__input-panel--skill' : ''}`}
            >
              {selectedSkill && (
                <div className="dotted-demo__selected-skill" aria-label={`已选择${selectedSkill.label}`}>
                  <div className="dotted-demo__selected-skill-main">
                    <span
                      className={`dotted-demo__selected-skill-icon ${selectedSkill.selectedIconClass}`}
                      aria-hidden="true"
                    />
                    <span>{selectedSkill.label}</span>
                  </div>
                  <button
                    className="dotted-demo__selected-skill-close"
                    type="button"
                    aria-label="移除已选 Skill"
                    onClick={removeSelectedSkill}
                  />
                </div>
              )}

              <div className={`dotted-demo__text-input-area${selectedSkill ? ' dotted-demo__text-input-area--skill' : ''}`}>
                <label className="dotted-demo__placeholder-row" aria-label="给点点发消息">
                  <input
                    ref={inputRef}
                    type="text"
                    className="dotted-demo__message-input"
                    value={messageText}
                    placeholder="给点点发消息"
                    onChange={(event) => setMessageText(event.target.value)}
                  />
                </label>

                <div className="dotted-demo__input-action-row">
                  <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                    <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                  </button>
                  {hasMessageText ? (
                    <button className="dotted-demo__send-btn" type="button" aria-label="发送" onClick={sendMessage}>
                      <img src={dotsActionSend} alt="" aria-hidden="true" draggable={false} />
                    </button>
                  ) : (
                    <div className="dotted-demo__trailing-area dotted-demo__trailing-area--input">
                      <button
                        className="dotted-demo__round-btn"
                        type="button"
                        aria-label="收起键盘"
                        onClick={() => setIsInputActive(false)}
                      >
                        <img src={dotsActionKeyboard} alt="" aria-hidden="true" />
                      </button>
                      <button className="dotted-demo__round-btn" type="button" aria-label="拍照">
                        <img src={dotsActionCamera} alt="" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="dotted-demo__keyboard">
                <img src={dotsKeyboard} alt="" aria-hidden="true" />
              </div>
            </div>
          ) : (
            <div className={`dotted-demo__dock dotted-task-demo__dock${isVoiceRecording ? ' dotted-demo__dock--voice' : ''}`}>
              {!isVoiceRecording && (
                <div
                  className="dotted-demo__chips"
                  aria-label="快捷提示"
                  ref={chipsRef}
                  onWheel={handleChipsWheel}
                  onPointerDown={handleChipsPointerDown}
                  onPointerMove={handleChipsPointerMove}
                  onPointerUp={handleChipsPointerUp}
                  onPointerCancel={handleChipsPointerCancel}
                >
                  <div
                    className={`dotted-demo__chips-track${isChipsReleasing ? ' dotted-demo__chips-track--release' : ''}`}
                    style={{ transform: `translateX(${chipsElasticX}px)` }}
                  >
                    {prompts.map((prompt) => (
                      <button
                        className="dotted-demo__chip"
                        type="button"
                        key={prompt.label}
                        data-skill={prompt.label}
                        onClick={() => handleSkillClick(prompt)}
                      >
                        <img src={prompt.icon} alt="" aria-hidden="true" />
                        <span>{prompt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isVoiceRecording && (
                <div className={`dotted-demo__voice-hint${isVoiceCanceling ? ' dotted-demo__voice-hint--cancel' : ''}`}>
                  {isVoiceCanceling ? '松手取消' : '松手发送，上移取消'}
                </div>
              )}

              <div className="dotted-demo__composer">
                <div className={`dotted-demo__voice-row${isVoiceRecording ? ' dotted-demo__voice-row--recording' : ''}`}>
                  {!isVoiceRecording && (
                    <div className="dotted-demo__leading-area">
                      <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                        <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <button
                    className={`dotted-demo__voice${isVoiceRecording ? ' dotted-demo__voice--recording' : ''}${isVoiceCanceling ? ' dotted-demo__voice--canceling' : ''}`}
                    type="button"
                    aria-label={isVoiceRecording ? '正在语音输入' : '按住说话'}
                    onPointerDown={startVoice}
                    onPointerMove={moveVoice}
                    onPointerUp={endVoice}
                    onPointerCancel={cancelVoice}
                  >
                    {isVoiceRecording ? <DottedVoiceWaveform canceling={isVoiceCanceling} /> : '按住说话'}
                  </button>
                  {!isVoiceRecording && (
                    <div className="dotted-demo__trailing-area">
                      {showKeyboardButton && (
                        <button
                          className="dotted-demo__round-btn"
                          type="button"
                          aria-label="键盘"
                          onClick={() => setIsInputActive(true)}
                        >
                          <img src={dotsActionKeyboard} alt="" aria-hidden="true" />
                        </button>
                      )}
                      <button className="dotted-demo__round-btn" type="button" aria-label="拍照">
                        <img src={dotsActionCamera} alt="" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
                {!isVoiceRecording && <div className="dotted-demo__ai-note">内容由 AI 生成 · 演示数据</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      <aside className="dotted-task-controls" aria-label="演示控制">
        <div className="dotted-task-controls__label">页面外提示</div>
        <div className="dotted-task-controls__state">
          {step === 'empty' && '手机页保持空白对话态。点击下方示例，文本会进入点点输入框；也可以直接在手机里点键盘手动输入。'}
          {step === 'asked' && '点点已经追问缺失参数。继续输入日期和偏好，发送后会生成确认卡片。'}
          {step === 'date' && '确认动作属于任务卡片本身，所以按钮放在卡片里，不放在演示控制区。'}
          {step === 'created' && '任务已创建。这里可以在页面外模拟价格触发，不污染点点页面。'}
          {step === 'triggered' && '价格通知已在点点页面内出现。可以重置后重新演示。'}
        </div>
        {(step === 'empty' || step === 'asked') && (
          <button className="mb-button mb-button--neutral mb-button--medium" type="button" onClick={fillExample}>
            {step === 'empty' ? '填入机票需求' : '填入日期偏好'}
          </button>
        )}
        {step === 'created' && (
          <button className="mb-button mb-button--neutral mb-button--medium" type="button" onClick={triggerPrice}>
            模拟到价
          </button>
        )}
        {step === 'triggered' && (
          <button className="mb-button mb-button--neutral mb-button--medium" type="button" onClick={resetDemo}>
            重新演示
          </button>
        )}
        {(step === 'asked' || step === 'date' || step === 'created') && (
          <button className="mb-button mb-button--neutral mb-button--medium" type="button" onClick={resetDemo}>
            重置
          </button>
        )}
        <div className="dotted-task-controls__note">
          <span>Demo 说明</span>
          <p>外部按钮只用于汇报推进；手机页面内保留点点的输入、发送、气泡和卡片确认逻辑。</p>
        </div>
      </aside>
    </div>
  )
}
