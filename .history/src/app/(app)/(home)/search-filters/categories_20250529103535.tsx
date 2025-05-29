import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {
  const cotainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const veiwAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";

  useEffect(() => {}, []);
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown category={category} isActive={false} isNavigationHovered={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
