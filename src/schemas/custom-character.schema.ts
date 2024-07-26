import type { JSONSchema } from "json-schema-to-ts";
import {
  FeatsSchema,
  LevelSchema,
  PrimaryAttributesSchema,
  SkillsSchema,
} from "@/schemas";

const CustomCharacterRequired = [
  "classId",
  "backgroundId",
  "feats",
  "level",
  "portrait",
  "primaryAttributes",
  "skills",
  "category",
] as const;

const CustomCharacterProperties = {
  classId: {
    type: "string",
  },
  backgroundId: {
    type: "string",
  },
  feats: FeatsSchema,
  portrait: {
    type: "string",
  },
  level: LevelSchema,
  primaryAttributes: PrimaryAttributesSchema,
  skills: SkillsSchema,
} as const;

export const MainCharacterSchema = {
  type: "object",
  required: CustomCharacterRequired,
  additionalProperties: false,
  properties: {
    category: {
      type: "string",
      enum: ["main"],
    },
    ...CustomCharacterProperties,
  },
} as const satisfies JSONSchema;

export const MercenaryCharacterSchema = {
  type: "object",
  required: CustomCharacterRequired,
  additionalProperties: false,
  properties: {
    category: {
      type: "string",
      enum: ["mercenary"],
    },
    ...CustomCharacterProperties,
  },
} as const satisfies JSONSchema;
