import { FEAT_MAP, FeatType } from "@/resources";
import { usePartyLoadout } from "@/stores";
import { GenericDialog } from "@/components/generic";
import { useState } from "react";
import { getOutgoers, Node, useReactFlow } from "reactflow";

export const useModifyFeatRanks = (feat: FeatType) => {
  const { getNodes, getEdges } = useReactFlow();

  const {
    selectedPartyMember: {
      feats: {
        incrementRanks,
        getUnallocatedRanks,
        getAllocatedRanks,
        decrementRanks,
        areMinimumFeatRequirementsMet,
      },
      getLevel,
    },
  } = usePartyLoadout();

  const [showLockedDialog, setShowLockedDialog] = useState(false);
  const [showNoRanksRemaining, setShowNoRanksRemaining] = useState(false);

  const isUnderLeveled = getLevel() < feat.prereqLevel;
  const missingPrereqFeatRequirements =
    feat.prereqFeat && !areMinimumFeatRequirementsMet(feat.prereqFeat);

  const prereqFeat = FEAT_MAP.get(feat.prereqFeat);

  const isLocked = isUnderLeveled || missingPrereqFeatRequirements;

  const handleCloseDialog = () => {
    setShowLockedDialog(false);
    setShowNoRanksRemaining(false);
  };

  const decrementFeat = (bottomOut?: boolean) => {
    decrementRanks(feat.id, bottomOut);

    if (!areMinimumFeatRequirementsMet(feat.id)) {
      const clearDescendantNodePoints = (node: Node | { id: string }) => {
        // @ts-expect-error id is sufficient for "node"
        const descendantNodes = getOutgoers(node, getNodes(), getEdges());

        descendantNodes.forEach((node) => {
          const descendantRanks = getAllocatedRanks(node.id);

          if (descendantRanks > 0) {
            decrementRanks(node.id, true);
            clearDescendantNodePoints(node);
          }
        });
      };

      clearDescendantNodePoints({ id: feat.id });
    }
  };

  const incrementFeat = (topOut?: boolean) => {
    if (isLocked) {
      setShowLockedDialog(true);
      return;
    }

    if (getUnallocatedRanks() <= 0) {
      setShowNoRanksRemaining(true);
      return;
    }

    incrementRanks(feat.id, topOut);
  };

  return {
    isLocked,
    incrementFeat,
    decrementFeat,
    DialogComponent: (
      <GenericDialog
        aria-label={"Unable to purchase feat"}
        isOpen={showLockedDialog || showNoRanksRemaining}
        onOpenChange={handleCloseDialog}
      >
        {showLockedDialog ? (
          <>
            <p>This Feat cannot be bought yet:</p>
            {isUnderLeveled ? (
              <p>-Character must be at least level {feat.prereqLevel}</p>
            ) : null}
            {missingPrereqFeatRequirements ? (
              <p>
                -Character must be at least tier 1 in the feat{" "}
                <span className={`uppercase`}>
                  {prereqFeat?.title ?? "Invalid Prereq Feat"}
                </span>
              </p>
            ) : null}
          </>
        ) : (
          <p>{`You don't have any ranks to distribute. Level up to gain ranks!`}</p>
        )}
      </GenericDialog>
    ),
  };
};
