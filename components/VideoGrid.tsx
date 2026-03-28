"use client";

import { Channel, GridSize, GRID_COLS } from "@/data/channels";

interface Props {
  channels: Channel[];
  gridSize: GridSize;
  onChannelClick: (index: number) => void;
}

export default function VideoGrid({ channels, gridSize, onChannelClick }: Props) {
  const cols = GRID_COLS[gridSize];
  const active = channels.slice(0, gridSize);

  return (
    <div
      className="w-full h-full grid gap-0.5 bg-black"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(gridSize / cols)}, 1fr)`,
      }}
    >
      {active.map((ch, i) => (
        <div key={ch.id + i} className="relative group bg-black overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${ch.videoSlug}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
            title={ch.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
          {/* Channel name badge */}
          <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none">
            {ch.name}
          </div>
          {/* Edit overlay on hover */}
          <button
            onClick={() => onChannelClick(i)}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
            aria-label={`Edit ${ch.name}`}
          >
            <span className="bg-white/90 text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              ✏️ Değiştir
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
