"use client";

import { useState } from "react";
import { Channel, DEFAULT_CHANNELS, GRID_OPTIONS, GridSize } from "@/data/channels";
import { Locale, LOCALES, t, extractVideoId } from "@/lib/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  channels: Channel[];
  gridSize: GridSize;
  locale: Locale;
  editingIndex: number | null;
  onApply: (channels: Channel[], gridSize: GridSize, locale: Locale) => void;
}

export default function SettingsPanel({
  open, onClose, channels, gridSize, locale, editingIndex, onApply,
}: Props) {
  const [localChannels, setLocalChannels] = useState<Channel[]>(channels);
  const [localGrid, setLocalGrid] = useState<GridSize>(gridSize);
  const [localLocale, setLocalLocale] = useState<Locale>(locale);
  const [urlInputs, setUrlInputs] = useState<string[]>(
    channels.map((c) => c.videoSlug)
  );

  if (!open) return null;

  const updateUrl = (i: number, val: string) => {
    const next = [...urlInputs];
    next[i] = val;
    setUrlInputs(next);
  };

  const updateName = (i: number, val: string) => {
    const next = [...localChannels];
    next[i] = { ...next[i], name: val };
    setLocalChannels(next);
  };

  const handleApply = () => {
    const merged = localChannels.map((ch, i) => ({
      ...ch,
      videoSlug: extractVideoId(urlInputs[i] ?? ch.videoSlug),
    }));
    onApply(merged, localGrid, localLocale);
    onClose();
  };

  const handleReset = () => {
    setLocalChannels(DEFAULT_CHANNELS);
    setUrlInputs(DEFAULT_CHANNELS.map((c) => c.videoSlug));
    setLocalGrid(4);
    setLocalLocale("tr");
  };

  const visibleCount = localGrid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 bg-zinc-900 text-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">{t(localLocale, "settings")}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Language */}
          <div>
            <label className="text-sm text-white/60 block mb-2">{t(localLocale, "language")}</label>
            <div className="flex gap-2 flex-wrap">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocalLocale(l.code)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    localLocale === l.code
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid size */}
          <div>
            <label className="text-sm text-white/60 block mb-2">{t(localLocale, "channelCount")}</label>
            <div className="flex gap-2 flex-wrap">
              {GRID_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setLocalGrid(n)}
                  className={`w-12 h-10 rounded text-sm font-bold transition-colors ${
                    localGrid === n
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Channel list */}
          <div>
            <label className="text-sm text-white/60 block mb-3">
              {t(localLocale, "channel")} ({visibleCount} aktif)
            </label>
            <div className="space-y-3">
              {localChannels.slice(0, visibleCount).map((ch, i) => (
                <div
                  key={ch.id + i}
                  className={`rounded-lg p-3 space-y-2 ${
                    editingIndex === i ? "bg-blue-600/20 ring-1 ring-blue-500" : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs w-5 text-right">{i + 1}</span>
                    <input
                      type="text"
                      value={ch.name}
                      onChange={(e) => updateName(i, e.target.value)}
                      placeholder="Kanal adı"
                      className="flex-1 bg-white/10 rounded px-2 py-1 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pl-7">
                    <input
                      type="text"
                      value={urlInputs[i] ?? ""}
                      onChange={(e) => updateUrl(i, e.target.value)}
                      placeholder={t(localLocale, "urlPlaceholder")}
                      className="flex-1 bg-white/10 rounded px-2 py-1 text-xs text-white/80 placeholder-white/30 outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2 rounded bg-white/10 text-white/70 hover:bg-white/20 text-sm transition-colors"
          >
            {t(localLocale, "resetDefaults")}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            {t(localLocale, "apply")}
          </button>
        </div>
      </div>
    </div>
  );
}
