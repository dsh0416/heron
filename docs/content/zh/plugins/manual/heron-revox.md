---
title: Heron Revox
description: Heron Revox 概览：面向人声相位清理、音高变换与和声叠层的神经网络声码器插件。
vstTrademark: true
---

# Heron Revox

Heron Revox 是一款由神经网络声码器驱动的插件。它可消除人声中的相位问题，并支持
上移或下移音高且损耗更小。尤其适合和声与类似的人声叠层场景。

功能概览请参阅 [Heron Revox](../heron-revox.md)。

![Heron Revox 编辑器，含 Semitones 与 Cents 控件](/plugins/heron-revox.png)

## 开始使用

1. 下载可用后，按操作系统与 DAW 支持的格式[安装 Heron 插件](../releases.md)。
2. 重新启动 DAW，必要时重新扫描插件目录。
3. 在人声轨上添加 **Heron Revox** 音频效果，并打开编辑器。

TODO：后续补充更详细的编辑器控件、参数与工作流程说明。

## 各平台 GPU 加速支持

Revox 通过 ONNX Runtime 按固定优先级注册执行提供程序。可用的 GPU 后端会先注册，
CPU 始终作为最终回退。没有手动后端选择器。下表反映的是
[heron-plugins](https://github.com/minori-live/heron-plugins) 当前代码实际编译并
注册的内容，并不表示每个算子都在 GPU 上运行。

| 平台                  | 后端（优先级）                                  | 状态                                                                                                               |
| --------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| macOS · Apple Silicon | CoreML → WebGPU → CPU                           | 已支持。CoreML 为主要路径，并已在 Apple Silicon 上验证；WebGPU 仍属实验性质。                                      |
| macOS · Intel         | CoreML → WebGPU → CPU（需自行提供 ORT）         | Intel macOS 没有固定的 ORT rc.14 预构建包。默认按仅 CPU 交付；若通过 `ORT_LIB_PATH` 提供外部 ORT，则可启用上述链。 |
| Windows · x64         | TensorRT RTX → TensorRT → CUDA → DirectML → CPU | 已编入 Windows x64 包。GPU 后端依赖相应驱动/运行时；硬件验证仍待完成。                                             |
| Linux · x64           | TensorRT RTX → TensorRT → CUDA → CPU            | 已编入 Linux x64 包。需要 CUDA/TensorRT 运行时；硬件验证仍待完成。无 Vulkan EP。                                   |
| Linux · arm64         | TensorRT RTX → TensorRT → CUDA → CPU            | 与 Linux x64 相同的注册链。需要 CUDA/TensorRT 运行时；硬件验证仍待完成。无 Vulkan EP。                             |

Revox 链路中没有 Metal 或 Vulkan 的 ONNX 执行提供程序。WebGPU 使用 Dawn，上游仍属
实验性质。CUDA 与 TensorRT 构建需要匹配的 NVIDIA 运行时（当前 ORT 包要求
CUDA 13.2+ / cuDNN 9.23+）。

产品页上的矩阵版式见 [Heron Revox](../heron-revox.md)。

## 相关页面

- [Heron Revox 介绍](../heron-revox.md)
- [插件发布版本](../releases.md)
- [插件手册概览](index.md)
