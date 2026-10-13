export interface RevoxFeature {
  title: string
  body: string
  /** Public path under /plugins/, resolved with withBase by the page. */
  media: string
  mediaAlt: string
}

export interface RevoxAccelerationRow {
  platform: string
  backends: string
  status: string
  tone: "ready" | "limited" | "planned"
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
  accelerationTitle: string
  accelerationIntro: string
  accelerationNote: string
  accelerationPlatformLabel: string
  accelerationBackendsLabel: string
  accelerationStatusLabel: string
  accelerationRows: RevoxAccelerationRow[]
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
        media: "/plugins/heron-revox-network.svg",
        mediaAlt: "Abstract neural network with layered nodes and soft connections"
      },
      {
        title: "Clearer stacked vocals",
        body: "Use it when doubled parts, harmonies, or similar layered vocals fight each other from phase problems.",
        media: "/plugins/heron-revox-mel.png",
        mediaAlt: "Mel spectrogram of a synthetic vocal take beside a pitch-shifted harmony stack"
      },
      {
        title: "Phase that stays coherent",
        body: "Reduce phase problems that show up when vocal takes sit on top of each other, so layered parts sum instead of cancel.",
        media: "/plugins/heron-revox-phase.png",
        mediaAlt: "Waveform comparison of phase conflict versus aligned summed vocals"
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
    accelerationTitle: "GPU acceleration by platform",
    accelerationIntro:
      "Revox runs ONNX Runtime with an ordered execution-provider chain. Available GPU backends register first; CPU remains the final fallback. There is no manual backend selector.",
    accelerationNote:
      "A registered provider does not prove every operator runs on the GPU. WebGPU uses Dawn and remains experimental upstream. CUDA and TensorRT builds need matching NVIDIA runtimes (CUDA 13.2+ / cuDNN 9.23+ for the current ORT package).",
    accelerationPlatformLabel: "Platform",
    accelerationBackendsLabel: "Backends (priority order)",
    accelerationStatusLabel: "Status",
    accelerationRows: [
      {
        platform: "macOS · Apple Silicon",
        backends: "CoreML → WebGPU → CPU",
        status: "Supported. CoreML is the primary path and has been exercised on Apple Silicon; WebGPU is experimental.",
        tone: "ready"
      },
      {
        platform: "macOS · Intel",
        backends: "CoreML → WebGPU → CPU (when ORT is supplied)",
        status:
          "No pinned ORT rc.14 prebuilt for Intel macOS. Ship as CPU-only unless an external ORT build is provided through ORT_LIB_PATH.",
        tone: "limited"
      },
      {
        platform: "Windows · x64",
        backends: "TensorRT RTX → TensorRT → CUDA → DirectML → CPU",
        status:
          "Compiled into the Windows x64 package. GPU backends need matching drivers/runtimes; hardware validation is still outstanding.",
        tone: "planned"
      },
      {
        platform: "Linux · x64",
        backends: "TensorRT RTX → TensorRT → CUDA → CPU",
        status:
          "Compiled into the Linux x64 package. Needs CUDA/TensorRT runtimes; hardware validation is still outstanding. No Vulkan EP.",
        tone: "planned"
      },
      {
        platform: "Linux · arm64",
        backends: "TensorRT RTX → TensorRT → CUDA → CPU",
        status:
          "Same registration chain as Linux x64. Needs CUDA/TensorRT runtimes; hardware validation is still outstanding. No Vulkan EP.",
        tone: "planned"
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
        media: "/plugins/heron-revox-network.svg",
        mediaAlt: "抽象神经网络示意：多层节点与柔和连线"
      },
      {
        title: "更清晰的人声叠层",
        body: "当加倍轨、和声或类似叠层因相位问题互相打架时，可以使用它。",
        media: "/plugins/heron-revox-mel.png",
        mediaAlt: "合成人声原轨与变调和声叠层的梅尔频谱对比"
      },
      {
        title: "相位保持一致",
        body: "减轻多条人声叠在一起时出现的相位问题，让叠层相加而不是互相抵消。",
        media: "/plugins/heron-revox-phase.png",
        mediaAlt: "相位冲突与对齐后相加的波形对比"
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
    accelerationTitle: "各平台 GPU 加速支持",
    accelerationIntro:
      "Revox 通过 ONNX Runtime 按固定优先级注册执行提供程序。可用的 GPU 后端会先注册，CPU 始终作为最终回退。没有手动后端选择器。",
    accelerationNote:
      "“已注册”并不代表每个算子都在 GPU 上运行。WebGPU 使用 Dawn，上游仍属实验性质。CUDA 与 TensorRT 构建需要匹配的 NVIDIA 运行时（当前 ORT 包要求 CUDA 13.2+ / cuDNN 9.23+）。",
    accelerationPlatformLabel: "平台",
    accelerationBackendsLabel: "后端（优先级）",
    accelerationStatusLabel: "状态",
    accelerationRows: [
      {
        platform: "macOS · Apple Silicon",
        backends: "CoreML → WebGPU → CPU",
        status: "已支持。CoreML 为主要路径，并已在 Apple Silicon 上验证；WebGPU 仍属实验性质。",
        tone: "ready"
      },
      {
        platform: "macOS · Intel",
        backends: "CoreML → WebGPU → CPU（需自行提供 ORT）",
        status:
          "Intel macOS 没有固定的 ORT rc.14 预构建包。默认按仅 CPU 交付；若通过 ORT_LIB_PATH 提供外部 ORT，则可启用上述链。",
        tone: "limited"
      },
      {
        platform: "Windows · x64",
        backends: "TensorRT RTX → TensorRT → CUDA → DirectML → CPU",
        status: "已编入 Windows x64 包。GPU 后端依赖相应驱动/运行时；硬件验证仍待完成。",
        tone: "planned"
      },
      {
        platform: "Linux · x64",
        backends: "TensorRT RTX → TensorRT → CUDA → CPU",
        status: "已编入 Linux x64 包。需要 CUDA/TensorRT 运行时；硬件验证仍待完成。无 Vulkan EP。",
        tone: "planned"
      },
      {
        platform: "Linux · arm64",
        backends: "TensorRT RTX → TensorRT → CUDA → CPU",
        status: "与 Linux x64 相同的注册链。需要 CUDA/TensorRT 运行时；硬件验证仍待完成。无 Vulkan EP。",
        tone: "planned"
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
