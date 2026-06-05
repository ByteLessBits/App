"use client";

import { useState } from "react";
import { BLOCK_PRESETS } from "@/lib/flatTypes";
import type { PlacedBlock } from "./AppShell";

interface Props {
  onAdd: (presetId: string, w?: number, d?: number, h?: number) => void;
  placedBlocks: PlacedBlock[];
  onRemove: (id: string) => void;
}

const CATEGORIES = ["Bedroom", "Living", "Dining", "Kitchen", "Study", "Custom"];

export default function BlockPalette({ onAdd, placedBlocks, onRemove }: Props) {
  const [customW, setCustomW] = useState(1.0);
  const [customD, setCustomD] = useState(1.0);
  const [customH, setCustomH] = useState(1.0);
  const [customName, setCustomName] = useState("My Block");
  const [expandedCat, setExpandedCat] = useState<string | null>("Bedroom");

  return (
    <div className="p-3">
      {/* Preset blocks */}
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Add Furniture / Blocks
      </p>
      <p className="mb-3 px-1 text-xs text-slate-500">
        Click to drop into the center of the flat, then drag in 3D view.
      </p>

      {CATEGORIES.map((cat) => {
        if (cat === "Custom") return null;
        const items = BLOCK_PRESETS.filter((b) => b.category === cat);
        const isOpen = expandedCat === cat;
        return (
          <div key={cat} className="mb-1">
            <button
              onClick={() => setExpandedCat(isOpen ? null : cat)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-semibold text-slate-300 hover:bg-slate-800"
            >
              <span>{cat}</span>
              <span className="text-slate-500">{isOpen ? "▾" : "▸"}</span>
            </button>
            {isOpen && (
              <div className="ml-1 space-y-0.5 pb-1">
                {items.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onAdd(preset.id)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition hover:bg-slate-800"
                  >
                    <span
                      className="inline-block h-4 w-4 rounded-sm"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="flex-1">{preset.name}</span>
                    <span className="text-slate-500">
                      {preset.width}×{preset.depth}×{preset.height}m
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Custom block builder */}
      <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/50 p-3">
        <p className="mb-2 text-xs font-semibold text-amber-400">
          ✨ Custom Block
        </p>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-slate-400">Name</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="mt-0.5 w-full rounded bg-slate-900 px-2 py-1 text-xs text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-slate-400">W (m)</label>
              <input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={customW}
                onChange={(e) => setCustomW(Number(e.target.value))}
                className="mt-0.5 w-full rounded bg-slate-900 px-2 py-1 text-xs text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">D (m)</label>
              <input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={customD}
                onChange={(e) => setCustomD(Number(e.target.value))}
                className="mt-0.5 w-full rounded bg-slate-900 px-2 py-1 text-xs text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">H (m)</label>
              <input
                type="number"
                min={0.1}
                max={3}
                step={0.1}
                value={customH}
                onChange={(e) => setCustomH(Number(e.target.value))}
                className="mt-0.5 w-full rounded bg-slate-900 px-2 py-1 text-xs text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => onAdd("custom-box", customW, customD, customH)}
            className="w-full rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-500"
          >
            + Add Custom Block ({customW}×{customD}×{customH}m)
          </button>
        </div>
      </div>

      {/* Placed blocks list */}
      {placedBlocks.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Placed ({placedBlocks.length})
          </p>
          <div className="max-h-48 space-y-0.5 overflow-y-auto">
            {placedBlocks.map((block) => (
              <div
                key={block.id}
                className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-slate-800"
              >
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: block.color }}
                />
                <span className="flex-1 truncate">{block.name}</span>
                <span className="text-slate-500">
                  {block.width}×{block.depth}m
                </span>
                <button
                  onClick={() => onRemove(block.id)}
                  className="text-red-400 hover:text-red-300"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
