import { PanelContainer, TabButtons } from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import { BackgroundDescription, BackgroundList } from "@/components/calc";

export const BackgroundTab = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const isStoryCharacter = selectedPartyMember.isStoryCharacter();

  return (
    <PanelContainer
      id={"background"}
      actions={<TabButtons />}
      title={
        isStoryCharacter
          ? `${selectedPartyMember.getCharacter().title}: Background`
          : "Select a Background"
      }
    >
      {isStoryCharacter ? null : <BackgroundList />}
      <BackgroundDescription />
    </PanelContainer>
  );
};
