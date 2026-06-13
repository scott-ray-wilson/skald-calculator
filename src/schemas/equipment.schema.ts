import { JSONSchema } from "json-schema-to-ts";

// One equipped item id per slot (the game's paperdoll holds exactly one item
// per slot — including a single ring). Enchanted gear ids are the concrete
// generated items from src/resources/equipment/enchantedItems.ts, so a plain
// item id fully describes an equipped piece.
// Keys must stay in sync with EQUIPMENT_SLOT_IDS (asserted by test).
export const EquipmentSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    meleeWeapon: { type: "string" },
    rangedWeapon: { type: "string" },
    ammo: { type: "string" },
    armor: { type: "string" },
    shield: { type: "string" },
    head: { type: "string" },
    gloves: { type: "string" },
    boots: { type: "string" },
    clothing: { type: "string" },
    necklace: { type: "string" },
    ring: { type: "string" },
    light: { type: "string" },
  },
} as const satisfies JSONSchema;
