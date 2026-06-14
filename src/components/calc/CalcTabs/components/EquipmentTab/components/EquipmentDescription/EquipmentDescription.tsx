import { Fragment } from "react";
import {
  CopyTextButton,
  DescriptionContainer,
  Keyword,
  PanelButton,
  Paragraph,
} from "@/components/generic";
import {
  COMBINED_ATTRIBUTE_MAP,
  COMBINED_ENCHANTMENT_MAP,
  DamagingStatsSource,
  EQUIPMENT_SLOT_LABELS,
  EQUIPPABLE_ITEM_MAP,
  EquipmentSlotId,
  StatComparison,
  WearableStatsSource,
  compareStat,
  getClassPermissions,
  getConferredAuxiliaryComponents,
  getConferredPassiveAbilities,
  resolveDamagingStats,
  resolveItemValue,
  resolveItemWeight,
  resolveWearableStats,
} from "@/resources";
import { getSlotLegality } from "@/stores/utils";
import { useEquipmentPanel, usePartyLoadout } from "@/stores";

const getAttributeTitle = (attributeId: string) =>
  COMBINED_ATTRIBUTE_MAP.get(attributeId)?.title ??
  attributeId.replace("ATT_", "");

const WEAPON_SLOTS: EquipmentSlotId[] = ["meleeWeapon", "rangedWeapon", "ammo"];

// value coloring for the "Vs worn item" comparison, mirroring the game's
// light-green / light-red / white comparative stat tags
const COMPARISON_COLOR: Record<StatComparison, string> = {
  better: "text-lime",
  worse: "text-light-red",
  equal: "text-white",
};

export const EquipmentDescription = () => {
  const { selectedSlotId, pickerItemId } = useEquipmentPanel();
  const { selectedPartyMember } = usePartyLoadout();

  const wornItem = selectedPartyMember.equipment.getWorn(selectedSlotId);

  const shownItemId = pickerItemId ?? wornItem?.item.id ?? null;

  return (
    <DescriptionContainer
      // with item details shown, their mt-auto id/equip block claims the free
      // space so the nav must not double it; in the empty state the nav's own
      // mt-auto pushes Continue/Back to the bottom
      buttonContainerClassName={shownItemId ? `mt-0` : undefined}
      prevTab={"attributes"}
      nextTab={"feats"}
    >
      {shownItemId ? (
        <EquipmentItemDetails itemId={shownItemId} slotId={selectedSlotId} />
      ) : (
        <>
          <Paragraph className={`text-yellow`}>
            Select an item slot, then click an item below to equip it. Items
            your class cannot equip are indicated by a red tile.
          </Paragraph>
        </>
      )}
    </DescriptionContainer>
  );
};

type EquipmentItemDetailsProps = {
  itemId: string;
  slotId: EquipmentSlotId;
};

