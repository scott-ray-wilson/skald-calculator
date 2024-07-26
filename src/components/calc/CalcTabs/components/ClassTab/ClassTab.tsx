import { PanelContainer, TabButtons } from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import { ClassDescription, ClassList } from "@/components/calc";

export const ClassTab = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const isStoryCharacter = selectedPartyMember.isStoryCharacter();

  return (
    <PanelContainer
      id={"class"}
      actions={<TabButtons />}
      title={
        isStoryCharacter
          ? `${selectedPartyMember.getCharacter()!.title}: Class`
          : "Select a Class"
      }
    >
      {isStoryCharacter ? null : <ClassList />}
      <ClassDescription />
    </PanelContainer>
  );
};
