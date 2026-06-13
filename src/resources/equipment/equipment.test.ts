import { describe, expect, it } from "vitest";
import {
  AmmoRequiringSource,
  DamagingStatsSource,
  EQUIPMENT_SLOT_ITEMS,
  EQUIPPABLE_BOOTS_LIST,
  EQUIPPABLE_GLOVES_LIST,
  EQUIPPABLE_HEAD_LIST,
  EQUIPPABLE_ITEM_MAP,
  EQUIPPABLE_NECKLACE_LIST,
  EQUIPPABLE_RING_LIST,
  EQUIPPABLE_SHIELD_LIST,
  ENCHANTED_JEWELRY_LIST,
  ENCHANTED_MELEE_WEAPON_LIST,
  getArmorLegality,
  getClassPermissions,
  getConditionAttributeModifier,
  getConferredAuxiliaryComponents,
  getConferredPassiveAbilities,
  getEffectiveArmorEncumbrance,
  getEncumbranceAttributeModifier,
  getEquipLegality,
  getEquipmentAttributeBonus,
  getPassiveAbilityAttributeModifier,
  getUsableAmmo,
  getWeaponDamageAttributeIds,
  getWeaponHitAttributeIds,
  getWeaponLegality,
  resolveDamagingStats,
  resolveItemValue,
  resolveItemWeight,
  resolveRequiredAmmoType,
  resolveWearableStats,
} from "@/resources/equipment";
import {
  ARCHETYPE_CLASS_LIST,
  ARMOR_LIST,
  CLASS_LIST,
  SKILL_LIST,
} from "@/resources/lists";

const getClass = (id: string) => {
  const characterClass = CLASS_LIST.find((c) => c.id === id);
  if (!characterClass) throw new Error(`missing class ${id}`);
  return characterClass;
};

const getArchetype = (id: string) => {
  const archetypeClass = ARCHETYPE_CLASS_LIST.find((c) => c.id === id);
  if (!archetypeClass) throw new Error(`missing archetype ${id}`);
  return archetypeClass;
};

const getPermissions = (classId: string) => {
  const characterClass = getClass(classId);
  return getClassPermissions(
    characterClass,
    getArchetype(characterClass.archetype),
  );
};

const getSkill = (id: string) => {
  const skill = SKILL_LIST.find((s) => s.id === id);
  if (!skill) throw new Error(`missing skill ${id}`);
  return skill;
};

const NO_ENCUMBRANCE = {
  armor: 0,
  helmet: 0,
  gloves: 0,
  shoes: 0,
  outfitReaction: 0,
};

describe("enchanted item generation (MagicItemMaker)", () => {
  it("generates ids as baseId + enchantmentId minus the ECH_ prefix", () => {
    const ring = ENCHANTED_JEWELRY_LIST.find(
      (item) => item.id === "ITE_JewelryRingMagical1GeneralAttributeAgility",
    );

    expect(ring).toBeDefined();
    expect(ring?.enchantment).toBe("ECH_GeneralAttributeAgility");
  });

  it("composes display titles from the enchantment affixes", () => {
    // suffix enchantment: "Skull Ring" + "of Agility"
    const ring = ENCHANTED_JEWELRY_LIST.find(
      (item) => item.id === "ITE_JewelryRingMagical1GeneralAttributeAgility",
    );
    expect(ring?.title).toBe("Skull Ring of Agility");

    // prefix enchantment: "Accurate" + fine broadsword
    const sword = ENCHANTED_MELEE_WEAPON_LIST.find(
      (item) => item.id === "ITE_WeaponBastardswordFineWeaponAccuracy",
    );
    expect(sword?.title).toBe("Accurate Fine Broadsword");
  });

  it("skips applicable ids that are not in the base containers", () => {
    ENCHANTED_MELEE_WEAPON_LIST.forEach((item) => {
      expect(item.id.startsWith("ITE_Weapon")).toBe(true);
    });
  });
});

