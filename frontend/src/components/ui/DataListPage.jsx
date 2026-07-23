import { motion } from "framer-motion";
import { Search, Filter, Download } from "lucide-react";
import { Card, Badge } from "./Primitives";
import Button from "./Button";
import { useState, useMemo } from "react";

/**
 * Generic, reusable list page: search + filterable table.
 * columns: [{ key, label, render?(row) }]
 * data: array of row objects (each needs a unique `id`)
 */
export default function DataListPage({
  title,
  subtitle,
  columns,
  data,
  searchKeys = [],
  actions,
  emptyMessage = "Nothing here yet.",
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q)));
  }, [query, data, searchKeys]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
        </div>
        {actions}
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-ink-100 p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm focus:border-clinical-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-clinical-100"
            />
          </div>
          <Button variant="secondary" size="sm" icon={Filter}>
            Filter
          </Button>
          <Button variant="secondary" size="sm" icon={Download}>
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                {columns.map((col) => (
                  <th key={col.key} className="whitespace-nowrap px-4 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3.5 text-ink-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="py-12 text-center text-sm text-ink-400">{emptyMessage}</p>}
        </div>
      </Card>
    </div>
  );
}

export { Badge };
