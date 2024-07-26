import { PRIMARY_ATTRIBUTE_LIST, SKILL_MAP } from "@/resources";
import { Keyword, Paragraph } from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import { EncumberanceDetails } from "@/components/calc";

type SkillDescriptionProps = {
  skillId: string;
};

export const SkillDescription = ({ skillId }: SkillDescriptionProps) => {
  const { selectedPartyMember } = usePartyLoadout();

  const skill = SKILL_MAP.get(skillId);

  if (!skill) throw new Error(`Missing Skill: ${skillId}`);

  const ranks = selectedPartyMember.skills.getAllocatedRanks(skillId);

  const total = selectedPartyMember.skills.getCalculatedRanks(skillId);

  const modifyingAttributes = PRIMARY_ATTRIBUTE_LIST.filter((attribute) =>
    attribute.influences.includes(skillId),
  );

  const abilitiesBonus =
    selectedPartyMember.getBackgroundBonus(skillId) +
    selectedPartyMember.feats.getAttributeBonus(skillId);

  const { description, title, rootFactorPercentage } = skill;

  return (
    <>
      <span className={"text-blue uppercase text-lg"}>{title}</span>
      <Paragraph ignoreIds={[skillId]} className={"text-yellow"}>
        {description}
      </Paragraph>
      <EncumberanceDetails attributeId={skillId} />
      <div className={`flex w-40 flex-col`}>
        {[
          { label: "Ranks", value: ranks, isKeyword: false },
          {
            label: "Abilities",
            value: abilitiesBonus,
            isKeyword: false,
          },
          ...modifyingAttributes.map((attribute) => ({
            label: attribute.title,
            value:
              selectedPartyMember.primaryAttributes.getCalculatedRanks(
                attribute.id,
              ) *
              (rootFactorPercentage / 100),
            isKeyword: true,
          })),
          { label: "TOTAL", value: total, isKeyword: false },
        ]
          .filter(({ value }) => value > 0)
          .map(({ label, value, isKeyword }) => (
            <div key={label} className={"w-full flex justify-between"}>
              {isKeyword ? (
                <Keyword>{label}</Keyword>
              ) : (
                <span className={"text-light-gray"}>{label}</span>
              )}
              <span className={"text-white"}>
                {label.match(/TOTAL|Ranks/) ? "" : "+"}
                {value}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};
