import type { JSONSchema } from "json-schema-to-ts";

export const PrimaryAttributeSchema = {
  type: "number",
  minimum: 0,
  maximum: 3,
} as const satisfies JSONSchema;

export const PrimaryAttributesSchema = {
  type: "object",
  additionalProperties: false,
  // attribute IDs from game files
  patternProperties: {
    "^ATT_.+$": PrimaryAttributeSchema,
  },
} as const satisfies JSONSchema;
