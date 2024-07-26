import { COMBINED_ATTRIBUTE_MAP, COMBINED_CONDITION_MAP } from "@/resources";
import { Keyword, Paragraph } from "@/components/generic";

type AbilityDescriptionProps = {
  conditionId: string;
};

export const ConditionDescription = ({
  conditionId,
}: AbilityDescriptionProps) => {
  const condition = COMBINED_CONDITION_MAP.get(conditionId);

  if (!condition) throw new Error(`Missing Condition for ID: ${conditionId}`);

  const {
    saveAttribute,
    saveDifficulty,
    isAdvantage,
    baseConditionsCaused,
    primaryAffectedAttributes,
    primaryMagnitude,
    secondaryAffectedAttributes,
    secondaryMagnitude,
    magicClears,
    singleTurnEndOfTurn,
    restClears,
    autoClearAtEndOfCombat,
    chanceToSaveEachTurn,
  } = condition;

  let duration: string | null;

  if (singleTurnEndOfTurn) {
    duration = "Lasts until end of turn.";
  } else if (autoClearAtEndOfCombat && isAdvantage) {
    duration = "Lasts until end of combat.";
  } else if (chanceToSaveEachTurn) {
    const savingAttribute = COMBINED_ATTRIBUTE_MAP.get(saveAttribute);
    duration = `Roll a successful ${savingAttribute!.title} Saving Throw vs DC ${saveDifficulty} at end of each turn to remove.`;
  } else if (restClears) {
    duration = `Lasts until next rest.`;
  } else {
    duration = null;
  }

  return (
    <>
      {baseConditionsCaused.length ? (
        <Paragraph shouldOverride className={`text-yellow`}>
          {`Adds Status Tag:
          ${baseConditionsCaused
            .flatMap((conditionId) => {
              const condition = COMBINED_CONDITION_MAP.get(conditionId);

              if (!condition) return [`#${conditionId}`];

              return condition.baseConditionsCaused.map(
                (baseCondition) => `#${baseCondition}`,
              );
            })
            .join(", ")}`}
        </Paragraph>
      ) : null}
      {primaryAffectedAttributes.map((attributeId) => {
        const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

        if (!attribute)
          throw new Error(`Missing Attribute for ID: ${attributeId}`);

        return (
          <div key={attributeId}>
            <span className={`text-yellow`}>
              {primaryMagnitude >= 0 ? "+" : ""}
              {primaryMagnitude}
              {attribute.suffixCharacter}
            </span>{" "}
            <Keyword shouldOverride>{attribute.title}</Keyword>
          </div>
        );
      })}
      {secondaryAffectedAttributes.map((attributeId) => {
        const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

        if (!attribute)
          throw new Error(`Missing Attribute for ID: ${attributeId}`);

        return (
          <div key={attributeId}>
            <span className={`text-yellow`}>
              {secondaryMagnitude >= 0 ? "+" : ""}
              {secondaryMagnitude}
              {attribute.suffixCharacter}
            </span>{" "}
            <Keyword shouldOverride>{attribute.title}</Keyword>
          </div>
        );
      })}
      {duration ? (
        <Paragraph shouldOverride className={`text-yellow`}>
          {duration}
        </Paragraph>
      ) : null}
      {magicClears ? (
        <p className={`text-yellow`}>Can be removed by magic.</p>
      ) : null}
      {/*<div className={"grid gap-x-4 grid-cols-7"}>*/}
      {/*  <span className={`text-light-gray col-span-3`}>Cooldown</span>{" "}*/}
      {/*  <span className={`text-white col-span-4`}>{coolDownCost} turns</span>*/}
      {/*  <span className={`text-light-gray col-span-3`}>Time Use</span>{" "}*/}
      {/*  <span className={`text-white col-span-4`}>*/}
      {/*    {timeCost || "FullRound"}*/}
      {/*  </span>*/}
      {/*  {TargetInfo}*/}
      {/*</div>*/}
      {/*{description ? null : attackBased ? (*/}
      {/*  <p className={`text-yellow`}>*/}
      {/*    Executes an Attack*/}
      {/*    {autoCrit*/}
      {/*      ? " that automatically scores a Critical Hit if successful"*/}
      {/*      : damageBonus*/}
      {/*        ? ` with +${damageBonus} bonus to Damage`*/}
      {/*        : toHitBonus*/}
      {/*          ? ` with +${toHitBonus} Accuracy`*/}
      {/*          : ""}*/}
      {/*    .*/}
      {/*  </p>*/}
      {/*) : (*/}
      {/*  TargetDescription*/}
      {/*)}*/}
      {/*{Conditions}*/}
    </>
  );
};
