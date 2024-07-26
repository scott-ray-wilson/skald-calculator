import { PanelContainer, TabButtons } from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import {
  AttributeDescription,
  CombatStatsList,
  DefenceStatsList,
  PrimaryAttributeList,
  SecondaryStatsList,
  SkillList,
} from "@/components/calc";

export const AttributesTab = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const isStoryCharacter = selectedPartyMember.isStoryCharacter();

  return (
    <PanelContainer
      id={"attributes"}
      actions={<TabButtons />}
      title={
        isStoryCharacter
          ? `${selectedPartyMember.getCharacter().title}: Attributes`
          : "Primary Attributes and Skills"
      }
    >
      <div className={`flex min-w-[15.3rem] flex-col gap-1`}>
        <PrimaryAttributeList />
        <SkillList />
      </div>
      <div className={`flex flex-col gap-1`}>
        <SecondaryStatsList />
        <CombatStatsList />
        <DefenceStatsList />
      </div>
      <AttributeDescription />
    </PanelContainer>
  );
};
