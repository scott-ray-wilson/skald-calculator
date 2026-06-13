// Encumbrance is data-driven: each attribute declares which equipment slots
// penalize it (count*Encumberance flags on the attribute extracts) — armor
// hits Dodge/Athletics/Stealth, helmets Awareness, gloves Thievery, footwear
// Stealth, and the outfit's reactionBonus feeds Diplomacy
// (countOutfitReaction).
export type EncumbranceFlagFields = {
  countArmorEncumberance: boolean;
  countHelmetEncumberance: boolean;
  countGloveEncumberance: boolean;
  countShoeEncumberance: boolean;
  countOutfitReaction: boolean;
};

export type EquippedEncumbranceValues = {
  armor: number;
  helmet: number;
  gloves: number;
  shoes: number;
  outfitReaction: number;
};

// worn-armor encumbrance after the matching ATT_ArmEnc<Weight> mastery value,
// floored at 0 (Character.getArmorEncumberance); other slots get no mastery
// reduction
export const getEffectiveArmorEncumbrance = (
  resolvedEncumbrance: number,
  armorMasteryValue: number,
) => Math.max(0, resolvedEncumbrance - armorMasteryValue);

export const getEncumbranceAttributeModifier = (
  attribute: EncumbranceFlagFields,
  values: EquippedEncumbranceValues,
) =>
  (attribute.countArmorEncumberance ? -values.armor : 0) +
  (attribute.countHelmetEncumberance ? -values.helmet : 0) +
  (attribute.countGloveEncumberance ? -values.gloves : 0) +
  (attribute.countShoeEncumberance ? -values.shoes : 0) +
  (attribute.countOutfitReaction ? values.outfitReaction : 0);
