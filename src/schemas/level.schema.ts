import { JSONSchema } from "json-schema-to-ts";

export const LevelSchema = {
  type: "number",
  minimum: 1,
  maximum: 20,
} as const satisfies JSONSchema;
