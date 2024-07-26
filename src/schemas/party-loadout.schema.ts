import { type JSONSchema } from "json-schema-to-ts";
import { MainCharacterSchema, PartyMemberSchema } from "@/schemas";

export const PartyLoadoutSchema = {
  // $id: "https://json-schema.org/draft/2020-12/schema",
  // $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "array",
  minItems: 6,
  maxItems: 6,
  items: [
    MainCharacterSchema,
    PartyMemberSchema,
    PartyMemberSchema,
    PartyMemberSchema,
    PartyMemberSchema,
    PartyMemberSchema,
  ],
} as const satisfies JSONSchema;