describe("slot item routing", () => {
  it("splits accessories by slot and jewelry by slotJewelry", () => {
    expect(EQUIPPABLE_HEAD_LIST.every((i) => i.slot === "Head")).toBe(true);
    expect(EQUIPPABLE_GLOVES_LIST.every((i) => i.slot === "Hands")).toBe(true);
    expect(EQUIPPABLE_BOOTS_LIST.every((i) => i.slot === "Feet")).toBe(true);
    expect(
      EQUIPPABLE_NECKLACE_LIST.every((i) => i.slotJewelry === "Neck"),
    ).toBe(true);
    expect(EQUIPPABLE_RING_LIST.every((i) => i.slotJewelry === "Finger")).toBe(
      true,
    );

    expect(EQUIPPABLE_HEAD_LIST.length).toBeGreaterThan(0);
    expect(EQUIPPABLE_GLOVES_LIST.length).toBeGreaterThan(0);
    expect(EQUIPPABLE_BOOTS_LIST.length).toBeGreaterThan(0);
    expect(EQUIPPABLE_NECKLACE_LIST.length).toBeGreaterThan(0);
    expect(EQUIPPABLE_RING_LIST.length).toBeGreaterThan(0);
  });

  it("routes adventuring items with a light radius to the light slot", () => {
    expect(EQUIPMENT_SLOT_ITEMS.light.length).toBeGreaterThan(0);
    expect(
      EQUIPMENT_SLOT_ITEMS.light.every(
        (item) => "light" in item && item.light > 0,
      ),
    ).toBe(true);
    expect(EQUIPPABLE_ITEM_MAP.get("ITE_MiscLantern")?.slotId).toBe("light");
  });

  it("ignores the dead `equipable` raw field (the game never reads it)", () => {
    // chainmail and every shield carry equipable=false yet equip in-game
    expect(
      EQUIPMENT_SLOT_ITEMS.armor.some((i) => i.id === "ITE_ArmorChainmail"),
    ).toBe(true);
    expect(EQUIPPABLE_SHIELD_LIST.length).toBeGreaterThan(0);
  });

  it("indexes every equippable item by id with its slot", () => {
    const entry = EQUIPPABLE_ITEM_MAP.get("ITE_ArmorChainmail");
    expect(entry?.slotId).toBe("armor");
  });
});

describe("resolveWearableStats (ItemArmorBase)", () => {
  it("sums own + parent + enchantment deltas with parent weight fallback", () => {
    const masterworkBreastplate = ARMOR_LIST.find(
      (item) => item.id === "ITE_ArmorBreastplateMagical",
    );
    if (!masterworkBreastplate) throw new Error("missing fixture");

    // own soak 1 + parent breastplate 6; own enc -1 + parent 2
    expect(resolveWearableStats(masterworkBreastplate)).toEqual({
      soak: 7,
      encumbrance: 1,
      weightCategory: "Medium",
    });
  });

  it("floors soak and encumbrance at 0", () => {
    expect(
      resolveWearableStats({
        soak: -2,
        encumberance: -5,
        weightCategory: "Light",
        parent: "",
        enchantment: "",
      }),
    ).toEqual({ soak: 0, encumbrance: 0, weightCategory: "Light" });
  });
});

