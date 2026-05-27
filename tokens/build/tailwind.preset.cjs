// tailwind.preset.cjs —— 由 scripts/build-tokens.mjs 生成
// 在 docs 站的 tailwind.config 里 `presets: [require('@/tokens/build/tailwind.preset.cjs')]` 引入。
module.exports = {
  theme: {
    extend: {
      colors: {
  "label-primary": "var(--label-primary)",
  "label-secondary": "var(--label-secondary)",
  "label-tertiary": "var(--label-tertiary)",
  "label-quaternary": "var(--label-quaternary)",
  "bg-0": "var(--bg-0)",
  "bg-1": "var(--bg-1)",
  "bg-2": "var(--bg-2)",
  "bg-3": "var(--bg-3)",
  "bg-4": "var(--bg-4)",
  "fill-primary": "var(--fill-primary)",
  "fill-secondary": "var(--fill-secondary)",
  "fill-tertiary": "var(--fill-tertiary)",
  "fill-quaternary": "var(--fill-quaternary)",
  "fill-inverted-primary": "var(--fill-inverted-primary)",
  "fill-inverted-secondary": "var(--fill-inverted-secondary)",
  "fill-inverted-tertiary": "var(--fill-inverted-tertiary)",
  "fill-inverted-quaternary": "var(--fill-inverted-quaternary)",
  "line-opaque": "var(--line-opaque)",
  "line-non-opaque": "var(--line-non-opaque)",
  "brand-blue": "var(--brand-blue)",
  "brand-blue-light": "var(--brand-blue-light)",
  "brand-blue-border": "var(--brand-blue-border)",
  "brand-blue-text": "var(--brand-blue-text)",
  "accent-blue": "var(--accent-blue)",
  "accent-yellow": "var(--accent-yellow)",
  "accent-green": "var(--accent-green)",
  "accent-pink": "var(--accent-pink)",
  "accent-brown": "var(--accent-brown)",
  "accent-event-blue": "var(--accent-event-blue)",
  "link": "var(--link)",
  "backdrop": "var(--backdrop)",
  "deco-teal": "var(--deco-teal)",
  "deco-sky": "var(--deco-sky)",
  "deco-lavender": "var(--deco-lavender)",
  "deco-sage": "var(--deco-sage)",
  "deco-rose": "var(--deco-rose)"
},
      spacing: {
  "1": "var(--space-1)",
  "2": "var(--space-2)",
  "3": "var(--space-3)",
  "4": "var(--space-4)",
  "5": "var(--space-5)",
  "6": "var(--space-6)",
  "7": "var(--space-7)",
  "8": "var(--space-8)",
  "9": "var(--space-9)",
  "10": "var(--space-10)"
},
      borderRadius: {
  "small": "var(--radius-small)",
  "medium": "var(--radius-medium)",
  "large": "var(--radius-large)",
  "xlarge": "var(--radius-x-large)",
  "full": "var(--radius-full)"
},
      fontSize: {
  "headline-h1": [
    "32px",
    {
      "lineHeight": "1.2",
      "fontWeight": "500"
    }
  ],
  "headline-h2": [
    "24px",
    {
      "lineHeight": "1.3",
      "fontWeight": "500"
    }
  ],
  "headline-h3": [
    "20px",
    {
      "lineHeight": "1.35",
      "fontWeight": "500"
    }
  ],
  "body-primary": [
    "17px",
    {
      "lineHeight": "1.5",
      "fontWeight": "400"
    }
  ],
  "body-secondary": [
    "15px",
    {
      "lineHeight": "1.45",
      "fontWeight": "400"
    }
  ],
  "callout": [
    "16px",
    {
      "lineHeight": "1.4",
      "fontWeight": "500"
    }
  ],
  "subhead": [
    "14px",
    {
      "lineHeight": "1.4",
      "fontWeight": "400"
    }
  ],
  "footnote": [
    "13px",
    {
      "lineHeight": "1.38",
      "fontWeight": "400"
    }
  ],
  "caption-1": [
    "12px",
    {
      "lineHeight": "1.3",
      "fontWeight": "400"
    }
  ],
  "caption-2": [
    "11px",
    {
      "lineHeight": "1.2",
      "fontWeight": "400"
    }
  ]
},
      transitionDuration: {
  "fast": "150ms",
  "normal": "250ms",
  "slow": "350ms"
},
      transitionTimingFunction: {
  "default": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)"
},
      boxShadow: {
  "modal": "var(--shadow-modal)"
},
    },
  },
}
