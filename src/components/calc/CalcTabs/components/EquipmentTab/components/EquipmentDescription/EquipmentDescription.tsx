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
  WearableStatsSource,
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

  // stats and formatting mirror the item database description components
  const statRows: { label: string; value: string; isKeyword?: boolean }[] = [];
  let subTitle: string[] = [EQUIPMENT_SLOT_LABELS[slotId]];

  if (isWeapon) {
    const resolved = resolveDamagingStats(item as DamagingStatsSource);

    statRows.push(
      {
        label: "Accuracy",
        value: `${resolved.hitBonus < 0 ? "" : "+"}${resolved.hitBonus}`,
        isKeyword: true,
      },
      {
        label: "Damage",
        value: `${slotId === "ammo" ? "+" : ""}${
          resolved.minDamage === resolved.maxDamage
            ? resolved.maxDamage
            : `${resolved.minDamage}-${resolved.maxDamage}`
        }`,
      },
      {
        label: "Crit.",
        value: `x${resolved.crit === 0 ? resolved.crit : resolved.crit.toFixed(1)}`,
        isKeyword: true,
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

    statRows.push(
      // a shield's soak raises Dodge while in hand, not Soak
      slotId === "shield"
        ? { label: "Dodge", value: `+${resolved.soak}`, isKeyword: true }
        : { label: "Soak", value: `${resolved.soak}`, isKeyword: true },
      { label: "Enc.", value: `${resolved.encumbrance}`, isKeyword: true },
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
        {statRows.map(({ label, value, isKeyword }) => (
          <Fragment key={label}>
            {isKeyword ? (
              <Keyword>{label}</Keyword>
            ) : (
              <span className={`text-light-gray`}>{label}</span>
            )}
            <span className={`text-white`}>{value}</span>
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
