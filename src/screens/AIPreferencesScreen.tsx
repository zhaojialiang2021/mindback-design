import type { ReactNode } from 'react'

// 个人页素材来自 Figma 2:7722
import personalArcBg from '../assets/personal/arc-bg.png'
import personalAvatar from '../assets/personal/avatar.png'
import personalStatusBar from '../assets/personal/statusbar-light.png'
import personalWidgetImage from '../assets/personal/widget-image.png'
import personalFileIcon1 from '../assets/personal/file-icon-1.png'
import personalFileIcon2 from '../assets/personal/file-icon-2.png'
import personalLinkFavicon from '../assets/personal/link-favicon.png'
import personalIconChevronDown from '../assets/personal/icon-chevron-down.png'
import personalIconChevronRight from '../assets/personal/icon-chevron-right.png'
import personalIconExternal from '../assets/personal/icon-external.png'
import personalSettingAi from '../assets/personal/setting-ai.png'
import personalSettingNotice from '../assets/personal/setting-notice.png'
import personalSettingTheme from '../assets/personal/setting-theme.png'
import personalSettingLock from '../assets/personal/setting-lock.png'
import personalTabChat from '../assets/personal/tab-chat.png'
import personalTabStar from '../assets/personal/tab-star.png'
import personalTabUser from '../assets/personal/tab-user.png'

const PERSONAL_FILE_ICONS: Record<string, string> = {
  'file-icon-1.png': personalFileIcon1,
  'file-icon-2.png': personalFileIcon2,
}

const personalFiles = [
  { name: 'DZFP_81123232', ext: '.pdf', date: '2025/07/21', icon: 'file-icon-1.png' },
  { name: '莫干山上的景色', ext: '.pdf', date: '2025/07/21', icon: 'file-icon-2.png' },
]

const personalLinks = [
  { name: 'DZFP_81123232', source: '小红书' },
  { name: 'DZFP_81123232', source: '小红书' },
]

const personalQuotes = [
  '2025 WAIC 解读',
  '月度回顾',
  '近期 AI 内容汇总',
]

const personalDocLinks = ['关于 MindBack', '帮助中心', '隐私政策', '第三方信息共享清单', '使用条款']

function UpDownArrows() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
      <path d="M1 4 L4 1.5 L7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 8 L4 10.5 L7 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PersonalDataCell({
  label,
  value,
  emphasized,
  muted,
}: {
  label?: string
  value?: string
  emphasized?: boolean
  muted?: boolean
}) {
  if (muted) return <div className="personal-data-cell personal-data-cell--muted" aria-hidden="true" />
  return (
    <div className={`personal-data-cell${emphasized ? ' personal-data-cell--lead' : ''}`}>
      <div className="personal-data-cell__label">{label}</div>
      <div className="personal-data-cell__value">{value}</div>
    </div>
  )
}

function SettingItemRow({
  illustration,
  title,
  subtitle,
  trailing,
}: {
  illustration: ReactNode
  title: string
  subtitle: string
  trailing: ReactNode
}) {
  return (
    <div className="personal-setting-item">
      <div className="personal-setting-item__art">{illustration}</div>
      <div className="personal-setting-item__body">
        <div className="personal-setting-item__head">
          <span className="personal-setting-item__title">{title}</span>
          <span className="personal-setting-item__trailing">{trailing}</span>
        </div>
        <div className="personal-setting-item__subtitle">{subtitle}</div>
      </div>
    </div>
  )
}

function PersonalSwitch({ on }: { on: boolean }) {
  return (
    <span className={`personal-switch${on ? ' personal-switch--on' : ''}`} role="switch" aria-checked={on}>
      <span className="personal-switch__thumb" aria-hidden="true" />
    </span>
  )
}

function ThemePill() {
  return (
    <span className="personal-pill">
      <span className="personal-pill__text">浅色</span>
      <span className="personal-pill__updown" aria-hidden="true">
        <UpDownArrows />
      </span>
    </span>
  )
}

