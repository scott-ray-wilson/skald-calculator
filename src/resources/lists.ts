// Abilities
import ADDITION_ABILITY_LIST from "@/resources/extracts/additionAbility.extract.json";
import COMBAT_MANEUVER_LIST from "@/resources/extracts/combatManeuver.extract.json";
import SPELL_LIST from "@/resources/extracts/spell.extract.json";
import TRIGGERED_ABILITY_LIST from "@/resources/extracts/triggeredAbility.extract.json";

// Attributes
import ARMOR_BONUS_LIST from "@/resources/extracts/armorBonuses.extract.json";
import COMBAT_ATTRIBUTE_LIST from "@/resources/extracts/combatAttributes.extract.json";
import DAMAGE_BONUS_LIST from "@/resources/extracts/damageBonuses.extract.json";
import DAMAGE_RESISTANCE_LIST from "@/resources/extracts/damageResistances.extract.json";
import CONDITION_RESISTANCE_LIST from "@/resources/extracts/conditionResistances.extract.json";
import DEFENCE_ATTRIBUTE_LIST from "@/resources/extracts/defences.extract.json";
import HIT_BONUS_LIST from "@/resources/extracts/hitBonuses.extract.json";
import MAGIC_ATTRIBUTE_LIST from "@/resources/extracts/magicAttributes.extract.json";
import MAGIC_SCHOOL_LIST from "@/resources/extracts/magicSchools.extract.json";
import PRIMARY_ATTRIBUTE_LIST from "@/resources/extracts/primaryAttributes.extract.json";
import SECONDARY_ATTRIBUTE_LIST from "@/resources/extracts/secondaryAttributes.extract.json";
import SECONDARY_COMBAT_ATTRIBUTE_LIST from "@/resources/extracts/secCombatAttributes.extract.json";
import SKILL_LIST from "@/resources/extracts/skills.extract.json";

// Backgrounds
import BACKGROUND_LIST from "@/resources/extracts/background.extract.json";

// Characters
import CHARACTER_LIST from "@/resources/extracts/uniqueHumanoids.extract.json";
import MONSTER_LIST from "@/resources/extracts/monsters.extract.json";

// Classes
import CLASS_LIST from "@/resources/extracts/class.extract.json";
import ARCHETYPE_CLASS_LIST from "@/resources/extracts/archetypeClass.extract.json";

// Conditions
import MAGICAL_CONDITION_LIST from "@/resources/extracts/magicalConditions.extract.json";
import NATURAL_CONDITION_LIST from "@/resources/extracts/naturalConditions.extract.json";
import TACTICAL_CONDITION_LIST from "@/resources/extracts/tacticalConditions.extract.json";

// Effects
import CURSE_EFFECT_LIST from "@/resources/extracts/curseEffect.extract.json";
import DAMAGE_EFFECT_LIST from "@/resources/extracts/damageEffect.extract.json";
import GENERAL_EFFECT_LIST from "@/resources/extracts/generalEffect.extract.json";
import HEALING_EFFECT_LIST from "@/resources/extracts/healingEffect.extract.json";

// Feats
import CLERIC_FEAT_LIST from "@/resources/extracts/clericFeats.extract.json";
import MAGOS_FEAT_LIST from "@/resources/extracts/magosFeats.extract.json";
import ROGUE_FEAT_LIST from "@/resources/extracts/rogueFeats.extract.json";
import WANDERER_FEAT_LIST from "@/resources/extracts/wandererFeats.extract.json";
import WARRIOR_FEAT_LIST from "@/resources/extracts/warriorFeats.extract.json";

// Recipes
import ALCHEMY_RECIPE_LIST from "@/resources/extracts/alchemyRecipes.extract.json";
import FOOD_RECIPE_LIST from "@/resources/extracts/foodRecipes.extract.json";

