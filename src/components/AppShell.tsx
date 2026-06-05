"use client";

import { useState, useCallback } from "react";
import { FLAT_TYPES, BLOCK_PRESETS, type FlatType } from "@/lib/flatTypes";
import FlatMenu from "./FlatMenu";
import FlatInfoPanel from "./FlatInfoPanel";
import FloorPlan2D from "./FloorPlan2D";
import Scene3D from "./Scene3D";
import BlockPalette from "./BlockPalette";

export interface PlacedBlock {
  id: string;
  presetId: string;
  name: string;
  x: number;
  y: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  color: string;
}

export default function AppShell() {
  const [selectedFlat, setSelectedFlat] = useState<FlatType>(FLAT_TYPES[0]);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>([]);
  const [sidebarTab, setSidebarTab] = useState<"menu" | "blocks">("menu");

  const handleAddBlock = useCallback(
    (presetId: string, customW?: number, customD?: number, customH?: number) => {
      const preset = BLOCK_PRESETS.find((b) => b.id === presetId);
      if (!preset) return;
      const newBlock: PlacedBlock = {
        id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        presetId: preset.id,
        name: preset.name,
        x: selectedFlat.totalWidth / 2,
        y: 0,
        z: selectedFlat.totalDepth / 2,
        width: customW ?? preset.width,
        depth: customD ?? preset.depth,
        height: customH ?? preset.height,
        color: preset.color,
      };
      setPlacedBlocks((prev) => [...prev, newBlock]);
    },
    [selectedFlat]
  );

  const handleMoveBlock = useCallback(
    (blockId: string, x: number, z: number) => {
      setPlacedBlocks((prev) =>
        prev.map((b) => (b.id === blockId ? { ...b, x, z } : b))
      );
    },
    []
  );

  const handleRemoveBlock = useCallback((blockId: string) => {
    setPlacedBlocks((prev) => prev.filter((b) => b.id !== blockId));
  }, []);

  const handleSelectFlat = useCallback((flat: FlatType) => {
    setSelectedFlat(flat);
    setPlacedBlocks([]);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-80 min-w-[320px] flex-col border-r border-slate-800 bg-slate-900">
        {/* Sidebar tabs */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setSidebarTab("menu")}
            className={`flex-1 py-3 text-sm font-medium transition ${
              sidebarTab === "menu"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🏠 Flat Types
          </button>
          <button
            onClick={() => setSidebarTab("blocks")}
            className={`flex-1 py-3 text-sm font-medium transition ${
              sidebarTab === "blocks"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📦 Blocks / Furniture
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto">
          {sidebarTab === "menu" ? (
            <div>
              <FlatMenu
                flats={FLAT_TYPES}
                selected={selectedFlat}
                onSelect={handleSelectFlat}
              />
              <FlatInfoPanel flat={selectedFlat} />
            </div>
          ) : (
            <BlockPalette
              onAdd={handleAddBlock}
              placedBlocks={placedBlocks}
              onRemove={handleRemoveBlock}
            />
          )}
        </div>
      </aside>

      {/* Main viewer */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">{selectedFlat.name}</h1>
            <p className="text-xs text-slate-400">
              Ka Wai Man Road Estate · HK Housing Authority Standard Design
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("2d")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                viewMode === "2d"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              2D Plan
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                viewMode === "3d"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              3D Model
            </button>
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1">
          {viewMode === "2d" ? (
            <FloorPlan2D flat={selectedFlat} placedBlocks={placedBlocks} />
          ) : (
            <Scene3D
              flat={selectedFlat}
              placedBlocks={placedBlocks}
              onMoveBlock={handleMoveBlock}
            />
          )}
        </div>
      </main>
    </div>
  );
}
