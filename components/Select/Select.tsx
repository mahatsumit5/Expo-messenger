import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setOrder } from "@/redux/reducers/querySlice";

export function SelectMenu() {
  const { order } = useAppSelector((store) => store.query);
  const dispatch = useAppDispatch();
  return (
    <Select
      defaultValue={{ label: order, value: order }}
      onValueChange={(option) => {
        if (option) dispatch(setOrder(option.value as "asc" | "desc"));
      }}
    >
      <SelectTrigger className="w-[120px] h-14">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder="Order"
        />
      </SelectTrigger>
      <SelectContent className="w-[250px]">
        <SelectGroup>
          <SelectLabel>Select order</SelectLabel>
          <SelectItem label="Ascending" value="asc">
            Ascending
          </SelectItem>
          <SelectItem label="Descending" value="desc">
            Banana
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
