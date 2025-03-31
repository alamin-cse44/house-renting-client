import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RentingTableFiltersProps {
  setStatus: (value: string) => void;
}

const RentingTableFilters: React.FC<RentingTableFiltersProps> = ({ setStatus }) => {
  return (
    <div className="flex gap-2 w-[200px]">
      <Select onValueChange={(value) => setStatus(value === "all" ? "" : value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Renting Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value="all">
            All
          </SelectItem>
          <SelectItem className="cursor-pointer" value="pending">
            Pending
          </SelectItem>
          <SelectItem className="cursor-pointer" value="approved">
            Approved
          </SelectItem>
          <SelectItem className="cursor-pointer" value="rejected">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RentingTableFilters;
