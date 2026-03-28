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
      className="video-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(gridSize / cols)}, 1fr)`,
      }}
    >
      {active.map((ch, i) => (
        <div key={ch.id + i} className="video-item">
          <iframe
            src={`https://www.youtube.com/embed/${ch.videoSlug}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
            title={ch.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          />
          {/* Channel name badge */}
          <div className="channel-badge">
            {ch.name}
          </div>
          {/* Edit button */}
          <button
            onClick={() => onChannelClick(i)}
            className="edit-btn"
            aria-label={`Edit ${ch.name}`}
          >
            ✏️
          </button>
        </div>
      ))}
    </div>
  );
}
