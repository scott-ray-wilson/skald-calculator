import { Input, TextField } from "react-aria-components";
import { useItems } from "@/stores";
import { useDebouncedCallback } from "use-debounce";

export const ItemSearchBar = () => {
  const { itemFilter, setItemFilter } = useItems();

  const debounced = useDebouncedCallback((value: string) => {
    setItemFilter(value);
  }, 500);

  return (
    <TextField
      defaultValue={itemFilter}
      onChange={debounced}
      aria-label={"Search items"}
      className={`mb-4 ml-4 flex items-center text-light-gray focus-within:text-white lg:-mt-1.5 lg:mb-0 lg:ml-auto lg:mr-1.5`}
    >
      <svg
        className={"mr-2 mt-1 h-[1.4rem]"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
          fill="currentColor"
        />
      </svg>
      <Input
        className={`min-w-[5rem] border-b-2 border-light-gray bg-black text-white placeholder-light-gray focus:border-white focus:decoration-white focus:outline-none focus:ring-0`}
        placeholder={"Search Items..."}
      />
    </TextField>
  );
};
