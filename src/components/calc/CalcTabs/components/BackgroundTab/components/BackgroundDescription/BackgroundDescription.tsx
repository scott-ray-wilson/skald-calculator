import { DescriptionContainer, Keyword, Paragraph } from "@/components/generic";
import { usePartyLoadout } from "@/stores";

export const BackgroundDescription = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const { title, description } = selectedPartyMember.getBackground();
  const backgroundAbilities = selectedPartyMember.getBackgroundAbilities();

  return (
    <DescriptionContainer
      className={`flex-[3]`}
      prevTab={"class"}
      nextTab={"attributes"}
    >
      <span className={`uppercase text-blue text-lg`}>{title}</span>
      <Paragraph className={`text-yellow`}>{description}</Paragraph>
      {backgroundAbilities.map((ability) => {
        return ability.bonusAttributes.map((bonus) => {
          return (
            <div key={ability.id + bonus.id} className={`gap-2 flex`}>
              <span
                className={"text-yellow"}
              >{`+${ability.bonusMagnitude}${bonus.suffixCharacter}`}</span>
              <Keyword className={`capitalize`}>{bonus.title}</Keyword>
            </div>
          );
        });
      })}
    </DescriptionContainer>
  );
};
