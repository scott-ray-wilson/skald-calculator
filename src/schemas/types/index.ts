import type { FromSchema } from "json-schema-to-ts";
import {
  MainCharacterSchema,
  MercenaryCharacterSchema,
  PartyLoadoutSchema,
  StoryCharacterSchema,
} from "@/schemas";

// Characters
export type MainCharacterSchemaType = FromSchema<typeof MainCharacterSchema>;
export type MercenaryCharacterSchemaType = FromSchema<
  typeof MercenaryCharacterSchema
>;
export type StoryCharacterSchemaType = FromSchema<typeof StoryCharacterSchema>;

// Party
export type PartyLoadoutSchemaType = FromSchema<typeof PartyLoadoutSchema>;
export type PartyMemberSchemaType =
  | MainCharacterSchemaType
  | MercenaryCharacterSchemaType
  | StoryCharacterSchemaType;
export type PartyMemberCategoryType = PartyMemberSchemaType["category"];
