import {
  DescriptionContainer,
  Keyword,
  Paragraph,
  StatButton,
} from "@/components/generic";
import {
  COMBINED_ABILITY_MAP,
  FEAT_MAP,
  MAGIC_SCHOOL_MAP,
  SPELL_MAP,
} from "@/resources";
import { useFeatsPanel, usePartyLoadout } from "@/stores";
import { useModifyFeatRanks } from "@/hooks";

const IS_APPLE: boolean = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

const MODIFIER_KEY = IS_APPLE ? "Cmd" : "Ctrl";

export const FeatDescription = () => {
  const { activeFeatId } = useFeatsPanel();
  const { selectedPartyMember } = usePartyLoadout();

  return (
    <DescriptionContainer
      buttonContainerClassName={`mt-0`}
      className={`flex-[1.2]`}
      prevTab={"attributes"}
    >
      {activeFeatId ? (
        <FeatDetails featId={activeFeatId} />
      ) : (
        <>
          <Paragraph className={`text-yellow`}>
            These are the Feats derived from your class. Distribute your
            Development Points in them to gain benefits and new Abilities.
          </Paragraph>
          {[
            ...selectedPartyMember.getClass().featsList,
            ...selectedPartyMember.getArchetypeClass().featsList,
          ].some((featId) => featId.includes("Magic")) ? (
            <p className={`text-yellow`}>
              To gain spellcasting abilities, you must purchase ranks in the
              relevant (cyan) Feat-tree. More spells can be learned by studying
              spell-tomes that you acquire as you adventure.
            </p>
          ) : null}
        </>
      )}
      <div
        className={`text-xs mt-auto mx-auto max-w-sm w-full hidden md:flex flex-col gap-0.5 bg-dark-gray px-2 py-1 border-blue border-2 bg shadow-[-3px_3px_0px_black] text-light-gray`}
      >
        <p>Click to Add Point</p>
        <p>Shift+Click to Remove Point</p>
        <p>{MODIFIER_KEY}+Click to Add Max Points</p>
        <p>{MODIFIER_KEY}+Shift+Click to Remove All</p>
      </div>
    </DescriptionContainer>
  );
};

const FeatDetails = ({ featId }: { featId: string }) => {
  const {
    selectedPartyMember: { feats },
  } = usePartyLoadout();

  const feat = FEAT_MAP.get(featId);

  if (!feat) throw new Error(`Invalid Feat ID: ${featId}`);

  const { incrementFeat, decrementFeat, isLocked, DialogComponent } =
    useModifyFeatRanks(feat);

  const allocatedRanks = feats.getAllocatedRanks(feat.id);

  const handleDecrement = () => decrementFeat();
  const handleIncrement = () => incrementFeat();

  return (
    <>
      <span className={`uppercase text-blue text-lg`}>{feat.title}</span>
      {feat.description ? (
        <span className={`text-yellow`}>{feat.description}</span>
      ) : null}
      <div className={`flex flex-wrap gap-2`}>
        <span className={"text-light-gray"}>Ranks:</span>{" "}
        <span className={`text-white`}>
          {allocatedRanks}/{Math.max(...feat.list.map((a) => a.rank))}
        </span>
        <div className={`md:hidden ml-1 flex gap-1.5`}>
          {DialogComponent}
          {isLocked ? null : (
            <>
              <StatButton operator={"minus"} onPress={handleDecrement} />
              <StatButton operator={"plus"} onPress={handleIncrement} />
            </>
          )}
        </div>
      </div>
      <div className={`flex flex-col flex-1 gap-8`}>
        {feat.list.map((tier) => {
          const rankIsActive = allocatedRanks >= tier.rank;

          const ArrowComponent = (
            <svg
              height={20}
              width={20}
              className={
                "inline-block absolute left-0 top-1 " +
                (rankIsActive ? `text-lime` : `text-yellow`)
              }
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z"
                fill="currentColor"
              />
            </svg>
          );

          const magicSchool = MAGIC_SCHOOL_MAP.get(tier.spellSchool);

          if (tier.spellSchool && !magicSchool)
            throw new Error(`Missing Magic School: ${tier.spellSchool}`);

          return (
            <div className={`flex text-lime flex-col`} key={tier.id}>
              <span className={rankIsActive ? `text-lime` : `text-yellow`}>
                {tier.rank} RANKS
              </span>
              {tier.abilities.map((abilityId) => {
                const ability = COMBINED_ABILITY_MAP.get(abilityId);

                if (!ability) throw new Error(`Missing Ability: ${abilityId}`);

                return (
                  <div key={abilityId} className={`flex relative flex-wrap`}>
                    {ArrowComponent}
                    <Keyword className={`text-left indent-6`}>
                      {ability.title}
                    </Keyword>
                  </div>
                );
              })}
              {magicSchool ? (
                <>
                  <div className={`flex relative flex-wrap`}>
                    {ArrowComponent}
                    <Paragraph className={`indent-6 text-yellow`}>
                      {`Learn ${tier.spellsAdded} new spells from the ${magicSchool.title}:`}
                    </Paragraph>
                  </div>
                  <div className={`mt-4 flex flex-col gap-4`}>
                    {magicSchool.spellTiers.map(({ tier, spellIds }) => {
                      return (
                        <div key={tier} className={`flex flex-col`}>
                          <span className={`text-white`}>TIER {tier}</span>
                          {spellIds.map((spellId) => {
                            const spell = SPELL_MAP.get(spellId);

                            if (!spell)
                              throw new Error(
                                `Missing Spell with ID: ${spellId}`,
                              );

                            return (
                              <Keyword key={spellId}>{spell.title}</Keyword>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
