"use client";

import { useRef, useEffect, useCallback } from "react";
import type { FlatType } from "@/lib/flatTypes";
import type { PlacedBlock } from "./AppShell";

interface Props {
  flat: FlatType;
  placedBlocks: PlacedBlock[];
}

export default function FloorPlan2D({ flat, placedBlocks }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, cw, ch);

    // Scale to fit
    const padding = 80;
    const scaleX = (cw - padding * 2) / flat.totalWidth;
    const scaleY = (ch - padding * 2) / flat.totalDepth;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (cw - flat.totalWidth * scale) / 2;
    const offsetY = (ch - flat.totalDepth * scale) / 2;

    // Draw outer walls
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      offsetX,
      offsetY,
      flat.totalWidth * scale,
      flat.totalDepth * scale
    );

    // Draw rooms
    flat.rooms.forEach((room) => {
      const rx = offsetX + room.x * scale;
      const ry = offsetY + room.y * scale;
      const rw = room.width * scale;
      const rh = room.depth * scale;

      // Fill
      ctx.fillStyle = room.color + "30";
      ctx.fillRect(rx, ry, rw, rh);

      // Border
      ctx.strokeStyle = room.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, rw, rh);

      // Label
      ctx.fillStyle = "#f1f5f9";
      ctx.font = `${Math.max(10, Math.min(14, rw / 8))}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lines = room.label.split("\n");
      const lineHeight = Math.max(12, Math.min(16, rw / 7));
      const startY = ry + rh / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => {
        ctx.fillStyle = i === 0 ? "#f1f5f9" : "#94a3b8";
        ctx.font =
          i === 0
            ? `bold ${Math.max(10, Math.min(13, rw / 8))}px system-ui, sans-serif`
            : `${Math.max(9, Math.min(11, rw / 9))}px system-ui, sans-serif`;
        ctx.fillText(line, rx + rw / 2, startY + i * lineHeight);
      });
    });

    // Draw placed blocks (2D top-down)
    placedBlocks.forEach((block) => {
      const bx = offsetX + block.x * scale - (block.width * scale) / 2;
      const by = offsetY + block.z * scale - (block.depth * scale) / 2;
      const bw = block.width * scale;
      const bh = block.depth * scale;

      ctx.fillStyle = block.color + "80";
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = block.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, bw, bh);

      ctx.fillStyle = "#fff";
      ctx.font = `${Math.max(8, Math.min(11, bw / 5))}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(block.name, bx + bw / 2, by + bh / 2);
    });

    // Dimension labels along edges
    ctx.fillStyle = "#64748b";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(
      `${flat.totalWidth}m`,
      offsetX + (flat.totalWidth * scale) / 2,
      offsetY + flat.totalDepth * scale + 10
    );
    ctx.save();
    ctx.translate(offsetX - 14, offsetY + (flat.totalDepth * scale) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = "middle";
    ctx.fillText(`${flat.totalDepth}m`, 0, 0);
    ctx.restore();

    // Title
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`${flat.name} — 2D Floor Plan`, 16, 16);
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("All measurements in meters", 16, 34);
  }, [flat, placedBlocks]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
