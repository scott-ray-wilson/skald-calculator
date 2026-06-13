import {
  AmmoRequiringSource,
  DamagingStatsSource,
  EQUIPMENT_SLOT_IDS,
  MELEE_ATTACK_SKILL_ATTRIBUTE_ID,
  MELEE_DAMAGE_BONUS_ATTRIBUTE_ID,
  RANGED_ATTACK_SKILL_ATTRIBUTE_ID,
  SECONDARY_COMBAT_ATTRIBUTE_LIST,
  getUsableAmmo,
  getWeaponDamageAttributeIds,
  getWeaponHitAttributeIds,
  resolveDamagingStats,
} from "@/resources";
import { useEquipmentPanel, usePartyLoadout } from "@/stores";
import { useCombatAttributes, useDefenceAttributes } from "@/hooks";

const formatBonus = (value: number) => (value < 0 ? `${value}` : `+${value}`);

export const EquipmentSummary = () => {
  const { selectedPartyMember } = usePartyLoadout();
  const { wieldedSlotId } = useEquipmentPanel();
  const combatAttributes = useCombatAttributes();
  const defenceAttributes = useDefenceAttributes();

  const { equipment } = selectedPartyMember;

  const wieldedWeapon = equipment.getEquipped(wieldedSlotId);
  const isRanged = wieldedSlotId === "rangedWeapon" && wieldedWeapon !== null;
  const ammo =
    isRanged && wieldedWeapon
      ? getUsableAmmo(
          wieldedWeapon as AmmoRequiringSource,
          equipment.getEquipped("ammo"),
        )
      : null;

  const resolvedWeapon = wieldedWeapon
    ? resolveDamagingStats(wieldedWeapon as DamagingStatsSource)
    : null;
  const resolvedAmmo = ammo
    ? resolveDamagingStats(ammo as DamagingStatsSource)
    : null;

  // the hidden per-weapon attack attributes are zero-base with no root
  // ability, so these three sources are their entire value
  const sumAttackAttributeBonuses = (attributeIds: string[]) =>
    attributeIds.reduce(
      (total, attributeId) =>
        total +
        selectedPartyMember.getBackgroundBonus(attributeId) +
        selectedPartyMember.feats.getAttributeBonus(attributeId) +
        equipment.getAttributeBonus(attributeId),
      0,
    );

  // To Hit = full attack skill + weapon/ammo accuracy + type and weight hit
  // bonuses (Character.getAdjustedAttackSkill)
  const attackSkill =
    combatAttributes.get(
      isRanged
        ? RANGED_ATTACK_SKILL_ATTRIBUTE_ID
        : MELEE_ATTACK_SKILL_ATTRIBUTE_ID,
    )?.values.total ?? 0;

  const toHit =
    attackSkill +
    (resolvedWeapon?.hitBonus ?? 0) +
    (resolvedAmmo?.hitBonus ?? 0) +
    sumAttackAttributeBonuses(getWeaponHitAttributeIds(resolvedWeapon));

  // flat bonus added to both ends of the range; the STR-rooted Melee Dmg.
  // attribute never applies to ranged attacks
  // (Character.calculateWeaponAndUnarmedDamageBonus)
  const damageBonus =
    (isRanged
      ? 0
      : (combatAttributes.get(MELEE_DAMAGE_BONUS_ATTRIBUTE_ID)?.values.total ??
        0)) +
    sumAttackAttributeBonuses(
      getWeaponDamageAttributeIds(resolvedWeapon, isRanged),
    );

  // unarmed minimum is a fixed 1 (Character.calculateMinimalDamage)
  const minDamage = resolvedWeapon
    ? resolvedWeapon.minDamage + (resolvedAmmo?.minDamage ?? 0) + damageBonus
    : 1;
  const maxDamage =
    (resolvedWeapon?.maxDamage ?? 1) +
    (resolvedAmmo?.maxDamage ?? 0) +
    damageBonus;

  // combined soak = worn gear pieces + natural soak ("ATT_Soak", a secondary
  // combat attribute raised by feats/passives) — Character.getSoak
  const naturalSoak =
    (SECONDARY_COMBAT_ATTRIBUTE_LIST.find((a) => a.id === "ATT_Soak")
      ?.startingValue ?? 0) +
    selectedPartyMember.getBackgroundBonus("ATT_Soak") +
    selectedPartyMember.feats.getAttributeBonus("ATT_Soak") +
    equipment.getAttributeBonus("ATT_Soak");

  const soak = equipment.getSoakBreakdown().total + naturalSoak;
  const dodge = defenceAttributes.get("ATT_Dodge")?.values.total ?? 0;

  // the game's Encumb. line is the worn armor's encumbrance only, after the
  // weight-class mastery reduction (Character.getArmorEncumberance) — other
  // pieces encumber their skills but are not summed here
  const encumbrance = equipment.getEncumbranceValues().armor;

  const isShieldSuppressed =
    !!equipment.getEquipped("shield") &&
    equipment.isShieldSuppressed(wieldedSlotId);

  const hasIllegalWornItem = EQUIPMENT_SLOT_IDS.some(
    (slotId) => equipment.getWorn(slotId)?.legality.allowed === false,
  );

  const summary = [
    { label: "To Hit", value: formatBonus(toHit) },
    // unarmed shows its 1-to-max range like the game's sheet
    { label: "Damage", value: `${minDamage}-${maxDamage}` },
    { label: "Soak", value: `0-${soak}` },
    { label: "Dodge", value: formatBonus(dodge) },
    { label: "Encumb.", value: `${-encumbrance}` },
  ];

  // compact stat column shown inline with the worn slots, like the game's
  // Items Worn box
  return (
    <>
      <div className={`flex min-w-[8.5rem] flex-1 flex-col px-1`}>
        {summary.map(({ label, value }) => (
          <div
            key={label}
            className={`flex justify-between gap-2 leading-[19px]`}
          >
            <span className={`text-light-gray`}>{label}</span>
            <span className={`text-white`}>{value}</span>
          </div>
        ))}
      </div>
      {/* w-full wraps the notice onto its own row spanning the whole Items
          Worn box (the parent section is flex-wrap) */}
      {isShieldSuppressed ? (
        <p className={`w-full px-1 text-yellow text-xs`}>
          Shield inactive while wielding a two-handed weapon.
        </p>
      ) : null}
      {hasIllegalWornItem ? (
        <p className={`w-full px-1 text-yellow text-xs`}>
          Items on red tiles can't be equipped by this Class and grant no
          bonuses.
        </p>
      ) : null}
    </>
  );
};
