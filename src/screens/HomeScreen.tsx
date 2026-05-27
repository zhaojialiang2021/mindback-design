import type { ReactNode } from 'react'
import { useLottie } from 'lottie-react'

// 状态栏复用个人页同尺寸 393x50
import statusBarLight from '../assets/personal/statusbar-light.png'

// 首页素材（Figma 2:7709）
import logoMindback from '../assets/home/logo-mindback.svg'
import iconStar from '../assets/home/icon-star.svg'
import iconMic from '../assets/home/icon-mic.svg'
import iconVoiceSend from '../assets/home/icon-voice-send.svg'
import iconMiniWave from '../assets/home/icon-mini-wave.svg'
import iconQuote from '../assets/home/icon-quote.svg'
import cornerDotRed from '../assets/home/corner-dot-red.svg'
import cornerDotOrange from '../assets/home/corner-dot-orange.svg'
import linkThumb from '../assets/home/link-thumb.png'
import linkFavXhs from '../assets/home/link-favicon-xhs.png'
import photoSingle from '../assets/home/photo-single.png'
import photoCollage1 from '../assets/home/photo-collage-1.png'
import photoCollage2 from '../assets/home/photo-collage-2.png'
import photoCollage3 from '../assets/home/photo-collage-3.png'
import aiLoadingAnimation from '../assets/home/icon-ai-loading.json'

// === 内联备用 SVG（仅 PlusIcon，Figma 里是个 picture 占位） ===

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5V19M5 12H19" stroke="#3C3C43" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function AiLoadingIcon() {
  // 用 useLottie hook 而不是 <Lottie> 组件，避开 lottie-react 的 UMD 默认导出在 Vite 预打包后变成对象的坑
  const { View } = useLottie(
    {
      animationData: aiLoadingAnimation,
      loop: true,
      autoplay: true,
    },
    { width: 16, height: 16 },
  )
  return <span aria-hidden="true">{View}</span>
}

// === 复用元件 ===

function CornerDot({ kind = 'red' }: { kind?: 'red' | 'orange' }) {
  return (
    <img
      src={kind === 'orange' ? cornerDotOrange : cornerDotRed}
      alt=""
      className={`home-msg__corner home-msg__corner--${kind}`}
      aria-hidden="true"
    />
  )
}

function DateMarker({ children }: { children: ReactNode }) {
  return <div className="home-msg-date">{children}</div>
}

function UserMsgRow({ children }: { children: ReactNode }) {
  return <div className="home-msg-row home-msg-row--user">{children}</div>
}

// 文字消息（短）
function TextBubble({ children }: { children: ReactNode }) {
  return (
    <div className="home-bubble home-bubble--text">
      <span className="home-bubble__text">{children}</span>
      <CornerDot />
    </div>
  )
}

// 文字消息（长，白底带边框）
function LongTextBubble({ children }: { children: ReactNode }) {
  return (
    <div className="home-bubble home-bubble--longtext">
      <p className="home-bubble__text home-bubble__text--justify">{children}</p>
      <CornerDot />
    </div>
  )
}

// 语音消息
function VoiceBubble({ duration }: { duration: string }) {
  return (
    <div className="home-bubble home-bubble--voice">
      <span className="home-bubble__voice-time">{duration}</span>
      <img src={iconMiniWave} alt="" className="home-bubble__voice-wave" aria-hidden="true" />
      <CornerDot />
    </div>
  )
}

// 链接卡片
function LinkCard({
  title,
  description,
  source,
}: {
  title: string
  description: string
  source: string
}) {
  return (
    <div className="home-bubble home-bubble--link">
      <div className="home-link__title">{title}</div>
      <div className="home-link__row">
        <p className="home-link__desc">{description}</p>
        <img src={linkThumb} alt="" className="home-link__thumb" />
      </div>
      <div className="home-link__source">
        <img src={linkFavXhs} alt="" className="home-link__favicon" aria-hidden="true" />
        <span>{source}</span>
      </div>
      <CornerDot />
    </div>
  )
}

// 单图
function SinglePhoto() {
  return (
    <div className="home-bubble home-bubble--photo-1">
      <img src={photoSingle} alt="" className="home-photo__one" />
      <CornerDot />
    </div>
  )
}

// 多图（3 张旋转层叠）
function PhotoCollage() {
  return (
    <div className="home-bubble home-bubble--photo-3" aria-hidden="true">
      <div className="home-photo__layer home-photo__layer--3">
        <img src={photoCollage3} alt="" />
      </div>
      <div className="home-photo__layer home-photo__layer--2">
        <img src={photoCollage2} alt="" />
      </div>
      <div className="home-photo__layer home-photo__layer--1">
        <img src={photoCollage1} alt="" />
      </div>
      <CornerDot kind="orange" />
    </div>
  )
}

// 引用消息（语音 + 卡片预览）
function QuoteBubble() {
  return (
    <div className="home-quote">
      <div className="home-bubble home-bubble--text home-bubble--inline">
        <span className="home-bubble__text">上海 WAIC 大会</span>
        <CornerDot />
      </div>
      <div className="home-quote__card">
        <div className="home-quote__head">
          <span className="home-quote__time">2025/08/25 19:36</span>
          <span className="home-quote__sep" aria-hidden="true" />
          <span className="home-quote__src">W一句话：不诏安，梁山</span>
        </div>
        <p className="home-quote__body">
          的钱从哪儿来？这不是情怀，而是军政组织的生死线。从晁盖到宋江，梁山始终靠"以战养战"，靠一次性掠夺补充钱粮。但这种短期收入无法支撑长期、规模化、制度化的开销。
        </p>
      </div>
    </div>
  )
}

