import type { FromSchema } from "json-schema-to-ts";
import {
  EquipmentSchema,
  MainCharacterSchema,
  MercenaryCharacterSchema,
  PartyLoadoutSchema,
  StoryCharacterSchema,
} from "@/schemas";

// Equipment
export type EquipmentSchemaType = FromSchema<typeof EquipmentSchema>;

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
