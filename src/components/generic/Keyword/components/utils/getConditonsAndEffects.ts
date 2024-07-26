import { COMBINED_EFFECT_MAP } from "@/resources";

export const getConditonsAndEffects = (useEffect: string[]) => {
  const addedConditions: string[] = [];
  const removedBaseConditions: string[] = [];
  const removedConditions: string[] = [];
  const healingEffects: { minHealing: number; maxHealing: number }[] = [];
  const attunementEffects: { minAttunement: number; maxAttunement: number }[] =
    [];
  const damageEffects: {
    minDamage: number;
    maxDamage: number;
    damageTypes: string[];
    isMagic: boolean;
  }[] = [];

  let removeAllMagicalConditions = false;

  useEffect.forEach((effectId) => {
    const effect = COMBINED_EFFECT_MAP.get(effectId);

    if (!effect) throw new Error(`Missing Effect for ID: ${effectId}`);

    const {
      isMagic,
      minHealing,
      maxHealing,
      minDamage,
      maxDamage,
      damageTypes,
      minAttunement,
      maxAttunement,
    } = effect;

    if (effect.removeAllMagicalConditions) removeAllMagicalConditions = true;

    addedConditions.push(...effect.addedConditions);
    removedBaseConditions.push(...effect.removedBaseConditions);
    removedConditions.push(...effect.removedConditions);

    if (maxHealing) healingEffects.push({ minHealing, maxHealing });
    if (maxAttunement) attunementEffects.push({ minAttunement, maxAttunement });
    if (maxDamage)
      damageEffects.push({ minDamage, maxDamage, damageTypes, isMagic });
  });

  return {
    attunementEffects,
    addedConditions,
    removeAllMagicalConditions,
    removedBaseConditions,
    removedConditions,
    damageEffects,
    healingEffects,
  };
};
