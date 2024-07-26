import { getConditonsAndEffects, Paragraph } from "@/components/generic";
import { COMBINED_CONDITION_MAP } from "@/resources";

type ConditionsDisplayProps = ReturnType<typeof getConditonsAndEffects> & {
  shouldOverride?: boolean;
};

export const ConditionsAndEffects = ({
  addedConditions,
  removedConditions,
  removedBaseConditions,
  removeAllMagicalConditions,
  attunementEffects,
  damageEffects,
  healingEffects,
  shouldOverride,
}: ConditionsDisplayProps) => {
  return (
    <>
      {addedConditions.length ? (
        <Paragraph shouldOverride={shouldOverride} className={`text-yellow`}>
          {`Adds Condition:
          ${addedConditions
            .map((conditionId) => {
              const condition = COMBINED_CONDITION_MAP.get(conditionId);

              if (!condition)
                throw new Error(`Missing Condition for ID: ${conditionId}`);

              return condition.title;
            })
            .join(", ")}`}
        </Paragraph>
      ) : null}
      {removedConditions.length ? (
        <Paragraph shouldOverride={shouldOverride} className={`text-yellow`}>
          {`Removes Conditions:
          ${removedConditions
            .map((conditionId) => {
              const condition = COMBINED_CONDITION_MAP.get(conditionId);

              if (!condition)
                throw new Error(`Missing Condition for ID: ${conditionId}`);

              return condition.title;
            })
            .join(", ")}`}
        </Paragraph>
      ) : null}
      {removedBaseConditions.length ? (
        <Paragraph shouldOverride={shouldOverride} className={`text-yellow`}>
          {`Removes Conditions with Tag:
          ${removedBaseConditions
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
      {removeAllMagicalConditions ? (
        <p className={`text-yellow`}>Removes all magical Conditions.</p>
      ) : null}
      {damageEffects.map(({ minDamage, maxDamage, damageTypes }, index) => (
        <Paragraph
          shouldOverride={shouldOverride}
          key={index}
          className={`text-yellow`}
        >
          {`Deals ${minDamage}-${maxDamage} ${damageTypes.includes("Magical") ? "(+Magical Aptitude)" : ""} Damage [${damageTypes.join(", ")}]`}
        </Paragraph>
      ))}
      {healingEffects.map(({ minHealing, maxHealing }, index) => (
        <Paragraph
          shouldOverride={shouldOverride}
          key={index}
          className={`text-yellow`}
        >
          {`Heals ${minHealing}-${maxHealing} (+Magical Aptitude) Vitality`}
        </Paragraph>
      ))}
      {attunementEffects.map(({ minAttunement, maxAttunement }, index) => (
        <Paragraph
          shouldOverride={shouldOverride}
          key={index}
          className={`text-yellow`}
        >
          {`Restores ${minAttunement}-${maxAttunement} (+Magical Aptitude) Attunement`}
        </Paragraph>
      ))}
    </>
  );
};
