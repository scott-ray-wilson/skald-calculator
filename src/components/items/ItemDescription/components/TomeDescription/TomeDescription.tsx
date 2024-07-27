import { MAGIC_SCHOOL_MAP, SPELL_MAP } from "@/resources";
import { Fragment } from "react";
import { CopyTextButton, Keyword } from "@/components/generic";

type TomeDescriptionProps = { spellId: string };

export const TomeDescription = ({ spellId }: TomeDescriptionProps) => {
  const spell = SPELL_MAP.get(spellId);

  if (!spell) throw new Error(`Invalid Spell ID: ${spellId}`);

  const { school, title, tier } = spell;

  let value: string;
  switch (tier) {
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

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>Tome: {title}</span>
        <div className={`-mt-1 flex flex-wrap gap-x-1`}>
          <span className={"leading-5 text-light-gray"}>[Tome]</span>
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          {
            title: "Value",
            value: `${value} GP`,
          },
          {
            title: "Weight",
            value: `1.00 lb`,
          },
        ].map(({ title, value }) => (
          <Fragment key={title}>
            <span className={"text-light-gray"}>{title}</span>
            <span className={`text-white`}>{value}</span>
          </Fragment>
        ))}
      </div>
      <div>
        <p className={`text-yellow`}>{`Read to learn the spell:`}</p>
        <Keyword>{title}</Keyword>
      </div>
      <div>
        <p
          className={`text-yellow`}
        >{`Requires ranks in one of the following schools:`}</p>
        {school.map((sch) => (
          <div key={sch}>
            <span className={"text-light-gray"}>Tier {tier}</span>{" "}
            <Keyword>{MAGIC_SCHOOL_MAP.get(sch)!.title}</Keyword>
          </div>
        ))}
      </div>
      <CopyTextButton className={`mt-auto`}>{spellId}</CopyTextButton>
    </>
  );
};
