import {
  CombatManeuverType,
  COMBINED_EFFECT_MAP,
  MONSTER_MAP,
  SpellType,
  TriggeredAbilityType,
} from "@/resources";
import { getConditonsAndEffects, Paragraph } from "@/components/generic";
import { ConditionsAndEffects } from "@/components/generic";

export const getCommonAbilityComponents = (
  ability: SpellType | CombatManeuverType | TriggeredAbilityType,
) => {
  const {
    successEffect,
    targetEnemies,
    effectPattern,
    targetAllies,
    useEffect,
    creatureSummoned,
  } = ability;

  let target: string | null = null;
  let areaOfEffect: string | null = null;

  if (effectPattern === "Self") {
    target = effectPattern;
  } else if (targetEnemies || targetAllies) {
    target =
      targetEnemies && targetAllies
        ? "Anyone"
        : targetEnemies
          ? "Enemies"
          : "Allies";
    areaOfEffect = effectPattern;
  } else {
    areaOfEffect = effectPattern;
  }

  let targetDescription: string | null = null;
  const targetSingular =
    targetEnemies && targetAllies
      ? "opponent or ally"
      : targetEnemies
        ? "opponent"
        : targetAllies
          ? "ally"
          : "tile";

  const targetsPlural =
    targetEnemies && targetAllies
      ? "opponents and allies"
      : targetEnemies
        ? "opponents"
        : targetAllies
          ? "allies"
          : "tiles";

  switch (effectPattern) {
    case "Touch":
    case "Melee":
      targetDescription = `Targets any ${targetSingular} adjacent to the caster.`;
      break;
    case "All":
      targetDescription = `Targets all opponents and allies on the battlefield.`;
      break;
    case "AllEnemies":
      targetDescription = `Targets all opponents on the battlefield.`;
      break;
    case "AllAllies":
      targetDescription = `Targets all allies on the battlefield.`;
      break;
    case "Self":
      targetDescription = !targetEnemies
        ? "Targets the character themself."
        : null;
      break;
    case "Point":
      targetDescription = `Targets any ${targetSingular} anywhere on the battlefield.`;
      break;
    case "Line":
      targetDescription = `Targets all ${targetsPlural} in the Line target area.`;
      break;
    case "Sphere":
      targetDescription = `Targets all ${targetsPlural} in the Sphere target area.`;
      break;
    case "Cone":
      targetDescription = `Targets all ${targetsPlural} in the Cone target area.`;
      break;
    case "Aura":
      targetDescription = `Targets all ${targetsPlural} in the Aura target area.`;
      break;
  }

  const TargetInfo = (
    <>
      {target ? (
        <>
          <span className={`col-span-3 text-light-gray`}>Targets</span>{" "}
          <span className={`col-span-4 text-white`}>{target}</span>
        </>
      ) : null}
      {areaOfEffect ? (
        <>
          <span className={`col-span-3 text-light-gray`}>AoE.</span>{" "}
          <span className={`col-span-4 text-white`}>{areaOfEffect}</span>
        </>
      ) : null}
    </>
  );

  const TargetDescription = targetDescription ? (
    <p className={`text-yellow`}>{targetDescription}</p>
  ) : null;

  const addedConditions: string[] = successEffect.flatMap((effectId) => {
    const effect = COMBINED_EFFECT_MAP.get(effectId);

    if (!effect) throw new Error(`Missing Effect ID: ${effectId}`);

    return effect.addedConditions;
  });

  const { addedConditions: addConditions, ...rest } =
    getConditonsAndEffects(useEffect);

  addedConditions.push(...addConditions);

  const Conditions = (
    <ConditionsAndEffects
      {...rest}
      shouldOverride
      addedConditions={addedConditions}
    />
  );

  const CreaturesSummoned = creatureSummoned.length ? (
    <Paragraph shouldOverride className={`text-yellow`}>
      {`Summons one of the following creatures in each target area tile:
          ${creatureSummoned
            .map((creatureId) => {
              const creature = MONSTER_MAP.get(creatureId);

              if (!creature)
                throw new Error(`Missing Creature for ID: ${creatureId}`);

              return `${creature.title}`;
            })
            .join(", ")}`}
    </Paragraph>
  ) : null;

  return { TargetInfo, TargetDescription, Conditions, CreaturesSummoned };
};
