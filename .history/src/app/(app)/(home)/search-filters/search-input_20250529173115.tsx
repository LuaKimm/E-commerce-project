import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";

interface Props {
  disabled?: boolean;
  data: CustomCategory[];
}

export const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar data={data} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search products" disabled={disabled} />
      </div>
    </div>
  );
};
