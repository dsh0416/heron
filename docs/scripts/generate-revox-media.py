#!/usr/bin/env python3
"""Generate reproducible Heron Revox marketing imagery.

Outputs (under docs/content/public/plugins/):
  - heron-revox-mel.png      Mel spectrogram of a synthetic harmonic stack
                             (original + pitch-shifted layers)
  - heron-revox-phase.png    Waveform / phase-alignment comparison
  - heron-revox-hero-bg.png  Soft mel-band motif for the product hero banner

Palette matches the VitePress dark product pages:
  background #171a1f, midi purple #a98ade, cyan #72c3c7, gold #e5d899.
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content" / "public" / "plugins"

SR = 22_050
DURATION = 1.6
N_FFT = 1024
HOP = 256
N_MELS = 64
FMIN = 80.0
FMAX = 8_000.0

BG = "#171a1f"
PURPLE = "#a98ade"
CYAN = "#72c3c7"
GOLD = "#e5d899"
SOFT = "#242426"


def hz_to_mel(freq: np.ndarray | float) -> np.ndarray | float:
    return 2595.0 * np.log10(1.0 + np.asarray(freq, dtype=np.float64) / 700.0)


def mel_to_hz(mel: np.ndarray | float) -> np.ndarray | float:
    return 700.0 * (10.0 ** (np.asarray(mel, dtype=np.float64) / 2595.0) - 1.0)


def mel_filterbank(n_fft: int, sr: int, n_mels: int, fmin: float, fmax: float) -> np.ndarray:
    n_freqs = n_fft // 2 + 1
    mels = np.linspace(hz_to_mel(fmin), hz_to_mel(fmax), n_mels + 2)
    hz = mel_to_hz(mels)
    bins = np.floor((n_fft + 1) * hz / sr).astype(int)
    weights = np.zeros((n_mels, n_freqs), dtype=np.float64)
    for index in range(n_mels):
        left, center, right = bins[index], bins[index + 1], bins[index + 2]
        if center == left:
            center += 1
        if right == center:
            right += 1
        for bin_index in range(left, center):
            if 0 <= bin_index < n_freqs:
                weights[index, bin_index] = (bin_index - left) / (center - left)
        for bin_index in range(center, right):
            if 0 <= bin_index < n_freqs:
                weights[index, bin_index] = (right - bin_index) / (right - center)
    enorm = 2.0 / (mel_to_hz(mels[2:]) - mel_to_hz(mels[:-2]))
    weights *= enorm[:, np.newaxis]
    return weights


def stft_magnitude(signal: np.ndarray, n_fft: int, hop: int) -> np.ndarray:
    window = np.hanning(n_fft)
    frames = 1 + (len(signal) - n_fft) // hop
    spectrum = np.empty((n_fft // 2 + 1, frames), dtype=np.float64)
    for frame in range(frames):
        start = frame * hop
        chunk = signal[start : start + n_fft] * window
        spectrum[:, frame] = np.abs(np.fft.rfft(chunk))
    return spectrum


def mel_spectrogram(signal: np.ndarray) -> np.ndarray:
    magnitude = stft_magnitude(signal, N_FFT, HOP)
    weights = mel_filterbank(N_FFT, SR, N_MELS, FMIN, FMAX)
    power = np.maximum(weights @ (magnitude**2), 1e-10)
    return 10.0 * np.log10(power)


def glottal_buzz(frequency: float, length: int, sr: int, rng: np.random.Generator) -> np.ndarray:
    """Band-limited harmonic source with gentle formant shaping."""
    time = np.arange(length, dtype=np.float64) / sr
    signal = np.zeros(length, dtype=np.float64)
    for harmonic in range(1, 18):
        amplitude = 1.0 / (harmonic**1.15)
        phase = rng.uniform(0.0, 2.0 * np.pi)
        signal += amplitude * np.sin(2.0 * np.pi * frequency * harmonic * time + phase)
    # Three fixed formant peaks (voice-like envelope in the time domain via filtering Lite)
    formants = ((700.0, 0.55), (1200.0, 0.35), (2600.0, 0.22))
    shaped = np.zeros_like(signal)
    for center, gain in formants:
        # Resonant one-pole-ish emphasis via sinusoidal AM around formant (cheap, stable)
        shaped += gain * signal * (0.55 + 0.45 * np.sin(2.0 * np.pi * (center / 40.0) * time))
    envelope = np.hanning(length) ** 0.35
    noise = 0.015 * rng.standard_normal(length)
    return (shaped + noise) * envelope


def pitch_shift(signal: np.ndarray, semitones: float) -> np.ndarray:
    """Integer-ratio resample pitch shift (quality is fine for spectrogram art)."""
    ratio = 2.0 ** (semitones / 12.0)
    source_positions = np.arange(0, len(signal), ratio)
    source_positions = source_positions[source_positions < len(signal) - 1]
    left = np.floor(source_positions).astype(int)
    frac = source_positions - left
    shifted = (1.0 - frac) * signal[left] + frac * signal[left + 1]
    if len(shifted) < len(signal):
        shifted = np.pad(shifted, (0, len(signal) - len(shifted)))
    else:
        shifted = shifted[: len(signal)]
    return shifted * np.hanning(len(shifted)) ** 0.2


def site_cmap() -> LinearSegmentedColormap:
    return LinearSegmentedColormap.from_list(
        "heron_revox",
        [BG, "#2a2d36", "#3d4560", PURPLE, CYAN, GOLD],
        N=256,
    )


def write_mel_card(path: Path, rng: np.random.Generator) -> None:
    length = int(SR * DURATION)
    fundamental = 175.0
    original = glottal_buzz(fundamental, length, SR, rng)
    harmony_up = 0.7 * pitch_shift(original, 3.0)
    harmony_fifth = 0.55 * pitch_shift(original, 7.0)
    stack = original + harmony_up + harmony_fifth
    stack /= np.max(np.abs(stack)) + 1e-9

    mel = mel_spectrogram(stack)

    fig, axes = plt.subplots(
        1,
        2,
        figsize=(10.4, 5.2),
        dpi=140,
        gridspec_kw={"width_ratios": [1.05, 1.0], "wspace": 0.08},
    )
    fig.patch.set_facecolor(BG)

    original_mel = mel_spectrogram(original)
    for axis, matrix, title in (
        (axes[0], original_mel, "Original"),
        (axes[1], mel, "Harmony stack (+3 / +7 st)"),
    ):
        axis.set_facecolor(BG)
        image = axis.imshow(
            matrix,
            origin="lower",
            aspect="auto",
            cmap=site_cmap(),
            interpolation="bilinear",
        )
        image.set_clim(matrix.min() + 8.0, matrix.max())
        axis.set_xticks([])
        axis.set_yticks([])
        for spine in axis.spines.values():
            spine.set_color("#48494c")
            spine.set_linewidth(1.0)
        axis.set_title(title, color="#c9ced6", fontsize=12, pad=10)
        axis.text(
            0.03,
            0.08,
            "mel",
            transform=axis.transAxes,
            color="#8b919a",
            fontsize=9,
            alpha=0.9,
        )

    fig.subplots_adjust(left=0.03, right=0.98, top=0.88, bottom=0.08)
    fig.savefig(path, facecolor=BG, edgecolor="none")
    plt.close(fig)


def write_phase_card(path: Path, rng: np.random.Generator) -> None:
    length = int(SR * 0.045)
    time = np.arange(length) / SR
    carrier = 220.0
    clean = np.sin(2.0 * np.pi * carrier * time)
    delayed = np.sin(2.0 * np.pi * carrier * time + 0.85)
    cancelled = 0.5 * (clean + delayed)
    aligned = 0.5 * (clean + clean)

    fig, axes = plt.subplots(2, 1, figsize=(10.4, 5.2), dpi=140, sharex=True)
    fig.patch.set_facecolor(BG)

    series = (
        (axes[0], clean, delayed, cancelled, "Phase conflict", PURPLE, CYAN, GOLD),
        (axes[1], clean, clean, aligned, "Aligned sum", CYAN, GOLD, PURPLE),
    )
    for axis, left, right, mix, title, c1, c2, c3 in series:
        axis.set_facecolor(SOFT)
        axis.plot(time * 1000.0, left, color=c1, lw=1.6, alpha=0.9, label="A")
        axis.plot(time * 1000.0, right, color=c2, lw=1.6, alpha=0.85, label="B")
        axis.plot(time * 1000.0, mix, color=c3, lw=2.4, alpha=0.95, label="A+B")
        axis.set_ylim(-1.35, 1.35)
        axis.set_yticks([])
        axis.set_title(title, color="#c9ced6", fontsize=12, loc="left", pad=8)
        axis.grid(True, axis="x", color="#3a3d45", lw=0.6, alpha=0.7)
        for spine in axis.spines.values():
            spine.set_color("#48494c")
        legend = axis.legend(
            loc="upper right",
            frameon=False,
            fontsize=9,
            labelcolor="#aeb4bc",
            ncol=3,
        )
        legend.get_frame().set_alpha(0.0)

    axes[1].set_xlabel("Time (ms)", color="#8b919a", fontsize=10)
    axes[1].tick_params(colors="#8b919a", labelsize=9)
    axes[0].tick_params(colors="#8b919a", labelbottom=False)
    fig.suptitle(
        "Stacked vocals: destructive vs constructive phase",
        color="#eef0f2",
        fontsize=13,
        y=0.98,
    )
    fig.subplots_adjust(left=0.05, right=0.98, top=0.88, bottom=0.12, hspace=0.28)
    fig.savefig(path, facecolor=BG, edgecolor="none")
    plt.close(fig)


def write_hero_background(path: Path, rng: np.random.Generator) -> None:
    """Soft mel-band / formant motif for the product banner."""
    length = int(SR * 2.4)
    voice = glottal_buzz(165.0, length, SR, rng)
    voice += 0.45 * pitch_shift(voice, 4.0)
    mel = mel_spectrogram(voice)

    fig = plt.figure(figsize=(14.4, 4.4), dpi=120)
    fig.patch.set_facecolor(BG)
    axis = fig.add_axes([0, 0, 1, 1])
    axis.set_facecolor(BG)
    axis.imshow(
        mel,
        origin="lower",
        aspect="auto",
        cmap=site_cmap(),
        interpolation="bilinear",
        alpha=0.92,
    )
    # Overlay a few formant guide curves in product stroke colors
    width = mel.shape[1]
    xs = np.linspace(0, width - 1, width)
    for color, offset, amp, lw in (
        (PURPLE, 18, 7, 1.5),
        (CYAN, 28, 9, 1.8),
        (GOLD, 38, 6, 2.2),
    ):
        ys = offset + amp * np.sin(np.linspace(0, 3.2 * np.pi, width) + offset)
        axis.plot(xs, ys, color=color, lw=lw, alpha=0.55)
    axis.set_xlim(0, width - 1)
    axis.set_ylim(0, mel.shape[0] - 1)
    axis.axis("off")
    # Soft vignette panels to keep typography readable
    axis.add_patch(
        FancyBboxPatch(
            (0, 0),
            width,
            mel.shape[0],
            boxstyle="square,pad=0",
            linewidth=0,
            facecolor=BG,
            alpha=0.18,
        )
    )
    fig.savefig(path, facecolor=BG, edgecolor="none")
    plt.close(fig)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(26012)
    write_mel_card(OUT / "heron-revox-mel.png", rng)
    write_phase_card(OUT / "heron-revox-phase.png", rng)
    write_hero_background(OUT / "heron-revox-hero-bg.png", rng)
    for name in ("heron-revox-mel.png", "heron-revox-phase.png", "heron-revox-hero-bg.png"):
        print(f"wrote {OUT / name}")


if __name__ == "__main__":
    main()
