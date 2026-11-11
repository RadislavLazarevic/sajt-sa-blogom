// Solid backgrounds with white text so badges stay readable over photos.
const PALETTE = [
  "bg-[#ff5a36]", // narandžasta
  "bg-[#2563eb]", // plava
  "bg-[#059669]", // zelena
  "bg-[#7c3aed]", // ljubičasta
  "bg-[#db2777]", // roze
  "bg-[#0891b2]", // tirkizna
  "bg-[#ca8a04]", // žuta
  "bg-[#dc2626]", // crvena
];

// Fixed colors for existing categories, so no two of them share a color.
// New categories get a color from their name automatically (add them here to pick one).
const CATEGORY_COLORS: Record<string, string> = {
  AI: PALETTE[0],
  Alati: PALETTE[1],
  Ekonomija: PALETTE[4],
  LLM: PALETTE[3],
  Uvod: PALETTE[2],
};

export function categoryColor(name: string): string {
  if (CATEGORY_COLORS[name]) return CATEGORY_COLORS[name];
  let hash = 0;
  for (const char of name.toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export default function CategoryBadge({ name }: { name: string }) {
  return (
    <span
      className={`${categoryColor(name)} rounded-md px-2 py-0.5 text-[13px] font-medium text-white`}
    >
      {name}
    </span>
  );
}