describe("resolveDamagingStats (ItemDamaging)", () => {
  it("folds parent and enchantment into damage/hit only when a parent is set", () => {
    // generated "Accurate Broadsword": own hit 1 + parent 0 + enchantment 2;
    // damage entirely from the parent; crit 0 + 1.7 + 0.5
    const sword = ENCHANTED_MELEE_WEAPON_LIST.find(
      (item) => item.id === "ITE_WeaponBastardswordFineWeaponAccuracy",
    );
    if (!sword) throw new Error("missing fixture");

    expect(resolveDamagingStats(sword)).toEqual({
      minDamage: 1,
      maxDamage: 10,
      hitBonus: 3,
      crit: 2.2,
      weightCategory: "Medium",
      weaponType: "Blade",
      // own [] + parent Slashing + enchantment Magical, deduped in order
      damageType: ["Slashing", "Magical"],
    });
  });

  it("skips enchantment damage/hit deltas on parentless items but not crit", () => {
    const parentless = {
      minDamage: 2,
      maxDamage: 6,
      hitBonus: 1,
      crit: 1.5,
      weightCategory: "Light",
      weaponType: "Club",
      damageType: ["Blunt"],
      parent: "",
      enchantment: "ECH_WeaponAccuracy", // +2 hit, +0.5 crit, Magical
    };

    expect(resolveDamagingStats(parentless)).toEqual({
      minDamage: 2,
      maxDamage: 6,
      hitBonus: 1, // enchantment hit NOT applied (ItemDamaging early return)
      crit: 2, // enchantment crit applied (getCritMultiplier has no gate)
      weightCategory: "Light",
      weaponType: "Club",
      damageType: ["Blunt", "Magical"], // enchantment types have no parent gate
    });
  });

  it("resolves weight from the parent and value from the enchantment", () => {
    const masterworkLongsword = ENCHANTED_MELEE_WEAPON_LIST.find(
      (item) => item.id === "ITE_WeaponLongswordMagicalWeaponAccuracy",
    );
    const agilityRing = ENCHANTED_JEWELRY_LIST.find(
      (item) => item.id === "ITE_JewelryRingMagical1GeneralAttributeAgility",
    );
    const masterworkBreastplate = ARMOR_LIST.find(
      (item) => item.id === "ITE_ArmorBreastplateMagical",
    );
    if (!masterworkLongsword || !agilityRing || !masterworkBreastplate)
      throw new Error("missing fixture");

    // variants carry weight 0 — the base item holds it (Item.getWeight)
    expect(resolveItemWeight(masterworkLongsword)).toBe(4);
    expect(resolveItemWeight(masterworkBreastplate)).toBe(30);
    expect(resolveItemWeight(agilityRing)).toBeCloseTo(0.1);

    // value x enchantment multiplier + base price, rounded (Item.getValue)
    expect(resolveItemValue(agilityRing)).toBe(Math.round(100 * 1.4 + 600));
    expect(resolveItemValue(masterworkBreastplate)).toBe(1200); // no enchantment
  });
});

describe("equip legality (Character.isItemLegalToEquip)", () => {
  it("unions subclass and archetype permissions", () => {
    // BattleMagos adds Light armor to Magos's none and keeps Magos weapons
    const battleMagos = getPermissions("CLA_BattleMagos");
    expect(
      getArmorLegality(battleMagos, { weightCategory: "Light" }),
    ).toEqual({ allowed: true });
    expect(
      getWeaponLegality(battleMagos, {
        weightCategory: "Light",
        weaponType: "Blade",
      }),
    ).toEqual({ allowed: true });

    // Hospitaller adds Heavy armor to Cleric's Light
    const hospitaller = getPermissions("CLA_Hospitaller");
    expect(
      getArmorLegality(hospitaller, { weightCategory: "Heavy" }),
    ).toEqual({ allowed: true });
  });

  it("denies with the exact in-game message strings", () => {
    const magos = getPermissions("CLA_BattleMagos");
    expect(getArmorLegality(magos, { weightCategory: "Heavy" })).toEqual({
      allowed: false,
      reason: "Heavy Armor can't be equipped by this Class.",
    });

    const cleric = getPermissions("CLA_Hospitaller");
    expect(
      getWeaponLegality(cleric, {
        weightCategory: "Light",
        weaponType: "Blade",
      }),
    ).toEqual({
      allowed: false,
      reason: "Blades can't be equipped by this Class.",
    });
    expect(
      getWeaponLegality(cleric, {
        weightCategory: "Heavy",
        weaponType: "Club",
      }),
    ).toEqual({
      allowed: false,
      reason: "Heavy Weapons can't be equipped by this Class.",
    });
  });

  it("never gates Polearms/Crossbows by type, only by weight", () => {
    // Cleric allows Club only — but the game checks just Blade/Axe/Bow/Club
    // type flags, so a Medium polearm passes (weight Medium is allowed)
    const cleric = getPermissions("CLA_Hospitaller");
    expect(
      getWeaponLegality(cleric, {
        weightCategory: "Medium",
        weaponType: "Polearm",
      }),
    ).toEqual({ allowed: true });
    expect(
      getWeaponLegality(cleric, {
        weightCategory: "Heavy",
        weaponType: "Polearm",
      }),
    ).toEqual({
      allowed: false,
      reason: "Heavy Weapons can't be equipped by this Class.",
    });
  });

  it("only class-gates weapons and armor; other slots are always legal", () => {
    const magos = getPermissions("CLA_BattleMagos");
    expect(
      getEquipLegality(magos, "shield", { weightCategory: "Heavy" }),
    ).toEqual({ allowed: true });
    expect(
      getEquipLegality(magos, "armor", { weightCategory: "Heavy" }),
    ).toEqual({
      allowed: false,
      reason: "Heavy Armor can't be equipped by this Class.",
    });
  });
});