export function AIPreferencesScreen() {
  return (
    <div className="personal-page">
      <img src={personalStatusBar} alt="" className="personal-page__statusbar-img" aria-hidden="true" />

      <div className="personal-page__scroll">
        <img src={personalArcBg} alt="" className="personal-page__arc" aria-hidden="true" />
        <div className="personal-page__inner">
        <div className="personal-page__profile">
          <img src={personalAvatar} alt="头像" className="personal-page__avatar" />
          <div className="personal-page__name">沙滩上的热带鱼</div>
        </div>

        <section className="personal-data-card">
          <div className="personal-data-card__month">
            <span>2025/08</span>
            <span className="personal-data-card__chevron">
              <img src={personalIconChevronDown} alt="" aria-hidden="true" />
            </span>
          </div>

          <div className="personal-data-card__grid">
            <PersonalDataCell label="全部消息" value="1290" emphasized />
            <PersonalDataCell label="文字消息" value="2" />
            <PersonalDataCell label="语音消息" value="683" />
            <PersonalDataCell label="图片" value="386" />
            <PersonalDataCell label="文件" value="167" />
            <PersonalDataCell label="链接" value="48" />
            <PersonalDataCell label="MindBack" value="386" />
            <PersonalDataCell muted />
            <PersonalDataCell muted />
          </div>

          <div className="personal-data-card__calendar" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className={`personal-data-card__dot${i >= 31 ? ' personal-data-card__dot--blank' : ''}`}
              />
            ))}
          </div>
        </section>

        <div className="personal-widgets-row">
          <div className="personal-widget personal-widget--image">
            <img src={personalWidgetImage} alt="" className="personal-widget__bg" aria-hidden="true" />
            <div className="personal-widget__image-shade" aria-hidden="true" />
            <div className="personal-widget__image-title">图片</div>
            <div className="personal-widget__image-num">328</div>
          </div>

          <div className="personal-widget">
            <div className="personal-widget__title">文件</div>
            <div className="personal-widget__files">
              {personalFiles.map((f, i) => (
                <div key={i} className="personal-file">
                  <img src={PERSONAL_FILE_ICONS[f.icon]} alt="" className="personal-file__icon" aria-hidden="true" />
                  <div className="personal-file__body">
                    <div className="personal-file__line">
                      <span className="personal-file__name">{f.name}</span>
                      <span className="personal-file__ext">{f.ext}</span>
                    </div>
                    <div className="personal-file__date">{f.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="personal-widgets-row">
          <div className="personal-widget">
            <div className="personal-widget__title">链接</div>
            <div className="personal-widget__links">
              {personalLinks.map((l, i) => (
                <div key={i} className="personal-link">
                  <div className="personal-link__name">{l.name}</div>
                  <div className="personal-link__source">
                    <img src={personalLinkFavicon} alt="" className="personal-link__favicon" aria-hidden="true" />
                    <span>{l.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="personal-widget">
            <div className="personal-widget__title">MindBack</div>
            <ul className="personal-widget__quotes">
              {personalQuotes.map((q, i) => (
                <li key={i} className="personal-quote">
                  <span className="personal-quote__bar" aria-hidden="true" />
                  <span className="personal-quote__text">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="personal-settings-group">
          <hr className="personal-settings-group__divider" />

          <SettingItemRow
            illustration={<img src={personalSettingAi} alt="" className="personal-illustration" aria-hidden="true" />}
            title="AI 偏好"
            subtitle="让 MindBack 用你喜欢的方式，一直陪着你。"
            trailing={
              <span className="personal-icon-arrow">
                <img src={personalIconChevronRight} alt="" aria-hidden="true" />
              </span>
            }
          />

          <SettingItemRow
            illustration={<img src={personalSettingNotice} alt="" className="personal-illustration" aria-hidden="true" />}
            title="已开启通知"
            subtitle="打开通知后，若有智能总结，可第一时间收到提示信息"
            trailing={<PersonalSwitch on />}
          />

          <SettingItemRow
            illustration={<img src={personalSettingTheme} alt="" className="personal-illustration" aria-hidden="true" />}
            title="颜色模式"
            subtitle="MindBack 将根据你的偏好，进行系统颜色设置"
            trailing={<ThemePill />}
          />

          <SettingItemRow
            illustration={<img src={personalSettingLock} alt="" className="personal-illustration" aria-hidden="true" />}
            title="密码设置"
            subtitle="设置密码，保护你的个人隐私"
            trailing={
              <span className="personal-icon-arrow">
                <img src={personalIconChevronRight} alt="" aria-hidden="true" />
              </span>
            }
          />

          <hr className="personal-settings-group__divider" />

          <ul className="personal-doclinks">
            {personalDocLinks.map((label) => (
              <li key={label} className="personal-doclink">
                <span>{label}</span>
                <span className="personal-doclink__icon">
                  <img src={personalIconExternal} alt="" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>

          <hr className="personal-settings-group__divider" />

          <div className="personal-account">
            <span>账号与安全</span>
            <span className="personal-account__spacer" aria-hidden="true" />
          </div>

          <div className="personal-page__copyright">
            <p>沪 ICP 备 2023038043 号 - 11A</p>
            <p>Copyright @ MindBack All Rights Reserved</p>
          </div>
        </div>
      </div>
      </div>

      <div className="personal-page__tabbar" role="tablist" aria-label="底部导航">
        <button className="personal-tab" role="tab" aria-selected="false">
          <span className="personal-tab__icon">
            <img src={personalTabChat} alt="" aria-hidden="true" />
          </span>
        </button>
        <button className="personal-tab" role="tab" aria-selected="false">
          <span className="personal-tab__icon">
            <img src={personalTabStar} alt="" aria-hidden="true" />
          </span>
        </button>
        <button className="personal-tab personal-tab--active" role="tab" aria-selected="true">
          <span className="personal-tab__icon">
            <img src={personalTabUser} alt="" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  )
}