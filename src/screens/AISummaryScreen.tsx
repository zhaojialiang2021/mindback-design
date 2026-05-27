import { MobileShell, TopNav, TypeTag, QuoteIcon, DotsIcon } from './shared'

export function AISummaryScreen() {
  return (
    <MobileShell darkStatus className="mobile-shell--summary">
      <div className="summary-screen">
        <div className="summary-screen__hero">
          <TopNav title="" light trailing={<button className="summary-screen__more" type="button" aria-label="更多"><DotsIcon /></button>} />
          <div className="summary-screen__meta">2026年8月 · 自动生成</div>
          <div className="summary-screen__title-wrap">
            <span className="summary-screen__title-mark" />
            <h2 className="summary-screen__title">你的 8 月回顾</h2>
          </div>
          <TypeTag tone="brand">智能总结</TypeTag>
        </div>

        <div className="summary-screen__body">
          <div className="summary-screen__divider" />
          <p>
            这个月你输入最多的内容来自产品想法和节奏焦虑。你并不缺灵感，真正的问题是每次想到之后都会被下一件事打断，于是记录堆积，但没有形成复用闭环。
          </p>

          <section className="summary-screen__section">
            <h3>最值得保留的趋势</h3>
            <ul>
              <li><strong>主动复盘意识</strong> 在增强，你开始不满足于"记下来就算完成"。</li>
              <li><strong>AI 输出长度</strong> 成为阻碍，越长越不容易形成下一个动作。</li>
              <li><strong>时间窗口</strong> 是关键变量，固定回看时机比增加输入量更有效。</li>
            </ul>
          </section>

          <section className="summary-screen__section">
            <h3>下一轮建议</h3>
            <ol>
              <li>把周记推送改成一个稳定时间点，例如周日 20:00。</li>
              <li>让 AI 默认输出"1 句判断 + 2 条建议"的短格式。</li>
            </ol>
          </section>

          <div className="summary-screen__references">
            <div className="summary-screen__references-title">
              <QuoteIcon />
              <span>引用 3 条相关内容</span>
            </div>
            <div className="summary-screen__reference-item">MindBack 内部记录 · "我需要一个会催我回看的系统"</div>
            <div className="summary-screen__reference-item">产品讨论频道 · "长总结的转化率不高"</div>
            <div className="summary-screen__reference-item">语音速记 · "要把回顾时间固定下来"</div>
            <div className="summary-screen__footer-note">内容由 AI 生成</div>
          </div>
        </div>
      </div>
    </MobileShell>
  )
}