// 登录页 1:1 还原 Figma node 2:7717（手机号登录）
// 393×852：弧形 bg → 状态栏 → 返回 → 标题/副标 + 输入框 → 获取验证码 → 数字键盘 → home indicator

import personalArcBg from '../assets/personal/arc-bg.png'
import personalStatusBar from '../assets/personal/statusbar-light.png'

const keyboardKeys = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
] as const

export function SplashScreen() {
  return (
    <div className="login-page">
      <img src={personalArcBg} alt="" className="login-page__arc" aria-hidden="true" />
      <img src={personalStatusBar} alt="" className="login-page__statusbar" aria-hidden="true" />

      <button className="login-page__back" type="button" aria-label="返回">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="login-page__content">
        <div className="login-page__form">
          <div className="login-page__heading">
            <div className="login-page__title">输入手机号</div>
            <div className="login-page__subtitle">未注册的手机号在验证通过后将会自动注册</div>
          </div>

          <div className="login-page__field">
            <span className="login-page__field-prefix">+86</span>
            <span className="login-page__field-divider" aria-hidden="true" />
            <span className="login-page__field-value">13988886666</span>
          </div>
        </div>

        <button className="login-page__submit" type="button">获取验证码</button>
      </div>

      <div className="login-page__keyboard" aria-hidden="true">
        {keyboardKeys.map(([num, letters]) => (
          <button key={num} className="login-key" type="button">
            <span className="login-key__num">{num}</span>
            {letters && <span className="login-key__letters">{letters}</span>}
          </button>
        ))}
        <span className="login-key login-key--blank" />
        <button className="login-key" type="button">
          <span className="login-key__num">0</span>
        </button>
        <button className="login-key login-key--ghost" type="button" aria-label="删除">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M6.5 1 H20 a1 1 0 0 1 1 1 v12 a1 1 0 0 1 -1 1 H6.5 L1 8 Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 5 L16 11 M16 5 L10 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}