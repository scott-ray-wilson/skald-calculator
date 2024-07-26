import {
  GridList,
  GridListItem,
  GridListProps,
  GridListItemProps,
} from "react-aria-components";
import { cn } from "@/components/utils";
import { StatButton } from "@/components/generic";

export type ListStatsItem = Omit<GridListItemProps, "children"> & {
  label: string;
  isPrimary?: boolean;
  allocatedPoints: number;
  calculatedPoints: number;
} & (
    | {
        onIncrement: () => void;
        onDecrement: () => void;
      }
    | {
        onIncrement?: undefined;
        onDecrement?: undefined;
      }
  );

export type ListStatsItems = ListStatsItem[];

type ListStatsProps = {
  maxValue?: number;
  title: string;
  unallocatedPoints?: number;
} & GridListProps<ListStatsItem>;

export const ListStats = ({
  className,
  maxValue,
  title,
  unallocatedPoints,
  ...props
}: ListStatsProps) => {
  return (
    <div className={cn(`flex flex-col`, className)}>
      <div
        className={`rounded-t-md gap-2 items-baseline flex pr-3 pl-2 justify-between bg-olive`}
      >
        <span className={`whitespace-nowrap text-blue`}>{title}</span>
        {unallocatedPoints !== undefined ? (
          <span
            className={`bg-red text-yellow px-4 rounded-full h-5 leading-[1.2]`}
          >
            {unallocatedPoints}
          </span>
        ) : null}
      </div>
      <GridList
        className={cn(
          `border-[3px] flex-1 rounded-b  px-2 pt-1 pb-10 border-olive flex flex-col`,
        )}
        {...props}
      >
        {({
          label,
          isPrimary = false,
          allocatedPoints,
          calculatedPoints,
          onIncrement,
          onDecrement,
          ...itemProps
        }) => (
          <GridListItem
            className={`cursor-pointer rounded-sm gap-3 flex items-center justify-between focus:outline-none focus:ring-0`}
            {...itemProps}
          >
            {({ isFocused, isHovered }) => (
              <>
                <div
                  className={`flex-1 flex justify-between gap-4 pr-2 hover:bg-red`}
                >
                  <span
                    className={cn(`capitalize text-light-gray select-none`, {
                      "text-green": isPrimary,
                      "text-blue": isFocused,
                      "text-white": isHovered,
                    })}
                  >
                    {label}
                  </span>
                  <div className={onIncrement ? "w-4" : `w-9`}>
                    <span className={`capitalize select-none text-white`}>
                      {calculatedPoints.toString()}
                    </span>
                    {maxValue && allocatedPoints > 1 ? (
                      <span className={"text-light-gray"}>
                        {allocatedPoints >= maxValue ? "x" : "+"}
                      </span>
                    ) : null}
                  </div>
                </div>
                {onIncrement ? (
                  <div className={`flex gap-1.5`}>
                    <StatButton onPress={onDecrement} operator={"minus"} />
                    <StatButton onPress={onIncrement} operator={"plus"} />
                  </div>
                ) : null}
              </>
            )}
          </GridListItem>
        )}
      </GridList>
    </div>
  );
};
