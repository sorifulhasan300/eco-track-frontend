"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-transparent border-emerald-500/20 text-white placeholder:text-slate-500"
        />
      </div>
      <Select
        value={category || "all"}
        onValueChange={(val) => onCategoryChange(val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-[180px] bg-transparent border-emerald-500/20 text-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-emerald-500/20 text-white cursor-pointer">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
