"use client";

import type { FlatType } from "@/lib/flatTypes";

interface Props {
  flats: FlatType[];
  selected: FlatType;
  onSelect: (flat: FlatType) => void;
}

export default function FlatMenu({ flats, selected, onSelect }: Props) {
  return (
    <div className="p-3">
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Select Flat Type
      </p>
      <div className="space-y-1">
        {flats.map((flat) => {
          const isActive = flat.id === selected.id;
          return (
            <button
              key={flat.id}
              onClick={() => onSelect(flat)}
              className={`w-full rounded-lg p-3 text-left transition ${
                isActive
                  ? "bg-blue-600/20 ring-1 ring-blue-500"
                  : "hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{flat.name}</span>
                <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                  {flat.occupancy}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{flat.subtitle}</p>
              <p className="mt-1 text-xs text-slate-500">
                {flat.netAreaSqm} m² · {flat.netAreaSqft} sq ft
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
