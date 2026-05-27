import { MobileShell, TopNav, InfoIcon, CloseIcon, BrandButton, abilities, AbilityCard } from './shared'

export function TimeFragmentScreen() {
  return (
    <MobileShell>
      <div className="fragment-screen">
        <TopNav title="记录事务所" />

        <div className="fragment-screen__content">
          <section className="fragment-screen__hero">
            <div className="fragment-screen__hero-tag">
              <span>记忆点</span>
              <InfoIcon />
            </div>
            <div className="fragment-screen__hero-score">
              <span className="fragment-screen__hero-number">42</span>
              <span className="fragment-screen__hero-unit">点</span>
            </div>
            <div className="fragment-screen__hero-hint">每日记录三条可获得 1 个记忆点</div>
          </section>

          <div className="fragment-screen__section-title">
            <span className="fragment-screen__section-bar" />
            <span>我的能力</span>
          </div>

          <div className="fragment-screen__grid">
            {abilities.map((item) => (
              <AbilityCard key={item.title} item={item} />
            ))}
          </div>

          <div className="fragment-screen__cta-wrap">
            <BrandButton variant="primary" size="standard">邀请好友 获得限时奖励</BrandButton>
          </div>

          <section className="mb-card mb-card--container fragment-screen__invite">
            <button className="fragment-screen__invite-close" type="button" aria-label="关闭">
              <CloseIcon />
            </button>
            <div className="fragment-screen__invite-title">填写邀请码，获得新人礼包</div>
            <div className="fragment-screen__invite-copy">可领取时间碎片、音视频解析等能力</div>
            <BrandButton variant="soft" size="compact">填写领取</BrandButton>
          </section>
        </div>
      </div>
    </MobileShell>
  )
}