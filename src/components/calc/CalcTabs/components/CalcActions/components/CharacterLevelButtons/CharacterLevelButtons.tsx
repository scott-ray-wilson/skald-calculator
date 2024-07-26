import { GenericDialog, StatButton } from "@/components/generic";
import { PressEvent } from "react-aria-components";
import { useState } from "react";
import { DecrementLevelError } from "@/errors";
import { usePartyLoadout } from "@/stores";

export const CharacterLevelButtons = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const [showWarningDialog, setShowWarningDialog] = useState<
    "exceeded" | number | null
  >(null);

  const handleIncrement = (e: PressEvent) => {
    selectedPartyMember.incrementLevel(e.shiftKey || e.ctrlKey);
  };

  const handleDecrement = (e: PressEvent) => {
    try {
      selectedPartyMember.decrementLevel(e.shiftKey || e.ctrlKey);
    } catch (e: unknown) {
      if (e instanceof DecrementLevelError) {
        if (e.cause === "feat_ranks_exceed_level") {
          setShowWarningDialog("exceeded");
        } else {
          setShowWarningDialog(e.level);
        }
      }
    }
  };

  return (
    <>
      <GenericDialog
        aria-label={"Cannot decrease level"}
        isOpen={!!showWarningDialog}
        onOpenChange={() => setShowWarningDialog(null)}
      >
        {showWarningDialog === "exceeded" ? (
          <>
            <p>
              You have invested too many Feat Ranks to decrease your character
              level.
            </p>
          </>
        ) : (
          <>
            <p>
              You have one or more Feats requiring Level {showWarningDialog}.
            </p>
          </>
        )}
        <p> Remove surplus Feat Ranks or reset your Feats.</p>
      </GenericDialog>
      <div className={`gap-1.5 text-sm flex mr-auto items-center`}>
        <span className={`text-light-gray`}>Lvl:</span>
        <span className={`text-white w-5 mr-1`}>
          {selectedPartyMember.getLevel()}
        </span>
        <StatButton operator={"minus"} onPress={handleDecrement} />
        <StatButton operator={"plus"} onPress={handleIncrement} />
      </div>
    </>
  );
};
