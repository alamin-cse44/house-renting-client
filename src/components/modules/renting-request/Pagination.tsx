import { Button } from "@/components/ui/button";

const Pagination = ({ pageIndex, setPageIndex, pageSize, setPageSize, totalRecords }) => (
  <div className="flex justify-between items-center mt-4">
    <div>
      <select className="border p-1" onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        {[2, 10, 20, 50].map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
    <div>
      <Button disabled={pageIndex === 0} onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}>Prev</Button>
      <span className="mx-4">Page {pageIndex + 1} of {Math.ceil(totalRecords / pageSize)}</span>
      <Button disabled={(pageIndex + 1) * pageSize >= totalRecords} onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
    </div>
  </div>
);

export default Pagination;
