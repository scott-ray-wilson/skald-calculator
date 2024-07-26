import type { JSONSchema } from "json-schema-to-ts";
import { LevelSchema, FeatsSchema } from "@/schemas";

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
  },
} as const satisfies JSONSchema;
