import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { Footer } from "./footer";
import { Suspense } from "react";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </HydrationBoundary>
      </nav>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
