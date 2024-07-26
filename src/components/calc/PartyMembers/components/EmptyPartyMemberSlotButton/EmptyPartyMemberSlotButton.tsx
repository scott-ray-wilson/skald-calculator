import { usePartyLoadout } from "@/stores";
import { useBreakpoint } from "@/hooks";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Separator,
} from "react-aria-components";
import { CHARACTER_LIST, CLASS_MAP, PORTRAIT_MAP } from "@/resources";
import { cn } from "@/components/utils";
import { GenericTooltip } from "@/components/generic";
import { CharacterPortraitButton } from "@/components/calc";

type EmptyPartySlotButtonProps = { partyMemberIndex: number };
type AddPartyMemberType = "story" | "mercenary";

export const EmptyPartyMemberSlotButton = ({
  partyMemberIndex,
}: EmptyPartySlotButtonProps) => {
  const { addPartyMember, setSelectedPartyMemberIndex, getPartyMembers } =
    usePartyLoadout();

  const placementBottom = useBreakpoint("lg");

  const handleAddPartyMember =
    (
      params:
        | { category: "mercenary" }
        | { category: "story"; characterId: string },
    ) =>
    () => {
      addPartyMember(partyMemberIndex, params);
      setSelectedPartyMemberIndex(partyMemberIndex);
    };

  const items: {
    id: string;
    title: string;
    category: AddPartyMemberType;
    description: string;
    disabled: boolean;
  }[] = CHARACTER_LIST.map(({ id, title, classKit }) => ({
    id,
    title,
    category: "story" as AddPartyMemberType,
    description: CLASS_MAP.get(classKit)!.title,
    disabled: !!getPartyMembers().find((member) =>
      member?.category === "story" ? member.character.id === id : false,
    ),
  })).concat({
    id: "custom",
    title: "Mercenary",
    description: "Custom",
    category: "mercenary" as AddPartyMemberType,
    disabled: false,
  });

  return (
    <MenuTrigger>
      <GenericTooltip placement={"bottom"} content={"Add Party Member"}>
        <CharacterPortraitButton />
      </GenericTooltip>
      <Popover
        className={`rounded-sm crt border-2 shadow-[-2px_2px_0px_black] border-light-gray sh bg-dark-gray`}
        placement={placementBottom ? "bottom" : "left top"}
      >
        <Menu className={`border-2 border-black p-1`} items={items}>
          {({ title, id, category, description, disabled }) => (
            <>
              {id === "custom" ? (
                <Separator className={`bg-light-gray h-[2px] my-1`} />
              ) : null}
              <MenuItem
                isDisabled={disabled}
                id={id}
                className={({ isHovered, isDisabled }) =>
                  cn(
                    `flex gap-2  items-start rounded-sm p-1 pr-1.5 text-white cursor-pointer`,
                    {
                      "bg-red": isHovered,
                      "opacity-40 pointer-events-none": isDisabled,
                    },
                  )
                }
                onAction={handleAddPartyMember(
                  category === "story"
                    ? { category, characterId: id }
                    : { category },
                )}
              >
                <img
                  className={`contain-size`}
                  height={40}
                  width={40}
                  src={PORTRAIT_MAP.get(id)}
                />
                <div className={`flex -mt-0.5 flex-col`}>
                  {title}
                  <span className={`text-sm leading-3 text-yellow`}>
                    {description}
                  </span>
                </div>
              </MenuItem>
            </>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
