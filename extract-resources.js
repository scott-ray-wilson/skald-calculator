import gameData from "./SkaldProject.json" assert { type: "json" };
import fs from "fs";
import _ from "lodash";

/*
 *  Script to extract resources from game files (not commited)
 */

const formatJSON = (obj) => JSON.stringify(obj, null, 4);

const formatFilename = (key) => _.lowerFirst(key.replace(/Container|\s/, ""));

const writeFile = (name, obj) =>
  fs.writeFileSync(
    `src/resources/extracts/${formatFilename(name)}.extract.json`,
    formatJSON(obj),
  );

const extractContainers = (
  containers,
  containerKeys,
  filterFunc = () => true,
  appendFileName = "",
) =>
  Object.entries(_.pick(containers, containerKeys)).forEach(
    ([key, container]) =>
      writeFile(
        key + appendFileName,
        _.orderBy(
          container.list
            .map((item) => ({
              container: key,
              ...item,
            }))
            .filter((item) => filterFunc(item)),
          ["slot", "slotJewelry", "powerLevel", "title"],
          ["asc", "desc", "asc", "asc"],
        ),
      ),
  );

// game metadata
writeFile(
  "metadata",
  _.pick(gameData.metaData, ["startingDP", "levelUpDP", "maxLevel", "version"]),
);

// classes
extractContainers(
  gameData.classContainers,
  ["classContainer", "archetypeClassContainer"],
  (item) => item.selectable && !item.hidden,
);

// backgrounds
extractContainers(
  gameData.backgroundContainers,
  ["backgrounContainer"], // typo is present in game files
  (item) => item.selectable && !item.hidden,
  "d", // correct typo
);

// characters / monsters (for summons)
extractContainers(
  gameData.characterContainer,
  ["monsters", "uniqueHumanoids"],
  (item) =>
    // only getting party members if unique, otherwise get all monsters
    item.container === "uniqueHumanoids"
      ? item.recruitable &&
        !item.mercenary &&
        !item.id.match(/CHA_Tycho|CHA_Main/) // ignore main character and unused character
      : true,
);

// feats
extractContainers(gameData.featContainers, [
  "warriorFeatsContainer",
  "magosFeatsContainer",
  "clericFeatsContainer",
  "wandererFeatsContainer",
  "rogueFeatsContainer",
]);

// abilities
extractContainers(gameData.abilityContainers, [
  "additionAbilityContainer",
  "combatManeuverContainer",
  "spellContainer",
  "triggeredAbilityContainer",
]);

// effects
extractContainers(gameData.effectContainers, [
  "generalEffectContainer",
  "damageEffectContainer",
  "healingEffectContainer",
  "curseEffectContainer",
]);

// conditions
extractContainers(gameData.conditionContainers, [
  "naturalConditions",
  "tacticalConditions",
  "magicalConditions",
]);

// tooltips
gameData.encylopediaContainer.tooltipContainer.list.forEach((group) => {
  // skip rules container for now, not using
  if (!["Rules"].includes(group.id)) return;

  writeFile(
    group.id + "Tooltips",
    group.list.map((item) => item),
  );
});

// recipes
extractContainers(gameData.recipeContainers, ["foodRecipes", "alchemyRecipes"]);

// enchantments
extractContainers(gameData.enchantmentContainers, [
  "weaponEnchantmentContainer",
  "armorEnchantmentContainer",
  "shieldEnchantmentContainer",
  "accessoryEnchantmentContainer",
  "jewelryEnchantmentContainer",
  "generalEnchantmentContainer",
]);

// items
extractContainers(gameData.itemContainer, [
  "meleeWeapons",
  "rangedWeapons",
  "ammoContainer",
  "armor",
  // "tomes", skip - empty, created from spells
  "accessories",
  "shields",
  "clothing",
  "miscItems",
  "reagents",
  "foods",
  "consumeables", // typo present in game files
  "adventuringItems",
  "trinkets",
  "jewelry",
  "gems",
  "books",
  // "recipes", skip - empty, created from food/consumables
  "keys",
  "idleItems",
]);

// attributes
gameData.data.attributeData.list.forEach((attribute) => {
  // don't need to get all attributes at this point
  if (
    ![
      "PrimaryAttributes",
      "MagicAttributes",
      "Secondary Attributes",
      "SecCombatAttributes",
      "Combat Attributes",
      "DamageBonuses",
      "DamageResistances",
      "ConditionResistances",
      "Defences",
      "Skills",
      "Armor",
      "HitBonuses",
      "MagicSchools",
    ].includes(attribute.id)
  )
    return;

  writeFile(
    // avoids overwriting armor items container
    attribute.id === "Armor" ? "ArmorBonuses" : attribute.id,
    _.orderBy(
      attribute.list.map((item) => {
        const spellTierMap = new Map();

        // makes looking up spells by tier more efficient
        if (item.attributeType === "Magic") {
          gameData.abilityContainers.spellContainer.list
            .filter((s) => s.school.includes(item.id))
            .forEach((spell) => {
              const currentValue = spellTierMap.get(spell.tier) ?? [];
              spellTierMap.set(spell.tier, [...currentValue, spell.id]);
            });
        }

        return {
          ...item,
          influences: gameData.data.attributeData.list
            .flatMap((g) => g.list)
            .filter((a) => a.rootAbility === item.id)
            .map((a) => a.id),
          spellTiers: _.orderBy(
            [...spellTierMap.entries()].map(([tier, spellIds]) => ({
              tier,
              spellIds,
            })),
            "tier",
          ),
        };
      }),
      "title",
    ),
  );
});
