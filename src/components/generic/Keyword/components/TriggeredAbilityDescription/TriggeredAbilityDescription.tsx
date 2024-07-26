import { TRIGGERED_ABILITY_MAP } from "@/resources";
import { getCommonAbilityComponents } from "@/components/generic";

type AbilityDescriptionProps = {
  abilityId: string;
};

export const TriggeredAbilityDescription = ({
  abilityId,
}: AbilityDescriptionProps) => {
  const ability = TRIGGERED_ABILITY_MAP.get(abilityId);

  if (!ability)
    throw new Error(`Missing Triggered Ability for ID: ${abilityId}`);

  const { TargetInfo } = getCommonAbilityComponents(ability);

  return (
    <>
      <div className={"grid grid-cols-7"}>{TargetInfo}</div>
    </>
  );
};