const EquipmentItemDetails = ({
  itemId,
  slotId,
}: EquipmentItemDetailsProps) => {
  const { selectedPartyMember } = usePartyLoadout();

  const entry = EQUIPPABLE_ITEM_MAP.get(itemId);

  if (!entry) throw new Error(`Missing Equippable Item for ID: ${itemId}`);

  const { item } = entry;

  const { equipment } = selectedPartyMember;

  // worn comparison (not active) so an illegal item still offers Unequip
  const isEquipped = equipment.getWorn(slotId)?.item.id === itemId;

  const legality = getSlotLegality(
    getClassPermissions(
      selectedPartyMember.getClass(),
      selectedPartyMember.getArchetypeClass(),
    ),
    slotId,
    item,
  );

  const isWeapon = WEAPON_SLOTS.includes(slotId);

  // the item this one would replace in the slot — null when the slot is empty
  // or the shown item is already worn, so an item never compares against itself
  // (the game nulls its compare target for the equipped item)
  const comparisonItem = isEquipped
    ? null
    : (equipment.getWorn(slotId)?.item ?? null);

  // stats and formatting mirror the item database description components; a
  // comparison is attached for the combat stats the game shows "Vs" the worn item
  const statRows: {
    label: string;
    value: string;
    isKeyword?: boolean;
    comparison?: { value: string; status: StatComparison };
  }[] = [];
  let subTitle: string[] = [EQUIPMENT_SLOT_LABELS[slotId]];

  if (isWeapon) {
    const resolved = resolveDamagingStats(item as DamagingStatsSource);
    const compared = comparisonItem
      ? resolveDamagingStats(comparisonItem as DamagingStatsSource)
      : null;

    const isAmmo = slotId === "ammo";

    const formatHit = (hitBonus: number) =>
      `${hitBonus < 0 ? "" : "+"}${hitBonus}`;
    const formatDamage = (minDamage: number, maxDamage: number) =>
      `${isAmmo ? "+" : ""}${
        minDamage === maxDamage ? maxDamage : `${minDamage}-${maxDamage}`
      }`;
    const formatCrit = (crit: number) =>
      `x${crit === 0 ? crit : crit.toFixed(1)}`;
    // weapons compare on average damage, ammo on max damage
    // (ItemWeapon/ItemAmmo.printComparativeStats)
    const damageMetric = (minDamage: number, maxDamage: number) =>
      isAmmo ? maxDamage : (minDamage + maxDamage) / 2;

    statRows.push(
      {
        label: "Accuracy",
        value: formatHit(resolved.hitBonus),
        isKeyword: true,
        comparison: compared
          ? {
              value: formatHit(compared.hitBonus),
              status: compareStat(resolved.hitBonus, compared.hitBonus),
            }
          : undefined,
      },
      {
        label: "Damage",
        value: formatDamage(resolved.minDamage, resolved.maxDamage),
        comparison: compared
          ? {
              value: formatDamage(compared.minDamage, compared.maxDamage),
              status: compareStat(
                damageMetric(resolved.minDamage, resolved.maxDamage),
                damageMetric(compared.minDamage, compared.maxDamage),
              ),
            }
          : undefined,
      },
      {
        label: "Crit.",
        value: formatCrit(resolved.crit),
        isKeyword: true,
        comparison: compared
          ? {
              value: formatCrit(compared.crit),
              status: compareStat(resolved.crit, compared.crit),
            }
          : undefined,
      },
    );

    subTitle = [
      slotId === "ammo"
        ? "Ammunition"
        : slotId === "meleeWeapon"
          ? "Melee"
          : "Ranged",
      ...(slotId === "ammo"
        ? []
        : [`${resolved.weightCategory} ${resolved.weaponType}`.trim()]),
      ...resolved.damageType,
      ...("twoHanded" in item && item.twoHanded ? ["Two-Handed"] : []),
    ].filter(Boolean);
  } else if (slotId === "light") {
    if ("light" in item && item.light > 0) {
      statRows.push({ label: "Light Radius", value: `${item.light}` });
    }
  } else if (slotId !== "ring" && slotId !== "necklace") {
    const resolved = resolveWearableStats(item as WearableStatsSource);
    const compared = comparisonItem
      ? resolveWearableStats(comparisonItem as WearableStatsSource)
      : null;

    const isShield = slotId === "shield";

    const soakComparison = compared
      ? {
          value: isShield ? `+${compared.soak}` : `${compared.soak}`,
          status: compareStat(resolved.soak, compared.soak),
        }
      : undefined;

    statRows.push(
      // a shield's soak raises Dodge while in hand, not Soak
      isShield
        ? {
            label: "Dodge",
            value: `+${resolved.soak}`,
            isKeyword: true,
            comparison: soakComparison,
          }
        : {
            label: "Soak",
            value: `${resolved.soak}`,
            isKeyword: true,
            comparison: soakComparison,
          },
      {
        label: "Enc.",
        value: `${resolved.encumbrance}`,
        isKeyword: true,
        // lower encumbrance is better (makeComparativeColorTagReversed)
        comparison: compared
          ? {
              value: `${compared.encumbrance}`,
              status: compareStat(
                resolved.encumbrance,
                compared.encumbrance,
                true,
              ),
            }
          : undefined,
      },
    );

    if (resolved.weightCategory) {
      subTitle = [
        `${resolved.weightCategory} ${EQUIPMENT_SLOT_LABELS[slotId]}`,
      ];
    }
  }

  const value = resolveItemValue(item);
  const weight = resolveItemWeight(item);

  statRows.push(
    { label: "Value", value: `${value} GP` },
    {
      label: "Weight",
      value: `${weight.toFixed(2)} lb${weight > 1 ? "s" : ""}`,
    },
  );

  const isEnchantedDisplay = !!(
    item.enchantment ||
    item.unique ||
    item.conferredAbilities.length
  );

  const passiveAbilities = getConferredPassiveAbilities([item]);
  const auxiliary = getConferredAuxiliaryComponents([item]);

  const bonusLines = passiveAbilities.flatMap((ability) => [
    ...ability.bonusAttributes.map(
      (attributeId) =>
        `+${ability.bonusMagnitude} ${getAttributeTitle(attributeId)}`,
    ),
    ...ability.penaltyAttributes.map(
      (attributeId: string) =>
        `-${ability.penaltyMagnitude} ${getAttributeTitle(attributeId)}`,
    ),
  ]);

  const namedAbilities = [
    ...passiveAbilities.filter(
      (ability) =>
        !ability.bonusAttributes.length && !ability.penaltyAttributes.length,
    ),
    ...auxiliary.maneuvers,
    ...auxiliary.triggeredAbilities,
    ...auxiliary.spells,
  ];

  const enchantment = item.enchantment
    ? COMBINED_ENCHANTMENT_MAP.get(item.enchantment)
    : undefined;

  const handleEquip = () => equipment.equip(slotId, itemId);
  const handleUnequip = () => equipment.unequip(slotId);

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>
          {item.title}
          {isEquipped ? (
            <span className={`text-green`}> (Equipped)</span>
          ) : null}
        </span>
        <div className={`-mt-1 flex flex-wrap gap-x-1`}>
          <span className={`leading-5 text-light-gray`}>
            [{subTitle.join(", ")}]
          </span>
          {isEnchantedDisplay ? (
            <span className={`leading-5 text-light-gray`}>[Enchanted]</span>
          ) : null}
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {statRows.map(({ label, value, isKeyword, comparison }) => (
          <Fragment key={label}>
            {isKeyword ? (
              <Keyword>{label}</Keyword>
            ) : (
              <span className={`text-light-gray`}>{label}</span>
            )}
            <span>
              <span className={COMPARISON_COLOR[comparison?.status ?? "equal"]}>
                {value}
              </span>
              {/* the game shows "Vs <worn>" only when the stat actually differs */}
              {comparison && comparison.status !== "equal" ? (
                <span className={`text-white`}> Vs {comparison.value}</span>
              ) : null}
            </span>
          </Fragment>
        ))}
      </div>
      {bonusLines.length || namedAbilities.length ? (
        <div className={`flex flex-col`}>
          {bonusLines.map((line) => (
            <span key={line} className={`text-lime`}>
              {line}
            </span>
          ))}
          {namedAbilities.map((ability) => (
            <Keyword key={ability.id}>{ability.title}</Keyword>
          ))}
        </div>
      ) : null}
      {enchantment?.description ? (
        <Paragraph className={`text-yellow`}>
          {enchantment.description}
        </Paragraph>
      ) : null}
      {"description" in item && item.description ? (
        <Paragraph className={`text-yellow`}>{item.description}</Paragraph>
      ) : null}
      {!legality.allowed ? (
        <Paragraph className={`text-yellow`}>{legality.reason}</Paragraph>
      ) : null}
      {/* generated enchanted ids get long — truncate the display, copy keeps
          the full id */}
      <CopyTextButton className={`-mt-2 max-w-full truncate`}>
        {item.id}
      </CopyTextButton>
      {/* sits directly above the DescriptionContainer's Continue/Back stack */}
      <div className={`mt-auto flex flex-col items-center`}>
        {isEquipped ? (
          <PanelButton onPress={handleUnequip}>Unequip</PanelButton>
        ) : (
          <PanelButton isDisabled={!legality.allowed} onPress={handleEquip}>
            Equip
          </PanelButton>
        )}
      </div>
    </>
  );
};
