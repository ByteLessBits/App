// All measurements in meters
export interface Room {
  id: string;
  name: string;
  x: number; // position from left
  y: number; // position from top (in 2D) / from front (in 3D)
  width: number;
  depth: number;
  color: string;
  label: string;
}

export interface FlatType {
  id: string;
  name: string;
  subtitle: string;
  occupancy: string;
  netAreaSqm: string;
  netAreaSqft: string;
  rooms: Room[];
  totalWidth: number;
  totalDepth: number;
  wallHeight: number;
  description: string;
  features: string[];
}

export const FLAT_TYPES: FlatType[] = [
  {
    id: "1-person",
    name: "1-Person Studio",
    subtitle: "The \"Mini\"",
    occupancy: "1 Person",
    netAreaSqm: "22–26",
    netAreaSqft: "240–280",
    totalWidth: 5.0,
    totalDepth: 5.0,
    wallHeight: 2.6,
    description:
      "A compact studio unit where the living room and bedroom share one space. Kitchen and bathroom are clustered near the entrance.",
    features: [
      "Combined living/bedroom",
      "Galley kitchenette",
      "Compact bathroom with shower",
      "Single window wall",
    ],
    rooms: [
      {
        id: "entrance",
        name: "Entrance",
        x: 0,
        y: 0,
        width: 1.2,
        depth: 1.5,
        color: "#94a3b8",
        label: "Entrance\n1.2×1.5m",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        x: 1.2,
        y: 0,
        width: 1.5,
        depth: 2.2,
        color: "#7dd3fc",
        label: "Bathroom\n1.5×2.2m",
      },
      {
        id: "kitchen",
        name: "Kitchen",
        x: 0,
        y: 1.5,
        width: 1.5,
        depth: 2.5,
        color: "#fcd34d",
        label: "Kitchen\n1.5×2.5m",
      },
      {
        id: "living-bed",
        name: "Living/Bedroom",
        x: 1.5,
        y: 2.2,
        width: 3.5,
        depth: 2.8,
        color: "#86efac",
        label: "Living/Bed\n3.5×2.8m",
      },
    ],
  },
  {
    id: "2-person",
    name: "2-Person Flat",
    subtitle: "The \"Compact\"",
    occupancy: "2 People",
    netAreaSqm: "30–35",
    netAreaSqft: "320–370",
    totalWidth: 6.5,
    totalDepth: 5.5,
    wallHeight: 2.6,
    description:
      "A small flat with a separate bedroom for privacy. Kitchen and bathroom form the wet zone near the entrance.",
    features: [
      "1 separate bedroom",
      "Small living/dining area",
      "Wet zone (kitchen + bath) clustered",
      "Window in bedroom and living room",
    ],
    rooms: [
      {
        id: "entrance",
        name: "Entrance",
        x: 0,
        y: 0,
        width: 1.5,
        depth: 1.5,
        color: "#94a3b8",
        label: "Entrance\n1.5×1.5m",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        x: 1.5,
        y: 0,
        width: 1.8,
        depth: 2.0,
        color: "#7dd3fc",
        label: "Bathroom\n1.8×2.0m",
      },
      {
        id: "kitchen",
        name: "Kitchen",
        x: 0,
        y: 1.5,
        width: 2.0,
        depth: 2.5,
        color: "#fcd34d",
        label: "Kitchen\n2.0×2.5m",
      },
      {
        id: "living",
        name: "Living/Dining",
        x: 2.0,
        y: 2.0,
        width: 3.0,
        depth: 3.5,
        color: "#86efac",
        label: "Living/Dining\n3.0×3.5m",
      },
      {
        id: "bedroom1",
        name: "Bedroom",
        x: 3.3,
        y: 0,
        width: 3.2,
        depth: 3.0,
        color: "#c4b5fd",
        label: "Bedroom\n3.2×3.0m",
      },
    ],
  },
  {
    id: "3-person",
    name: "3-Person Flat",
    subtitle: "The \"Standard\"",
    occupancy: "3 People",
    netAreaSqm: "40–45",
    netAreaSqft: "430–480",
    totalWidth: 7.5,
    totalDepth: 6.0,
    wallHeight: 2.6,
    description:
      "A hub-and-spoke layout with the living room as the central hub. Two bedrooms branch off from the living area.",
    features: [
      "2 bedrooms",
      "Central living/dining room",
      "Separate kitchen area",
      "Bathroom near entrance",
    ],
    rooms: [
      {
        id: "entrance",
        name: "Entrance",
        x: 0,
        y: 0,
        width: 1.5,
        depth: 1.5,
        color: "#94a3b8",
        label: "Entrance\n1.5×1.5m",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        x: 1.5,
        y: 0,
        width: 2.0,
        depth: 2.2,
        color: "#7dd3fc",
        label: "Bathroom\n2.0×2.2m",
      },
      {
        id: "kitchen",
        name: "Kitchen",
        x: 0,
        y: 1.5,
        width: 2.5,
        depth: 2.5,
        color: "#fcd34d",
        label: "Kitchen\n2.5×2.5m",
      },
      {
        id: "living",
        name: "Living/Dining",
        x: 2.5,
        y: 2.2,
        width: 3.0,
        depth: 3.8,
        color: "#86efac",
        label: "Living/Dining\n3.0×3.8m",
      },
      {
        id: "bedroom1",
        name: "Bedroom 1",
        x: 3.5,
        y: 0,
        width: 3.0,
        depth: 3.0,
        color: "#c4b5fd",
        label: "Bedroom 1\n3.0×3.0m",
      },
      {
        id: "bedroom2",
        name: "Bedroom 2",
        x: 5.5,
        y: 3.0,
        width: 2.0,
        depth: 3.0,
        color: "#f0abfc",
        label: "Bedroom 2\n2.0×3.0m",
      },
    ],
  },
  {
    id: "corner",
    name: "Corner Flat (4-5 Person)",
    subtitle: "The \"Premium\"",
    occupancy: "4–5 People",
    netAreaSqm: "50–65",
    netAreaSqft: "540–700",
    totalWidth: 9.0,
    totalDepth: 7.0,
    wallHeight: 2.6,
    description:
      "The largest unit type, located at the corner of the building. L-shaped layout with windows on two sides for maximum light and ventilation.",
    features: [
      "2-3 bedrooms",
      "Large living hall",
      "Separate enclosed kitchen",
      "Windows on two walls (corner unit)",
      "Most spacious layout",
    ],
    rooms: [
      {
        id: "entrance",
        name: "Entrance",
        x: 0,
        y: 0,
        width: 2.0,
        depth: 1.8,
        color: "#94a3b8",
        label: "Entrance\n2.0×1.8m",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        x: 2.0,
        y: 0,
        width: 2.0,
        depth: 2.5,
        color: "#7dd3fc",
        label: "Bathroom\n2.0×2.5m",
      },
      {
        id: "kitchen",
        name: "Kitchen",
        x: 0,
        y: 1.8,
        width: 2.0,
        depth: 3.0,
        color: "#fcd34d",
        label: "Kitchen\n2.0×3.0m",
      },
      {
        id: "living",
        name: "Living Hall",
        x: 2.0,
        y: 2.5,
        width: 4.0,
        depth: 4.5,
        color: "#86efac",
        label: "Living Hall\n4.0×4.5m",
      },
      {
        id: "bedroom1",
        name: "Master Bedroom",
        x: 4.0,
        y: 0,
        width: 3.5,
        depth: 3.5,
        color: "#c4b5fd",
        label: "Master Bed\n3.5×3.5m",
      },
      {
        id: "bedroom2",
        name: "Bedroom 2",
        x: 6.0,
        y: 3.5,
        width: 3.0,
        depth: 3.5,
        color: "#f0abfc",
        label: "Bedroom 2\n3.0×3.5m",
      },
      {
        id: "bedroom3",
        name: "Bedroom 3",
        x: 0,
        y: 4.8,
        width: 2.5,
        depth: 2.2,
        color: "#fda4af",
        label: "Bedroom 3\n2.5×2.2m",
      },
    ],
  },
];

