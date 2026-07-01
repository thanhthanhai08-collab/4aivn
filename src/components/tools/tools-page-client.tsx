"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import type { Tool } from "@/lib/types";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolFilters } from "@/components/tools/tool-filters";

type RankedTool = Tool & { rank: number };

interface ToolsPageClientProps {
  tools: Tool[];
  initialSearchTerm?: string;
  initialCategory?: string;
}

export function ToolsPageClient({
  tools,
  initialSearchTerm = "",
  initialCategory = "all",
}: ToolsPageClientProps) {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = useMemo(() => {
    const values = new Map<string, string>();
    tools.forEach((tool) => {
      if (tool.contextKey && !values.has(tool.contextKey)) {
        values.set(tool.contextKey, tool.context);
      }
    });
    return Array.from(values, ([key, label]) => ({ key, label })).sort((a, b) =>
      a.label.localeCompare(b.label, locale)
    );
  }, [locale, tools]);

  const filteredTools = useMemo<RankedTool[]>(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase(locale);
    return tools
      .map((tool, index) => ({ ...tool, rank: index + 1 }))
      .filter((tool) => {
        const matchesCategory = selectedCategory === "all" || tool.contextKey === selectedCategory;
        const matchesSearch =
          normalizedSearch === "" ||
          tool.name?.toLocaleLowerCase(locale).includes(normalizedSearch) ||
          tool.description?.toLocaleLowerCase(locale).includes(normalizedSearch);
        return matchesCategory && matchesSearch;
      });
  }, [locale, searchTerm, selectedCategory, tools]);

  return (
    <>
      <ToolFilters
        categories={categories}
        initialSearchTerm={initialSearchTerm}
        initialCategory={initialCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} rank={tool.rank} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center" role="status">
          <p className="text-xl text-muted-foreground">
            {locale === "en"
              ? "No tools found matching your criteria."
              : "Không tìm thấy công cụ nào phù hợp với tiêu chí của bạn."}
          </p>
        </div>
      )}
    </>
  );
}