describe("conferred effects (stacking rules)", () => {
  const agilityRing = ENCHANTED_JEWELRY_LIST.find(
    (item) => item.id === "ITE_JewelryRingMagical1GeneralAttributeAgility",
  );
  if (!agilityRing) throw new Error("missing fixture");

  it("collects passives from the item and its enchantment", () => {
    const passives = getConferredPassiveAbilities([agilityRing]);

    expect(passives.map((a) => a.id)).toEqual(["ABI_PassiveBonusAgility"]);
    expect(getEquipmentAttributeBonus([agilityRing], "ATT_Agility")).toBe(1);
  });

  it("preserves duplicates — identical passives from two items stack", () => {
    // e.g. Agility ring + Agility-enchanted boots both grant +1 Agility
    const items = [agilityRing, agilityRing];

    expect(getConferredPassiveAbilities(items)).toHaveLength(2);
    expect(getEquipmentAttributeBonus(items, "ATT_Agility")).toBe(2);
  });

  it("routes non-passive conferred abilities to deduped auxiliary lists", () => {
    // legendary leather armor confers a triggered ability, not a passive
    const legendaryLeather = ARMOR_LIST.find(
      (item) => item.id === "ITE_ArmorDELUXELeatherLegendary",
    );
    if (!legendaryLeather) throw new Error("missing fixture");

    const passives = getConferredPassiveAbilities([legendaryLeather]);
    expect(passives).toHaveLength(0);

    const auxiliary = getConferredAuxiliaryComponents([
      legendaryLeather,
      legendaryLeather,
    ]);
    expect(auxiliary.triggeredAbilities.map((a) => a.id)).toEqual([
      "ABI_TriggeredWoundedNotToday",
    ]);
  });

  it("applies passive penalty and condition modifiers", () => {
    expect(
      getPassiveAbilityAttributeModifier(
        {
          bonusMagnitude: 2,
          bonusAttributes: ["ATT_Strength"],
          penaltyMagnitude: 1,
          penaltyAttributes: ["ATT_Agility"],
        },
        "ATT_Agility",
      ),
    ).toBe(-1);

    expect(
      getConditionAttributeModifier(
        {
          primaryMagnitude: 2,
          primaryAffectedAttributes: ["ATT_Dodge"],
          secondaryMagnitude: 1,
          secondaryAffectedAttributes: ["ATT_Dodge"],
        },
        "ATT_Dodge",
      ),
    ).toBe(3);
  });
});