// Enchants
import ACCESSORY_ENCHANTMENT_LIST from "@/resources/extracts/accessoryEnchantment.extract.json";
import ARMOR_ENCHANTMENT_LIST from "@/resources/extracts/armorEnchantment.extract.json";
import GENERAL_ENCHANTMENT_LIST from "@/resources/extracts/generalEnchantment.extract.json";
import JEWELRY_ENCHANTMENT_LIST from "@/resources/extracts/jewelryEnchantment.extract.json";
import SHIELD_ENCHANTMENT_LIST from "@/resources/extracts/shieldEnchantment.extract.json";
import WEAPON_ENCHANTMENT_LIST from "@/resources/extracts/weaponEnchantment.extract.json";

// Items
import ACCESSORY_LIST from "@/resources/extracts/accessories.extract.json";
import ADVENTURING_ITEM_LIST from "@/resources/extracts/adventuringItems.extract.json";
import MISC_ITEM_LIST from "@/resources/extracts/miscItems.extract.json";
import KEY_LIST from "@/resources/extracts/keys.extract.json";
import TRINKET_LIST from "@/resources/extracts/trinkets.extract.json";
import AMMO_LIST from "@/resources/extracts/ammo.extract.json";
import ARMOR_LIST from "@/resources/extracts/armor.extract.json";
import BOOK_LIST from "@/resources/extracts/books.extract.json";
import CONSUMABLE_LIST from "@/resources/extracts/consumeables.extract.json";
import FOOD_LIST from "@/resources/extracts/foods.extract.json";
import JEWELRY_LIST from "@/resources/extracts/jewelry.extract.json";
import MELEE_WEAPON_LIST from "@/resources/extracts/meleeWeapons.extract.json";
import RANGED_WEAPON_LIST from "@/resources/extracts/rangedWeapons.extract.json";
import REAGENT_LIST from "@/resources/extracts/reagents.extract.json";
import SHIELD_LIST from "@/resources/extracts/shields.extract.json";

// Tooltips
import RULES_TOOLTIP_LIST from "@/resources/extracts/rulesTooltips.extract.json";

// Portraits
import Male1Image from "@/assets/sprites/portraits/Male1.png";
import Male2Image from "@/assets/sprites/portraits/Male2.png";
import Male3Image from "@/assets/sprites/portraits/Male3.png";
import Male4Image from "@/assets/sprites/portraits/Male4.png";
import Male5Image from "@/assets/sprites/portraits/Male5.png";
import Male6Image from "@/assets/sprites/portraits/Male6.png";
import Male7Image from "@/assets/sprites/portraits/Male7.png";
import Male8Image from "@/assets/sprites/portraits/Male8.png";
import Male9Image from "@/assets/sprites/portraits/Male9.png";
import Male10Image from "@/assets/sprites/portraits/Male10.png";
import Male11Image from "@/assets/sprites/portraits/Male11.png";
import Female1Image from "@/assets/sprites/portraits/Female1.png";
import Female2Image from "@/assets/sprites/portraits/Female2.png";
import Female3Image from "@/assets/sprites/portraits/Female3.png";
import Female4Image from "@/assets/sprites/portraits/Female4.png";
import Female5Image from "@/assets/sprites/portraits/Female5.png";
import Female6Image from "@/assets/sprites/portraits/Female6.png";
import Female7Image from "@/assets/sprites/portraits/Female7.png";
import Female8Image from "@/assets/sprites/portraits/Female8.png";
import Female9Image from "@/assets/sprites/portraits/Female9.png";
import Female10Image from "@/assets/sprites/portraits/Female10.png";

// Combined Lists
const COMBINED_ABILITY_LIST = [
  ...ADDITION_ABILITY_LIST,
  ...COMBAT_MANEUVER_LIST,
  ...SPELL_LIST,
  ...TRIGGERED_ABILITY_LIST,
];

