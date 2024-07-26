import { CLASS_LIST } from "@/resources";
import {
  GenericDialog,
  ListOptionItems,
  ListOptions,
} from "@/components/generic";
import { Selection } from "react-aria-components";
import { usePartyLoadout } from "@/stores";
import { useState } from "react";

const CLASS_SELECTION_LIST_ITEMS: ListOptionItems = CLASS_LIST.map(
  ({ id, title }) => ({
    id,
    title: title,
    textValue: title,
  }),
);

export const ClassList = () => {
  const {
    selectedPartyMember: { setClassId, getClass, feats },
  } = usePartyLoadout();
  const [confirmClassChange, setConfirmClassChange] = useState<string>("");

  const characterClass = getClass();

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      throw new Error(`Invalid Class Selection: ${selection}`);
    }

    const classId = selection.values().next().value;

    if (feats.getTotalAllocatedRanks() > 0) {
      setConfirmClassChange(classId);
      return;
    }

    setClassId(classId);
  };

  const handleConfirm = () => {
    feats.resetRanks();
    setClassId(confirmClassChange);
  };

  return (
    <>
      <GenericDialog
        aria-label={"Confirm character class change"}
        isOpen={!!confirmClassChange}
        onOpenChange={() => setConfirmClassChange("")}
        onConfirm={handleConfirm}
      >
        <p>Are you sure you want to change your character Class?</p>
        <p>All distributed feats will be removed.</p>
      </GenericDialog>
      <ListOptions
        className={`flex-1`}
        aria-label={"Character class selection list"}
        disallowEmptySelection
        selectionMode="single"
        shouldFocusWrap
        selectedKeys={[characterClass.id]}
        onSelectionChange={handleSelectionChange}
        items={CLASS_SELECTION_LIST_ITEMS}
      />
    </>
  );
};
