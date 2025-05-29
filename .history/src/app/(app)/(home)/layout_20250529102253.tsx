import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1, //Populate subcategories, subcategories. [0] will be a type of "Category"
    where: {
      parent: {
        exists: false,
      },
    },
  });
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of 'depth:1' we are confident "doc" will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));
  console.log(formattedData, data);

  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
        <SearchFilters data={formattedData} />
      </nav>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
