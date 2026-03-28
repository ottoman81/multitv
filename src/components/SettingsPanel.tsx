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
    <div className="settings-overlay">
      {/* Backdrop */}
      <div className="settings-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="settings-panel">
        {/* Header */}
        <div className="settings-header">
          <h2>{t(localLocale, "settings")}</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="settings-body">
          {/* Language */}
          <div className="field-block">
            <label>{t(localLocale, "language")}</label>
            <div className="button-group">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocalLocale(l.code)}
                  className={localLocale === l.code ? "toggle-btn active" : "toggle-btn"}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid size */}
          <div className="field-block">
            <label>{t(localLocale, "channelCount")}</label>
            <div className="button-group">
              {GRID_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setLocalGrid(n)}
                  className={localGrid === n ? "grid-btn active" : "grid-btn"}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Channel list */}
          <div className="field-block">
            <label>{t(localLocale, "channel")} ({visibleCount} aktif)</label>
            <div className="channel-list">
              {localChannels.slice(0, visibleCount).map((ch, i) => (
                <div
                  key={ch.id + i}
                  className={editingIndex === i ? "channel-item active" : "channel-item"}
                >
                  <div className="channel-row">
                    <span className="channel-number">{i + 1}</span>
                    <input
                      type="text"
                      value={ch.name}
                      onChange={(e) => updateName(i, e.target.value)}
                      placeholder="Kanal adı"
                      className="channel-input"
                    />
                  </div>
                  <div className="channel-row channel-url-row">
                    <input
                      type="text"
                      value={urlInputs[i] ?? ""}
                      onChange={(e) => updateUrl(i, e.target.value)}
                      placeholder={t(localLocale, "urlPlaceholder")}
                      className="channel-input url-input"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <button onClick={handleReset} className="secondary-btn">
            {t(localLocale, "resetDefaults")}
          </button>
          <button onClick={handleApply} className="primary-btn">
            {t(localLocale, "apply")}
          </button>
        </div>
      </div>
    </div>
  );
}
