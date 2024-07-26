import { MercenaryCharacterSchema, StoryCharacterSchema } from "@/schemas";
import type { JSONSchema } from "json-schema-to-ts";

export const PartyMemberSchema = {
  oneOf: [StoryCharacterSchema, MercenaryCharacterSchema, { type: "null" }],
} as const satisfies JSONSchema;
