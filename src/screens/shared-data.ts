import type { AbilityCardItem, TypeTagTone } from './shared'

export const tagToneClassName: Record<TypeTagTone, string> = {
  brand: 'mb-type-tag--brand',
  brown: 'mb-type-tag--brown',
  sky: 'mb-type-tag--sky',
  sage: 'mb-type-tag--sage',
}

export const abilities: AbilityCardItem[] = [
  { title: '音视频解析', value: '6', unit: '次', state: '待使用', tone: 'brown' },
  { title: '时间碎片', value: '12', unit: '枚', state: '待使用', tone: 'sky' },
  { title: '频道数量', value: '2', unit: '个', state: '待创建', tone: 'sage' },
  { title: 'AI 溯源', value: '180', unit: '天', state: '有效期', tone: 'brand' },
  { title: 'Web 端内测', value: '1', unit: '个', state: '邀请好友获取', tone: 'sky' },
  { title: 'Live 图发送', value: '0', unit: '次', state: '即将上线', tone: 'sage' },
]
