interface GoldRow {
  // Activity-based shape (used by the guide page summary)
  activity?: string;
  goldPerHour?: number | string;
  requirements?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  // Material-based shape (used inline in some MDX guides)
  material?: string;
  avgPrice?: string;
  unitsPerHour?: string;
}

interface GoldBreakdownTableProps {
  rows: GoldRow[];
}

function formatGold(value: number | string | undefined): string {
  if (value === undefined) return '—';
  if (typeof value === 'number') return `${value.toLocaleString()} g`;
  return value;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400';
    case 'Medium':
      return 'text-yellow-400';
    case 'Hard':
      return 'text-red-400';
    default:
      return 'text-foreground';
  }
}

export function GoldBreakdownTable({ rows = [] }: GoldBreakdownTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="text-2xl font-bold text-foreground mb-4">Gold Breakdown</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary border-b border-border">
            <th className="p-3 text-left font-semibold text-primary">
              {rows.some((r) => r.material) ? 'Material' : 'Activity'}
            </th>
            <th className="p-3 text-left font-semibold text-primary">Gold/Hour</th>
            <th className="p-3 text-left font-semibold text-primary">
              {rows.some((r) => r.avgPrice) ? 'Avg Price' : 'Requirements'}
            </th>
            <th className="p-3 text-left font-semibold text-primary">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-border ${
                idx % 2 === 0 ? 'bg-background' : 'bg-secondary'
              }`}
            >
              <td className="p-3 text-foreground">{row.material ?? row.activity}</td>
              <td className="p-3 text-foreground font-semibold">
                {formatGold(row.goldPerHour)}
              </td>
              <td className="p-3 text-foreground text-sm">
                {row.avgPrice ?? row.requirements ?? '—'}
              </td>
              <td className={`p-3 font-semibold ${getDifficultyColor(row.difficulty)}`}>
                {row.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