// Preset furniture/block items
export interface BlockPreset {
  id: string;
  name: string;
  width: number;
  depth: number;
  height: number;
  color: string;
  category: string;
}

export const BLOCK_PRESETS: BlockPreset[] = [
  // Bedroom
  { id: "single-bed", name: "Single Bed", width: 0.9, depth: 1.9, height: 0.5, color: "#818cf8", category: "Bedroom" },
  { id: "double-bed", name: "Double Bed", width: 1.4, depth: 1.9, height: 0.5, color: "#6366f1", category: "Bedroom" },
  { id: "queen-bed", name: "Queen Bed", width: 1.5, depth: 2.0, height: 0.5, color: "#4f46e5", category: "Bedroom" },
  { id: "wardrobe", name: "Wardrobe", width: 1.2, depth: 0.6, height: 2.0, color: "#a78bfa", category: "Bedroom" },
  { id: "bedside-table", name: "Bedside Table", width: 0.45, depth: 0.45, height: 0.55, color: "#c4b5fd", category: "Bedroom" },
  // Living
  { id: "sofa-2seat", name: "2-Seat Sofa", width: 1.6, depth: 0.8, height: 0.8, color: "#f97316", category: "Living" },
  { id: "sofa-3seat", name: "3-Seat Sofa", width: 2.2, depth: 0.9, height: 0.8, color: "#ea580c", category: "Living" },
  { id: "coffee-table", name: "Coffee Table", width: 1.0, depth: 0.5, height: 0.45, color: "#fb923c", category: "Living" },
  { id: "tv-stand", name: "TV Stand", width: 1.5, depth: 0.4, height: 0.5, color: "#fdba74", category: "Living" },
  { id: "bookshelf", name: "Bookshelf", width: 0.8, depth: 0.3, height: 1.8, color: "#c2410c", category: "Living" },
  // Dining
  { id: "dining-table-4", name: "Dining Table (4p)", width: 1.2, depth: 0.8, height: 0.75, color: "#14b8a6", category: "Dining" },
  { id: "dining-table-6", name: "Dining Table (6p)", width: 1.6, depth: 0.9, height: 0.75, color: "#0d9488", category: "Dining" },
  { id: "chair", name: "Chair", width: 0.45, depth: 0.45, height: 0.9, color: "#2dd4bf", category: "Dining" },
  // Kitchen
  { id: "fridge", name: "Fridge", width: 0.6, depth: 0.6, height: 1.7, color: "#e2e8f0", category: "Kitchen" },
  { id: "washing-machine", name: "Washing Machine", width: 0.6, depth: 0.6, height: 0.85, color: "#cbd5e1", category: "Kitchen" },
  // Study
  { id: "desk", name: "Desk", width: 1.2, depth: 0.6, height: 0.75, color: "#facc15", category: "Study" },
  { id: "office-chair", name: "Office Chair", width: 0.5, depth: 0.5, height: 1.0, color: "#eab308", category: "Study" },
  // Custom placeholder
  { id: "custom-box", name: "Custom Block", width: 1.0, depth: 1.0, height: 1.0, color: "#ef4444", category: "Custom" },
];
