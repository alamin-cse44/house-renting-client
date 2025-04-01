import CategoryTable from "@/components/modules/admin/category/CategoryTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="flex justify-left mt-6">
        <Link href={"/admin/category/create-category"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" /> Create Category
          </Button>
        </Link>
      </div>
      <CategoryTable />
    </div>
  );
};

export default Categories;