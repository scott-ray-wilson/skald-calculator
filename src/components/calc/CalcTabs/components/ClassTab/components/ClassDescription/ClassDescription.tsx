import { DescriptionContainer, Keyword, Paragraph } from "@/components/generic";
import { GAME_METADATA } from "@/resources";
import { concatenateText } from "@/components/utils";
import { usePartyLoadout } from "@/stores";

export const ClassDescription = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const characterClass = selectedPartyMember.getClass();
  const archetypeClass = selectedPartyMember.getArchetypeClass();
  const mainAttribute = selectedPartyMember.getMainAttribute();

  const allowedArmors = [
    ...characterClass.allowedArmors,
    ...archetypeClass.allowedArmors,
  ];

  const allowedWeaponWeights = [
    ...characterClass.allowedWeaponWeights,
    ...archetypeClass.allowedWeaponWeights,
  ];

  const allowedWeaponTypes = [
    ...characterClass.allowedWeaponTypes,
    ...archetypeClass.allowedWeaponTypes,
  ];

  return (
    <DescriptionContainer className={`flex-[3]`} nextTab={"background"}>
      <span className={`uppercase text-blue text-lg`}>
        {characterClass.title}
      </span>
      <div className={`flex  flex-wrap gap-2`}>
        <span className={"text-light-gray"}>Archetype</span>{" "}
        <Keyword className={`capitalize`}>{archetypeClass.title}</Keyword>
      </div>
      <Paragraph className={`text-yellow`}>
        {characterClass.description}
      </Paragraph>
      <p className={`text-yellow`}>
        The <Keyword>Main Attribute</Keyword> for this Class is{" "}
        <Keyword>{mainAttribute.split("_")[1]}</Keyword>.
      </p>
      <div className={`flex w-40 flex-col`}>
        {[
          {
            label: "Start. DP",
            value: characterClass.bonusDP + GAME_METADATA.startingDP,
          },
          {
            label: "HP/Lvl",
            value: `+${characterClass.levelUpHP + archetypeClass.levelUpHP}`,
          },
          {
            label: "Magic/Lvl",
            value: `+${characterClass.levelUpSP + archetypeClass.levelUpSP}`,
          },
        ].map(({ label, value }, index) => (
          <div key={index} className={"w-full flex justify-between"}>
            <Keyword>{label}</Keyword>
            <span className={`text-white`}>{value}</span>
          </div>
        ))}
      </div>
      <p className={`text-light-gray`}>
        {allowedArmors.length ? (
          <>
            May wear{" "}
            {allowedArmors.length >= 3
              ? "any "
              : concatenateText(allowedArmors) + " "}
            armor.
          </>
        ) : (
          "May not wear armor."
        )}
      </p>
      <p className={`text-light-gray`}>
        May use{" "}
        {allowedWeaponWeights.length >= 3
          ? "all "
          : concatenateText(allowedWeaponWeights) + " "}
        weapons of type {concatenateText(allowedWeaponTypes)}.
      </p>
    </DescriptionContainer>
  );
};
