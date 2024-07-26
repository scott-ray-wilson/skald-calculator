import { SPELL_MAP } from "@/resources";
import { getCommonAbilityComponents, Keyword } from "@/components/generic";

type AbilityDescriptionProps = {
  abilityId: string;
};

// TODO: guessing based off values? Can't locate in game files
const BASE_DC_MOD_MAP = new Map<number, number>([
  [1, 12],
  [2, 14],
  [3, 16],
  [4, 18],
]);

export const SpellDescription = ({ abilityId }: AbilityDescriptionProps) => {
  const ability = SPELL_MAP.get(abilityId);

  if (!ability) throw new Error(`Missing Spell for ID: ${abilityId}`);

  const { cascadeDCMod, useCost, tier } = ability;

  const { TargetInfo, Conditions, CreaturesSummoned, TargetDescription } =
    getCommonAbilityComponents(ability);

  return (
    <>
      <div className={"grid grid-cols-7 gap-x-4"}>
        {useCost ? (
          <>
            <span className={`col-span-3 text-light-gray`}>Cost</span>{" "}
            <span className={`col-span-4 text-white`}>
              {useCost} <span className={`text-yellow`}>Att.</span>
            </span>
          </>
        ) : null}
        <Keyword shouldOverride className={`col-span-3`}>
          Cascade
        </Keyword>{" "}
        <span className={`col-span-4 text-white`}>
          {(BASE_DC_MOD_MAP.get(tier) ?? NaN) + cascadeDCMod}
        </span>
        {TargetInfo}
      </div>
      {TargetDescription}
      {CreaturesSummoned}
      {Conditions}
    </>
  );
};
