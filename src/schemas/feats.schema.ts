import { JSONSchema } from "json-schema-to-ts";

export const FeatsSchema = {
  type: "object",
  additionalProperties: false,
  patternProperties: {
    // feat IDs from game files
    "^FEA_.+$": {
      type: "number",
      minimum: 0,
      maximum: 6,
    },
  },
} as const satisfies JSONSchema;
