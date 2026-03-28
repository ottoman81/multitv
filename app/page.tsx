"use client";

import { useState, useEffect, useCallback } from "react";
import VideoGrid from "@/components/VideoGrid";
import SettingsPanel from "@/components/SettingsPanel";
import { Channel, DEFAULT_CHANNELS, GridSize } from "@/data/channels";
import { Locale, t } from "@/lib/i18n";

const STORAGE_KEY = "multitv_settings";

function loadFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>(DEFAULT_CHANNELS);
  const [gridSize, setGridSize] = useState<GridSize>(4);
  const [locale, setLocale] = useState<Locale>("tr");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [ytQuery, setYtQuery] = useState("news");
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);

  const loadFromYoutube = useCallback(async () => {
    try {
      setYtError(null);
      setYtLoading(true);
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(ytQuery)}&maxResults=12`);
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();

      if (!json.items) throw new Error("No items returned");
      const loaded: Channel[] = json.items
        .filter((item: any) => item.id?.videoId)
        .map((item: any, index: number) => ({
          id: `yt-${item.id.videoId}-${index}`,
          name: item.snippet?.channelTitle ?? item.snippet?.title ?? `Video ${index + 1}`,
          videoSlug: item.id.videoId,
          country: "YY",
        }));

      if (loaded.length > 0) setChannels(loaded);
    } catch (err: any) {
      setYtError(err?.message ?? "Bilinmeyen hata");
    } finally {
      setYtLoading(false);
    }
  }, [ytQuery]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.channels) setChannels(saved.channels);
      if (saved.gridSize) setGridSize(saved.gridSize);
      if (saved.locale) setLocale(saved.locale);
    } else {
      // Detect browser language
      const lang = navigator.language.slice(0, 2);
      if (["tr", "en", "es", "fr"].includes(lang)) setLocale(lang as Locale);
    }
  }, []);

  const handleApply = useCallback(
    (newChannels: Channel[], newGrid: GridSize, newLocale: Locale) => {
      setChannels(newChannels);
      setGridSize(newGrid);
      setLocale(newLocale);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ channels: newChannels, gridSize: newGrid, locale: newLocale })
      );
    },
    []
  );

  const handleChannelClick = (index: number) => {
    setEditingIndex(index);
    setSettingsOpen(true);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <main className="app-root">
      {/* Top bar */}
      <div className="topbar">
        <div className="brand">
          <span className="brand-title">📺 Multi TV</span>
          <span className="brand-subtitle">{gridSize} {t(locale, "channel")}</span>
        </div>

        <div className="actions">
          <button
            onClick={handleFullscreen}
            className="icon-btn"
            title={t(locale, "fullscreen")}
          >
            ⛶
          </button>
          <button
            onClick={() => { setEditingIndex(null); setSettingsOpen(true); }}
            className="primary-btn"
          >
            ⚙️ {t(locale, "settings")}
          </button>
        </div>
      </div>

      <div className="youtube-loader">
        <input
          value={ytQuery}
          onChange={(e) => setYtQuery(e.target.value)}
          className="youtube-query"
          placeholder="YouTube arama terimi"
        />
        <button onClick={loadFromYoutube} className="load-btn" disabled={ytLoading}>
          {ytLoading ? "Yükleniyor..." : "YouTube API ile Yükle"}
        </button>
        {ytError && <div className="error-text">{ytError}</div>}
      </div>

      {/* Grid area */}
      <div className="grid-area">
        <VideoGrid
          channels={channels}
          gridSize={gridSize}
          onChannelClick={handleChannelClick}
        />
      </div>

      {/* Settings panel */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => { setSettingsOpen(false); setEditingIndex(null); }}
        channels={channels}
        gridSize={gridSize}
        locale={locale}
        editingIndex={editingIndex}
        onApply={handleApply}
      />
    </main>
  );
}
