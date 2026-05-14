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

interface SupplierFiltersProps {
  search: string;
  category: string;
  categories: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function SupplierFilters({
  search,
  category,
  categories,
  sortBy,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
  onClearFilters,
  hasActiveFilters,
}: SupplierFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          placeholder="Search by name, email, contact..."
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
        <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-[140px] bg-transparent border-emerald-500/20 text-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="category">Category</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[100px] bg-transparent border-emerald-500/20 text-white">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-emerald-500/20 text-white">
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectContent>
      </Select>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="border-red-500/20 text-red-300 bg-red-500/5 hover:bg-red-500/10 px-3 py-2 rounded-md text-sm flex items-center gap-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
