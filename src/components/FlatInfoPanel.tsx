"use client";

import type { FlatType } from "@/lib/flatTypes";

interface Props {
  flat: FlatType;
}

export default function FlatInfoPanel({ flat }: Props) {
  return (
    <div className="border-t border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-200">About this flat</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        {flat.description}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-slate-800 p-2">
          <p className="text-xs text-slate-500">Area</p>
          <p className="text-sm font-semibold">{flat.netAreaSqm} m²</p>
        </div>
        <div className="rounded-lg bg-slate-800 p-2">
          <p className="text-xs text-slate-500">Ceiling</p>
          <p className="text-sm font-semibold">{flat.wallHeight}m</p>
        </div>
        <div className="rounded-lg bg-slate-800 p-2">
          <p className="text-xs text-slate-500">Dimensions</p>
          <p className="text-sm font-semibold">
            {flat.totalWidth}×{flat.totalDepth}m
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-2">
          <p className="text-xs text-slate-500">Rooms</p>
          <p className="text-sm font-semibold">{flat.rooms.length}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-xs font-semibold text-slate-400">
          Room List
        </p>
        <div className="space-y-1">
          {flat.rooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center gap-2 rounded px-2 py-1 text-xs"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: room.color }}
              />
              <span className="flex-1">{room.name}</span>
              <span className="text-slate-500">
                {room.width}×{room.depth}m
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-xs font-semibold text-slate-400">Features</p>
        <ul className="space-y-0.5">
          {flat.features.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
              <span className="mt-0.5 text-green-400">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
