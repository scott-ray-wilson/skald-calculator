import { usePartyLoadout } from "@/stores";
import {
  ClearPartyMembersButton,
  EmptyPartyMemberSlotButton,
  PartyMemberButton,
} from "@/components/calc";

export const PartyMembers = () => {
  const { getPartyMembers } = usePartyLoadout();

  return (
    <div
      className={`flex flex-col gap-1.5 lg:mt-[24px] w-min sm:ml-0 md:ml-4 lg:ml-0 mr-auto`}
    >
      <span className={`text-white`}>Party:</span>
      <div className={`flex lg:flex-col gap-1.5 lg:gap-2 items-start`}>
        <div
          className={`flex lg:flex-col gap-1 shadow-[-3px_3px_0px] shadow-olive rounded-sm h-min bg-brown p-1`}
        >
          {getPartyMembers().map((partyMember, index) =>
            partyMember ? (
              <PartyMemberButton
                key={`slot-${index}`}
                partyMember={partyMember}
                partyMemberIndex={index}
              />
            ) : (
              <EmptyPartyMemberSlotButton
                key={`slot-${index}`}
                partyMemberIndex={index}
              />
            ),
          )}
        </div>
        <ClearPartyMembersButton />
      </div>
    </div>
  );
};
