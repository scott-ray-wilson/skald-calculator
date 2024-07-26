import { COMBAT_MANEUVER_MAP } from "@/resources";
import { getCommonAbilityComponents, Paragraph } from "@/components/generic";

type AbilityDescriptionProps = {
  abilityId: string;
};

export const CombatManeuverDescription = ({
  abilityId,
}: AbilityDescriptionProps) => {
  const ability = COMBAT_MANEUVER_MAP.get(abilityId);

  if (!ability)
    throw new Error(`Missing Combat Maneuver Ability for ID: ${abilityId}`);

  const { TargetInfo, Conditions, TargetDescription } =
    getCommonAbilityComponents(ability);

  const {
    successEffect,
    timeCost,
    autoCrit,
    attackBased,
    coolDownCost,
    description,
    damageBonus,
    toHitBonus,
    armorPiercing,
    effectPattern,
  } = ability;

  let attackType = "";
  if (attackBased) {
    attackType += "Executes an Attack";

    if (autoCrit) {
      attackType += " that automatically scores a Critical Hit if successful.";
    } else if (damageBonus) {
      attackType += ` with +${damageBonus} bonus to Damage.`;
    } else if (toHitBonus) {
      attackType += ` with +${toHitBonus} Accuracy.`;
    } else if (successEffect.length) {
      if (effectPattern === "Melee") {
        attackType += `. If the Attack is successful the following effects target the opponent:`;
      } else {
        attackType += `. If the Attack is successful the following effects trigger and target all opponents in the target area.`;
      }
    } else if (armorPiercing) {
      attackType += ` that is Armor Piercing.`;
    } else {
      attackType += ".";
    }
  }

  return (
    <>
      <div className={"grid gap-x-4 grid-cols-7"}>
        <span className={`text-light-gray col-span-3`}>Cooldown</span>{" "}
        <span className={`text-white col-span-4`}>{coolDownCost} turns</span>
        <span className={`text-light-gray col-span-3`}>Time Use</span>{" "}
        <span className={`text-white col-span-4`}>
          {timeCost || "FullRound"}
        </span>
        {TargetInfo}
      </div>
      {description ? null : attackBased ? (
        <Paragraph shouldOverride className={`text-yellow`}>
          {attackType}
        </Paragraph>
      ) : (
        TargetDescription
      )}
      {description ? null : Conditions}
    </>
  );
};
