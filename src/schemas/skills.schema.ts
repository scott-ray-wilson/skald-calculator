import type { JSONSchema } from "json-schema-to-ts";

export const SkillSchema = {
  type: "number",
  minimum: 0,
  maximum: 4,
} as const satisfies JSONSchema;

export const SkillsSchema = {
  type: "object",
  additionalProperties: false,
  // skill IDs from game files
  patternProperties: {
    "^ATT_.+$": SkillSchema,
  },
} as const satisfies JSONSchema;
