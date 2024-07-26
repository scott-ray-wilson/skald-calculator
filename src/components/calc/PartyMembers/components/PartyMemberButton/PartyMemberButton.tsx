import { PartyMemberState, usePartyLoadout } from "@/stores";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";

import { cn } from "@/components/utils";
import { GenericTooltip } from "@/components/generic";
import { useBreakpoint } from "@/hooks";
import { PLAYER_PORTRAIT_LIST } from "@/resources";
import { CharacterPortraitButton } from "@/components/calc";

type PartyMemberButtonProps = {
  partyMember: PartyMemberState;
  partyMemberIndex: number;
};

export const PartyMemberButton = ({
  partyMember,
  partyMemberIndex,
}: PartyMemberButtonProps) => {
  const {
    selectedPartyMemberIndex,
    setSelectedPartyMemberIndex,
    removePartyMember,
    setPartyMemberPortrait,
  } = usePartyLoadout();

  const placementBottom = useBreakpoint("lg");

  const isSelected = partyMemberIndex === selectedPartyMemberIndex;

  const handleSelect = () => {
    setSelectedPartyMemberIndex(partyMemberIndex);
  };

  const handleRemove = () => {
    if (partyMemberIndex === 0)
      throw new Error("Cannot Remove Main Character!");

    removePartyMember(partyMemberIndex);
  };

  const handleChangePortrait = (portrait: string) => {
    setPartyMemberPortrait(partyMemberIndex, portrait);
  };

  let tooltipContent: string;
  let portrait: string;

  if (partyMember.category === "story") {
    tooltipContent = partyMember.character.title;
    portrait = partyMember.character.id;
  } else {
    tooltipContent =
      partyMember.category === "main" ? "Main Character" : "Mercenary";
    portrait = partyMember.portrait;
  }

  const Component = (
    <GenericTooltip placement={"bottom"} content={tooltipContent}>
      <CharacterPortraitButton
        onPress={handleSelect}
        isSelected={isSelected}
        portrait={portrait}
      />
    </GenericTooltip>
  );

  if (!isSelected) return Component;

  return (
    <DialogTrigger>
      {Component}
      <Popover
        className={`rounded-sm crt max-h-[80vh] flex flex-col  border-2 shadow-[-2px_2px_0px_black] border-light-gray sh bg-dark-gray`}
        placement={placementBottom ? "bottom" : "left top"}
      >
        <Dialog
          className={`border-2 w-fit flex overflow-hidden flex-col border-black p-1`}
        >
          {({ close }) => (
            <>
              {partyMember.category !== "story" ? (
                <>
                  <div
                    className={`grid gap-1 overflow-y-auto scrollbar w-fit grid-cols-3`}
                  >
                    {PLAYER_PORTRAIT_LIST.map(({ id }) => (
                      <CharacterPortraitButton
                        key={id}
                        onPress={() => {
                          handleChangePortrait(id);
                          close();
                        }}
                        isSelected={partyMember.portrait === id}
                        size={"lg"}
                        portrait={id}
                      ></CharacterPortraitButton>
                    ))}
                  </div>
                  {partyMemberIndex !== 0 ? (
                    <div
                      role={"separator"}
                      className={`bg-light-gray min-h-[2px] !h-[2px] my-1`}
                    />
                  ) : null}
                </>
              ) : null}
              {partyMemberIndex > 0 ? (
                <>
                  <Button
                    onPress={() => {
                      handleRemove();
                      close();
                    }}
                    className={({ isHovered, isDisabled }) =>
                      cn(
                        `flex gap-2 w-full items-start rounded-sm p-1 pr-1.5 text-white cursor-pointer`,
                        {
                          "bg-red": isHovered,
                          "opacity-40 pointer-events-none": isDisabled,
                        },
                      )
                    }
                    // onPress={handleAddPartyMember(id)}
                  >
                    Remove from Party
                  </Button>
                </>
              ) : null}
            </>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