const COMBINED_ATTRIBUTES_LIST = [
  ...ARMOR_BONUS_LIST,
  ...COMBAT_ATTRIBUTE_LIST,
  ...DAMAGE_BONUS_LIST,
  ...DEFENCE_ATTRIBUTE_LIST,
  ...DAMAGE_RESISTANCE_LIST,
  ...CONDITION_RESISTANCE_LIST,
  ...HIT_BONUS_LIST,
  ...MAGIC_ATTRIBUTE_LIST,
  ...MAGIC_SCHOOL_LIST,
  ...PRIMARY_ATTRIBUTE_LIST,
  ...SECONDARY_COMBAT_ATTRIBUTE_LIST,
  ...SECONDARY_ATTRIBUTE_LIST,
  ...SKILL_LIST,
];

const COMBINED_CONDITION_LIST = [
  ...MAGICAL_CONDITION_LIST,
  ...NATURAL_CONDITION_LIST,
  ...TACTICAL_CONDITION_LIST,
];

const COMBINED_EFFECT_LIST = [
  ...HEALING_EFFECT_LIST,
  ...DAMAGE_EFFECT_LIST,
  ...GENERAL_EFFECT_LIST,
  ...CURSE_EFFECT_LIST,
];

const COMBINED_ENCHANTMENT_LIST = [
  ...ARMOR_ENCHANTMENT_LIST,
  ...ACCESSORY_ENCHANTMENT_LIST,
  ...ARMOR_ENCHANTMENT_LIST,
  ...GENERAL_ENCHANTMENT_LIST,
  ...JEWELRY_ENCHANTMENT_LIST,
  ...SHIELD_ENCHANTMENT_LIST,
  ...WEAPON_ENCHANTMENT_LIST,
];

const COMBINED_WEAPON_LIST = [...MELEE_WEAPON_LIST, ...RANGED_WEAPON_LIST];

const COMBINED_ADVENTURING_ITEMS_LIST = [
  ...ADVENTURING_ITEM_LIST,
  ...BOOK_LIST,
  ...ALCHEMY_RECIPE_LIST.map((recipe) => ({
    ...recipe,
    imagePath: "BookRecipe2",
    value: 5,
    weight: 1,
  })),
  ...FOOD_RECIPE_LIST.map((recipe) => ({
    ...recipe,
    imagePath: "BookRecipe1",
    value: 5,
    weight: 1,
  })),
  ...MISC_ITEM_LIST,
  ...KEY_LIST,
  ...REAGENT_LIST,
];

const COMBINED_CONSUMABLES_LIST = [
  ...CONSUMABLE_LIST,
  ...SPELL_LIST.map((spell) => {
    let value: string;
    switch (spell.tier) {
      case 1:
        value = "200";
        break;
      case 2:
        value = "400";
        break;
      case 3:
        value = "800";
        break;
      case 4:
        value = "1600";
        break;
      default:
        value = "????";
    }

    return {
      ...spell,
      imagePath: `BookSpellTome${spell.school.some((school) => ["ATT_SpellListEarth", "ATT_SpellListFire", "ATT_SpellListAir"].includes(school)) ? "Arcane" : "Divine"}${spell.tier}`,
      weight: 1,
      value,
    };
  }),
];

const COMBINED_ITEM_LIST = [
  ...COMBINED_WEAPON_LIST,
  ...AMMO_LIST,
  ...ARMOR_LIST,
  ...SHIELD_LIST,
  ...ACCESSORY_LIST,
  ...JEWELRY_LIST,
  ...COMBINED_CONSUMABLES_LIST,
  ...FOOD_LIST,
  ...COMBINED_ADVENTURING_ITEMS_LIST,
  ...TRINKET_LIST,
];

const COMBINED_RECIPE_LIST = [...FOOD_RECIPE_LIST, ...ALCHEMY_RECIPE_LIST];

