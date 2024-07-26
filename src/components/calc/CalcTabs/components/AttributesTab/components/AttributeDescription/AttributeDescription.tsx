import { useAttributesPanel } from "@/stores";
import { DescriptionContainer } from "@/components/generic";
import { ReactNode } from "react";
import {
  COMBAT_ATTRIBUTE_MAP,
  DEFENCE_ATTRIBUTE_MAP,
  MAGIC_ATTRIBUTE_MAP,
  PRIMARY_ATTRIBUTE_MAP,
  SECONDARY_ATTRIBUTE_MAP,
  SKILL_MAP,
} from "@/resources";
import {
  CombatAttributeDescription,
  DefenceAttributeDescription,
  PrimaryAttributeDescription,
  SecondaryAttributeDescription,
  SkillDescription,
} from "@/components/calc";

export const AttributeDescription = () => {
  const { selectedAttributeId } = useAttributesPanel();

  let Component: ReactNode;

  if (!selectedAttributeId) {
    Component = (
      <span className={`mt-4 text-yellow`}>Select an attribute or skill!</span>
    );
  } else if (PRIMARY_ATTRIBUTE_MAP.has(selectedAttributeId)) {
    Component = (
      <PrimaryAttributeDescription attributeId={selectedAttributeId} />
    );
  } else if (SKILL_MAP.has(selectedAttributeId)) {
    Component = <SkillDescription skillId={selectedAttributeId} />;
  } else if (
    SECONDARY_ATTRIBUTE_MAP.has(selectedAttributeId) ||
    MAGIC_ATTRIBUTE_MAP.has(selectedAttributeId)
  ) {
    Component = (
      <SecondaryAttributeDescription attributeId={selectedAttributeId} />
    );
  } else if (COMBAT_ATTRIBUTE_MAP.has(selectedAttributeId)) {
    Component = (
      <CombatAttributeDescription attributeId={selectedAttributeId} />
    );
  } else if (DEFENCE_ATTRIBUTE_MAP.has(selectedAttributeId)) {
    Component = (
      <DefenceAttributeDescription attributeId={selectedAttributeId} />
    );
  } else {
    throw Error(`Invalid Attribute Type: ${selectedAttributeId}`);
  }

  return (
    <DescriptionContainer
      prevTab={"background"}
      nextTab={"feats"}
      className={`flex-1`}
    >
      {Component}
    </DescriptionContainer>
  );
};
