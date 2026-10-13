export interface RevoxFeature {
  title: string
  body: string
  crop: string
}

export interface RevoxCopy {
  tagline: string
  introTitle: string
  intro: string
  included: string
  download: string
  manual: string
  imageAlt: string
  enlarge: string
  featuresTitle: string
  features: RevoxFeature[]
  usesTitle: string
  uses: { name: string; body: string }[]
  capabilitiesTitle: string
  capabilities: string[]
  startTitle: string
  startBody: string
  mediaTodo: string
}

export const revoxCopy = {
  en: {
    tagline: "Vocals that stay clear when you stack them",
    introTitle: "A neural vocoder for vocal work",
    intro:
      "Heron Revox is driven by a neural network vocoder. It helps remove phase problems in vocals and supports pitch shifting up or down with much less loss—especially useful when you build harmonies and other vocal layers.",
    included:
      "A Heron plug-in for compatible DAWs. Packaging and download details are still being prepared.",
    download: "Download Heron Revox",
    manual: "Read the manual",
    imageAlt: "Heron Revox editor with Semitones and Cents controls",
    enlarge: "View full-size screenshot",
    featuresTitle: "Built around the vocal take",
    features: [
      {
        title: "Neural network vocoder",
        body: "A vocoder model drives the processing, so the plug-in can reshape vocal material without relying on a conventional phase-locked stack alone.",
        crop: "0 0 480 240"
      },
      {
        title: "Clearer stacked vocals",
        body: "Use it when doubled parts, harmonies, or similar layered vocals fight each other from phase problems.",
        crop: "120 90 720 360"
      },
      {
        title: "Pitch with less loss",
        body: "Shift a vocal up or down when you need a harmony or register change, with much less of the usual quality loss.",
        crop: "0 360 960 240"
      }
    ],
    usesTitle: "Where it fits the session",
    uses: [
      {
        name: "Phase cleanup",
        body: "Reduce phase problems that show up when vocal takes sit on top of each other."
      },
      {
        name: "Pitch shifting",
        body: "Move a vocal up or down while keeping more of the sound you started with."
      },
      {
        name: "Harmonies and layers",
        body: "Especially useful for harmonies and other vocal-layering scenarios."
      }
    ],
    capabilitiesTitle: "What this page covers today",
    capabilities: [
      "Neural network vocoder processing for vocals",
      "Help with phase problems in vocal material",
      "Pitch shifting up or down with much less loss",
      "Strong fit for harmonies and similar vocal layers",
      "TODO: Add audio demos for before/after and harmony examples",
      "TODO: Expand this list once verified product specifications are available"
    ],
    startTitle: "Hear the vocal stack more clearly",
    startBody:
      "When downloads are published, add Heron Revox in a compatible DAW and use it on vocals you plan to pitch, double, or stack into harmonies.",
    mediaTodo:
      "TODO: Add audio demos for before/after and harmony examples before release marketing."
  },
  zh: {
    tagline: "叠唱时，也保持清晰",
    introTitle: "面向人声的神经网络声码器",
    intro:
      "Heron Revox 由神经网络声码器驱动。它有助于消除人声中的相位问题，并支持上移或下移音高，且损耗更小——尤其适合和声与其他人声叠层场景。",
    included: "Heron 插件，可用于兼容的 DAW。打包与下载细节仍在准备中。",
    download: "下载 Heron Revox",
    manual: "阅读使用手册",
    imageAlt: "Heron Revox 编辑器，含 Semitones 与 Cents 控件",
    enlarge: "查看完整截图",
    featuresTitle: "围绕人声素材展开",
    features: [
      {
        title: "神经网络声码器",
        body: "处理由声码器模型驱动，不必只依赖传统的相位锁定叠层方式来重塑人声素材。",
        crop: "0 0 480 240"
      },
      {
        title: "更清晰的人声叠层",
        body: "当加倍轨、和声或类似叠层因相位问题互相打架时，可以使用它。",
        crop: "120 90 720 360"
      },
      {
        title: "音高变化，损耗更小",
        body: "需要和声或音区变化时上移或下移人声音高，并明显减轻常见的品质损失。",
        crop: "0 360 960 240"
      }
    ],
    usesTitle: "适合放进工程的位置",
    uses: [
      {
        name: "相位清理",
        body: "减轻多条人声叠在一起时出现的相位问题。"
      },
      {
        name: "音高变换",
        body: "上移或下移人声，同时保留更多原始听感。"
      },
      {
        name: "和声与叠层",
        body: "尤其适合和声与其他人声叠层场景。"
      }
    ],
    capabilitiesTitle: "本页目前写明的内容",
    capabilities: [
      "面向人声的神经网络声码器处理",
      "帮助处理人声素材中的相位问题",
      "上移或下移音高，且损耗更小",
      "适合和声与类似的人声叠层",
      "TODO：补充前后对比与和声音频演示",
      "TODO：在核实产品规格后扩展本列表"
    ],
    startTitle: "让人声叠层听得更清楚",
    startBody:
      "下载发布后，在兼容的 DAW 中加载 Heron Revox，用于你计划变调、加倍或叠成和声的人声。",
    mediaTodo: "TODO：发布营销前补充前后对比与和声音频演示。"
  }
} satisfies Record<"en" | "zh", RevoxCopy>