const PLAYER_PORTRAIT_LIST = [
  { id: "Female1", portrait: Female1Image },
  { id: "Female2", portrait: Female2Image },
  { id: "Female3", portrait: Female3Image },
  { id: "Female4", portrait: Female4Image },
  { id: "Female5", portrait: Female5Image },
  { id: "Female6", portrait: Female6Image },
  { id: "Female7", portrait: Female7Image },
  { id: "Female8", portrait: Female8Image },
  { id: "Female9", portrait: Female9Image },
  { id: "Female10", portrait: Female10Image },
  { id: "Male1", portrait: Male1Image },
  { id: "Male2", portrait: Male2Image },
  { id: "Male3", portrait: Male3Image },
  { id: "Male4", portrait: Male4Image },
  { id: "Male5", portrait: Male5Image },
  { id: "Male6", portrait: Male6Image },
  { id: "Male7", portrait: Male7Image },
  { id: "Male8", portrait: Male8Image },
  { id: "Male9", portrait: Male9Image },
  { id: "Male10", portrait: Male10Image },
  { id: "Male11", portrait: Male11Image },
];

export {
  ACCESSORY_ENCHANTMENT_LIST,
  ACCESSORY_LIST,
  ADDITION_ABILITY_LIST,
  ADVENTURING_ITEM_LIST,
  ALCHEMY_RECIPE_LIST,
  AMMO_LIST,
  ARCHETYPE_CLASS_LIST,
  ARMOR_ENCHANTMENT_LIST,
  ARMOR_BONUS_LIST,
  ARMOR_LIST,
  BACKGROUND_LIST,
  CHARACTER_LIST,
  CLASS_LIST,
  CLERIC_FEAT_LIST,
  COMBAT_ATTRIBUTE_LIST,
  COMBAT_MANEUVER_LIST,
  COMBINED_ABILITY_LIST,
  COMBINED_ADVENTURING_ITEMS_LIST,
  COMBINED_ATTRIBUTES_LIST,
  COMBINED_CONDITION_LIST,
  COMBINED_CONSUMABLES_LIST,
  COMBINED_EFFECT_LIST,
  COMBINED_ENCHANTMENT_LIST,
  COMBINED_ITEM_LIST,
  COMBINED_RECIPE_LIST,
  COMBINED_WEAPON_LIST,
  CONSUMABLE_LIST,
  CURSE_EFFECT_LIST,
  CONDITION_RESISTANCE_LIST,
  DAMAGE_BONUS_LIST,
  DAMAGE_EFFECT_LIST,
  DAMAGE_RESISTANCE_LIST,
  DEFENCE_ATTRIBUTE_LIST,
  FOOD_RECIPE_LIST,
  FOOD_LIST,
  GENERAL_EFFECT_LIST,
  GENERAL_ENCHANTMENT_LIST,
  HEALING_EFFECT_LIST,
  HIT_BONUS_LIST,
  JEWELRY_ENCHANTMENT_LIST,
  JEWELRY_LIST,
  KEY_LIST,
  MAGIC_ATTRIBUTE_LIST,
  MAGICAL_CONDITION_LIST,
  MAGIC_SCHOOL_LIST,
  MAGOS_FEAT_LIST,
  MISC_ITEM_LIST,
  MONSTER_LIST,
  NATURAL_CONDITION_LIST,
  PLAYER_PORTRAIT_LIST,
  PRIMARY_ATTRIBUTE_LIST,
  REAGENT_LIST,
  ROGUE_FEAT_LIST,
  RULES_TOOLTIP_LIST,
  SECONDARY_ATTRIBUTE_LIST,
  SECONDARY_COMBAT_ATTRIBUTE_LIST,
  SHIELD_ENCHANTMENT_LIST,
  SHIELD_LIST,
  SKILL_LIST,
  SPELL_LIST,
  TACTICAL_CONDITION_LIST,
  TRIGGERED_ABILITY_LIST,
  TRINKET_LIST,
  WANDERER_FEAT_LIST,
  WARRIOR_FEAT_LIST,
  WEAPON_ENCHANTMENT_LIST,
};