// AI 加载消息（用户视角，右侧蓝底）
function AiLoadingBubble() {
  return (
    <div className="home-msg-row home-msg-row--user">
      <div className="home-bubble home-bubble--ai-loading">
        <AiLoadingIcon />
        <span>帮我总结一下上面的信息帮我总结一下</span>
      </div>
      <div className="home-ai-cite">
        <img src={iconQuote} alt="" aria-hidden="true" />
        <span>想要这周末去趟杭州玩，计划从上海直接座高铁去，第一天就先去苏堤散散步，第二天还想去 ...</span>
      </div>
    </div>
  )
}

// AI 结构化回复
function AiStructuredReply() {
  return (
    <div className="home-ai">
      <p className="home-ai__lead">久等啦～ 针对你刚才提出的问题：</p>
      <div className="home-ai__quote-block">
        <span className="home-ai__quote-bar" aria-hidden="true" />
        <div className="home-ai__quote-body">
          <p className="home-ai__quote-text">
            帮我总结一下上面的信息帮我总结一下上面的信息帮我总结一下上面帮我总结一下上面的信息帮我总结一下上面的信息帮我总结一下上面帮我总结一下上面的信息帮我总结一下上面的信息帮我总结一下上面
          </p>
          <div className="home-ai-cite home-ai-cite--inquote">
            <img src={iconQuote} alt="" aria-hidden="true" />
            <span>想要这周末去趟杭州玩，计划从上海直接座高铁去，第一天就先去苏堤散散步，第二天还想去 ...</span>
          </div>
        </div>
      </div>
      <p className="home-ai__lead">我把要点整理成了一篇杭州周末出游计划，希望对你有帮助。</p>

      <hr className="home-ai__hr" />

      <h3 className="home-ai__title">杭州周末出游计划 摘要 📝</h3>

      <h4 className="home-ai__h4">主要议题与热点内容</h4>

      <p className="home-ai__num">
        <span className="home-ai__num-i">1.</span>核心信息
      </p>
      <ul className="home-ai__list">
        <li>
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>
            <span className="home-ai__b">目的地：</span>杭州
          </p>
        </li>
        <li>
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>
            <span className="home-ai__b">时间：</span>这个周末（10月26日 - 10月27日）
          </p>
        </li>
        <li>
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>
            <span className="home-ai__b">交通方式：</span>我们决定坐高铁前往，方便又快捷。
          </p>
        </li>
      </ul>

      <p className="home-ai__num">
        <span className="home-ai__num-i">2.</span>行程安排
      </p>
      <ul className="home-ai__list">
        <li>
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>
            <span className="home-ai__b">Day 1（周六）：</span>
          </p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>上午：乘坐 G7501 次列车（09:05 出发）前往杭州。</p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>下午：入住西湖边的"静庐"民宿后，沿苏堤漫步。</p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>晚上：去看你很期待的《印象西湖》演出。</p>
        </li>
        <li>
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>
            <span className="home-ai__b">Day 2（周日）：</span>
          </p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>上午：乘坐 G7501 次列车（09:05 出发）前往杭州。</p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>下午：入住西湖边的"静庐"民宿后，沿苏堤漫步。</p>
        </li>
        <li className="home-ai__list-indent">
          <span className="home-ai__bullet" aria-hidden="true" />
          <p>晚上：去看你很期待的《印象西湖》演出。</p>
        </li>
      </ul>
    </div>
  )
}

export function HomeScreen() {
  return (
    <div className="home-page">
      <img src={statusBarLight} alt="" className="home-page__statusbar-img" aria-hidden="true" />

      <header className="home-page__header">
        <img src={logoMindback} alt="MindBack" className="home-page__logo" />
        <button className="home-page__star" type="button" aria-label="收藏">
          <img src={iconStar} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="home-page__scroll">
        <div className="home-page__inner">
          <DateMarker>2025/06/11</DateMarker>

          <UserMsgRow>
            <TextBubble>上海 WAIC 大会</TextBubble>
          </UserMsgRow>

          <UserMsgRow>
            <LongTextBubble>
              文字消息超过一行的极限长度，所有文字消息均完整展示全部内容文字消息超过一行的极限长度，所有文字消息均完整展示全部内容文字消息超过一行的极限长度，所有文字消息均完整展示全部内容文字消息超过一行的极限长度，所有文字消息均完整展示全部内容文字消息超过一行的极限长度，所有文字消息均完整展示全
            </LongTextBubble>
          </UserMsgRow>

          <UserMsgRow>
            <VoiceBubble duration={'1"'} />
          </UserMsgRow>

          <UserMsgRow>
            <LinkCard
              title="Good Taste Leads to moneyGood T..."
              description="当一块地毯不再只是覆盖地面的织物，当经纬交织的纹路成为空间递出的名片，当光脚触碰到毯面的瞬间的瞬间"
              source="小红书"
            />
          </UserMsgRow>

          <UserMsgRow>
            <SinglePhoto />
          </UserMsgRow>

          <UserMsgRow>
            <PhotoCollage />
          </UserMsgRow>

          <UserMsgRow>
            <QuoteBubble />
          </UserMsgRow>

          <DateMarker>2025/06/11</DateMarker>

          <AiLoadingBubble />

          <DateMarker>2025/06/11</DateMarker>

          <AiStructuredReply />
        </div>
      </div>

      <div className="home-page__input">
        <button className="home-page__attach" type="button" aria-label="附件">
          <PlusIcon />
        </button>
        <div className="home-page__input-bar">
          <span className="home-page__placeholder">现在的想法</span>
          <img src={iconMic} alt="" className="home-page__mic" aria-hidden="true" />
          <button className="home-page__send" type="button" aria-label="发送语音">
            <img src={iconVoiceSend} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
