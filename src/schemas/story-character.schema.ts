import type { JSONSchema } from "json-schema-to-ts";
import { EquipmentSchema, LevelSchema, FeatsSchema } from "@/schemas";

export const StoryCharacterSchema = {
  type: "object",
  required: ["characterId", "category", "feats", "level"],
  additionalProperties: false,
  properties: {
    characterId: {
      type: "string",
    },
    category: {
      type: "string",
      enum: ["story"],
    },
    feats: FeatsSchema,
    level: LevelSchema,
    // optional for backwards compatibility with pre-equipment build links
    equipment: EquipmentSchema,
  },
} as const satisfies JSONSchema;
