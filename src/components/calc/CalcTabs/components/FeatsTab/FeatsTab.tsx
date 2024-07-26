import { PanelContainer, TabButtons } from "@/components/generic";
import { ReactFlowProvider } from "reactflow";
import { usePartyLoadout } from "@/stores";
import { FeatDescription, FeatTree } from "@/components/calc";

export const FeatsTab = () => {
  const { selectedPartyMember } = usePartyLoadout();

  return (
    <PanelContainer
      id={"feats"}
      actions={<TabButtons />}
      title={`${selectedPartyMember.isStoryCharacter() ? `${selectedPartyMember.getCharacter().title}: ` : ""} ${selectedPartyMember.getClass().title} Feats`}
    >
      <ReactFlowProvider>
        <FeatTree />
        <FeatDescription />
      </ReactFlowProvider>
    </PanelContainer>
  );
};