describe("encumbrance (data-driven count* flags)", () => {
  it("matches the documented slot→skill mapping", () => {
    const worn = {
      armor: 2,
      helmet: 1,
      gloves: 3,
      shoes: 1,
      outfitReaction: 2,
    };

    // Stealth counts armor AND footwear
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Stealth"), worn),
    ).toBe(-3);
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Awareness"), worn),
    ).toBe(-1);
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Thievery"), worn),
    ).toBe(-3);
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Athletics"), worn),
    ).toBe(-2);
    // Diplomacy gains the outfit's reaction bonus
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Diplomacy"), worn),
    ).toBe(2);
  });

  it("returns 0 when nothing relevant is worn", () => {
    expect(
      getEncumbranceAttributeModifier(getSkill("ATT_Stealth"), NO_ENCUMBRANCE),
    ).toBe(0);
  });

  it("reduces armor encumbrance by mastery, floored at 0", () => {
    expect(getEffectiveArmorEncumbrance(3, 1)).toBe(2);
    expect(getEffectiveArmorEncumbrance(3, 5)).toBe(0);
  });
});

describe("attack stat attributes (printInventorySummary)", () => {
  const getItem = (id: string) => {
    const entry = EQUIPPABLE_ITEM_MAP.get(id);
    if (!entry) throw new Error(`missing fixture ${id}`);
    return entry.item;
  };

  it("maps weapon type and weight to the hidden hit attributes", () => {
    // the enchanted cutlass resolves to a Medium Blade through its parent
    const cutlass = resolveDamagingStats(
      getItem("ITE_WeaponCutlassFineWeaponAccuracy") as DamagingStatsSource,
    );
    expect(getWeaponHitAttributeIds(cutlass)).toEqual([
      "ATT_HitWeaponSwords",
      "ATT_HitWeaponMedium",
    ]);

    const longbow = resolveDamagingStats(
      getItem("ITE_WeaponLongbow") as DamagingStatsSource,
    );
    expect(getWeaponHitAttributeIds(longbow)).toEqual([
      "ATT_HitWeaponBows",
      "ATT_HitWeaponMedium",
    ]);

    expect(getWeaponHitAttributeIds(null)).toEqual(["ATT_HitWeaponUnarmed"]);
  });

  it("maps damage attributes with the general melee/ranged/unarmed split", () => {
    const cutlass = resolveDamagingStats(
      getItem("ITE_WeaponCutlassFineWeaponAccuracy") as DamagingStatsSource,
    );
    expect(getWeaponDamageAttributeIds(cutlass, false)).toEqual([
      "ATT_DmgGeneralMelee",
      "ATT_DmgWeaponSwords",
      "ATT_DmgWeaponMedium",
    ]);

    const longbow = resolveDamagingStats(
      getItem("ITE_WeaponLongbow") as DamagingStatsSource,
    );
    expect(getWeaponDamageAttributeIds(longbow, true)).toEqual([
      "ATT_DmgGeneralRanged",
      "ATT_DmgWeaponBows",
      "ATT_DmgWeaponMedium",
    ]);

    // unarmed counts as melee (isWeaponRanged is false without a weapon)
    expect(getWeaponDamageAttributeIds(null, false)).toEqual([
      "ATT_DmgGeneralMelee",
      "ATT_DmgGeneralUnarmed",
    ]);
  });

  it("resolves required ammo type through the parent and matches equipped ammo", () => {
    const fineLongbow = getItem("ITE_WeaponLongbowFine") as AmmoRequiringSource;
    const arrows = getItem("ITE_ArrowHunting");

    // quality variants inherit the base bow's ARROW requirement
    expect(resolveRequiredAmmoType(fineLongbow)).toBe("ARROW");
    expect(getUsableAmmo(fineLongbow, arrows)).toBe(arrows);
    expect(getUsableAmmo(fineLongbow, null)).toBeNull();

    // weapons with no ammo type never count the ammo slot
    const cutlass = getItem("ITE_WeaponCutlass") as AmmoRequiringSource;
    expect(resolveRequiredAmmoType(cutlass)).toBe("");
    expect(getUsableAmmo(cutlass, arrows)).toBeNull();
  });
});
