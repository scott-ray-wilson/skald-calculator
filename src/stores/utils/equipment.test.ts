import { describe, expect, it } from "vitest";
import {
  getActiveItem,
  getActiveItemList,
  getEquippedItem,
  getEquippedItemList,
  getPartyMemberPermissions,
  getSlotLegality,
  getWornItem,
  pruneStaleEquipment,
} from "@/stores/utils/equipment";
import { EquipmentSchema, PartyLoadoutSchema } from "@/schemas";
import { validate } from "@/schemas/utils";
import {
  EquipmentSchemaType,
  MainCharacterSchemaType,
} from "@/schemas/types";
import { EQUIPMENT_SLOT_IDS } from "@/resources/equipment";

const makeMainCharacter = (
  classId: string,
  equipment?: EquipmentSchemaType,
): MainCharacterSchemaType => ({
  category: "main",
  classId,
  backgroundId: "BAC_Acolyte",
  portrait: "Male1",
  feats: {},
  level: 1,
  primaryAttributes: {},
  skills: {},
  ...(equipment ? { equipment } : {}),
});

describe("EquipmentSchema", () => {
  it("stays in sync with EQUIPMENT_SLOT_IDS", () => {
    expect(Object.keys(EquipmentSchema.properties).sort()).toEqual(
      [...EQUIPMENT_SLOT_IDS].sort(),
    );
  });

  it("accepts pre-equipment build links (back-compat)", () => {
    const legacyLoadout = [
      makeMainCharacter("CLA_ArmsMaster"),
      null,
      null,
      null,
      null,
      null,
    ];

    expect(validate(PartyLoadoutSchema, legacyLoadout)).toBe(true);
  });

  it("accepts loadouts with equipped items", () => {
    const loadout = [
      makeMainCharacter("CLA_ArmsMaster", {
        armor: "ITE_ArmorChainmail",
        ring: "ITE_JewelryRingMagical1GeneralAttributeAgility",
      }),
      null,
      null,
      null,
      null,
      null,
    ];

    expect(validate(PartyLoadoutSchema, loadout)).toBe(true);
  });

  it("rejects unknown slot keys and non-string values", () => {
    const unknownSlot = [
      makeMainCharacter("CLA_ArmsMaster", {
        offhand: "ITE_ShieldBuckler",
      } as EquipmentSchemaType),
      null,
      null,
      null,
      null,
      null,
    ];
    expect(validate(PartyLoadoutSchema, unknownSlot)).toBe(false);

    const nonString = [
      makeMainCharacter("CLA_ArmsMaster", {
        armor: 7,
      } as unknown as EquipmentSchemaType),
      null,
      null,
      null,
      null,
      null,
    ];
    expect(validate(PartyLoadoutSchema, nonString)).toBe(false);
  });
});

describe("getEquippedItem / getEquippedItemList", () => {
  it("returns the item for a valid slot/id pair", () => {
    const item = getEquippedItem({ armor: "ITE_ArmorChainmail" }, "armor");

    expect(item?.id).toBe("ITE_ArmorChainmail");
  });

  it("returns null for empty slots, unknown ids and wrong-slot ids", () => {
    expect(getEquippedItem(undefined, "armor")).toBeNull();
    expect(getEquippedItem({}, "armor")).toBeNull();
    expect(getEquippedItem({ armor: "ITE_DoesNotExist" }, "armor")).toBeNull();
    // chainmail is not a ring
    expect(getEquippedItem({ ring: "ITE_ArmorChainmail" }, "ring")).toBeNull();
  });

  it("lists equipped items across slots", () => {
    const items = getEquippedItemList({
      armor: "ITE_ArmorChainmail",
      meleeWeapon: "ITE_WeaponDagger",
      ring: "ITE_DoesNotExist",
    });

    expect(items.map((item) => item.id).sort()).toEqual([
      "ITE_ArmorChainmail",
      "ITE_WeaponDagger",
    ]);
  });
});

describe("getSlotLegality", () => {
  it("applies class gates only to weapons and armor", () => {
    // BattleMagos: Light armor only; Light weapons of Blade/Club/Bow
    const permissions = getPartyMemberPermissions(
      makeMainCharacter("CLA_BattleMagos"),
    );

    const fullPlate = getEquippedItem({ armor: "ITE_ArmorFullPlate" }, "armor");
    const greataxe = getEquippedItem(
      { meleeWeapon: "ITE_WeaponGreataxe" },
      "meleeWeapon",
    );
    const dagger = getEquippedItem(
      { meleeWeapon: "ITE_WeaponDagger" },
      "meleeWeapon",
    );
    const buckler = getEquippedItem({ shield: "ITE_ShieldBuckler" }, "shield");
    if (!fullPlate || !greataxe || !dagger || !buckler)
      throw new Error("missing fixture");

    expect(getSlotLegality(permissions, "armor", fullPlate)).toEqual({
      allowed: false,
      reason: "Heavy Armor can't be equipped by this Class.",
    });
    expect(getSlotLegality(permissions, "meleeWeapon", greataxe)).toEqual({
      allowed: false,
      reason: "Heavy Weapons can't be equipped by this Class.",
    });
    expect(getSlotLegality(permissions, "meleeWeapon", dagger)).toEqual({
      allowed: true,
    });
    // shields are never class-gated
    expect(getSlotLegality(permissions, "shield", buckler)).toEqual({
      allowed: true,
    });
  });
});

describe("pruneStaleEquipment", () => {
  it("drops stale and wrong-slot ids but keeps class-illegal gear", () => {
    const battleMagos = makeMainCharacter("CLA_BattleMagos", {
      armor: "ITE_ArmorFullPlate", // illegal: heavy — kept anyway
      meleeWeapon: "ITE_WeaponDagger", // legal
      shield: "ITE_ShieldBuckler", // legal: not gated
      ring: "ITE_ArmorChainmail", // wrong slot
      necklace: "ITE_DoesNotExist", // stale id
    });

    expect(pruneStaleEquipment(battleMagos.equipment)).toEqual({
      armor: "ITE_ArmorFullPlate",
      meleeWeapon: "ITE_WeaponDagger",
      shield: "ITE_ShieldBuckler",
    });
  });
});

describe("getWornItem / getActiveItem", () => {
  it("keeps class-illegal gear worn but excludes it from active items", () => {
    const battleMagos = makeMainCharacter("CLA_BattleMagos", {
      armor: "ITE_ArmorFullPlate", // illegal: heavy
      meleeWeapon: "ITE_WeaponDagger", // legal
    });

    const wornArmor = getWornItem(battleMagos, "armor");

    expect(wornArmor?.item.id).toBe("ITE_ArmorFullPlate");
    expect(wornArmor?.legality).toEqual({
      allowed: false,
      reason: "Heavy Armor can't be equipped by this Class.",
    });

    expect(getActiveItem(battleMagos, "armor")).toBeNull();
    expect(getActiveItem(battleMagos, "meleeWeapon")?.id).toBe(
      "ITE_WeaponDagger",
    );
    expect(getActiveItemList(battleMagos).map((item) => item.id)).toEqual([
      "ITE_WeaponDagger",
    ]);
  });

  it("returns null for empty slots", () => {
    const armsMaster = makeMainCharacter("CLA_ArmsMaster");

    expect(getWornItem(armsMaster, "armor")).toBeNull();
    expect(getActiveItem(armsMaster, "armor")).toBeNull();
  });
});
