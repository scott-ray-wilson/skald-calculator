import { Handle, NodeProps, Position } from "reactflow";
import { Button, PressEvent } from "react-aria-components";
import { cn } from "@/components/utils";
import { FEAT_MAP } from "@/resources";
import { useFeatsPanel, usePartyLoadout } from "@/stores";
import { useModifyFeatRanks } from "@/hooks";

export interface FeatNodeProps extends NodeProps {}

export const FeatNode = (node: FeatNodeProps) => {
  const feat = FEAT_MAP.get(node.id);
  const { setActiveFeatId, activeFeatId } = useFeatsPanel();

  const { selectedPartyMember } = usePartyLoadout();

  if (!feat) throw new Error(`Missing Feat Data: ${feat}`);

  const { isLocked, DialogComponent, incrementFeat, decrementFeat } =
    useModifyFeatRanks(feat);

  const allocatedRanks = selectedPartyMember.feats.getAllocatedRanks(feat.id);

  const { title, tier } = feat;

  const segments = title.split(" ").filter((seg) => !!seg);
  const firstSeg = segments[0];
  const secondSeg = segments[segments.length - 1];
  let trackedRanks = 0;

  const isActive = activeFeatId === node.id;

  const handlePress = (e: PressEvent) => {
    const maxOut = e.ctrlKey;

    if (!isActive) {
      setActiveFeatId(node.id);
      return;
    }

    if (e.shiftKey) {
      decrementFeat(maxOut);
      return;
    }

    incrementFeat(maxOut);
  };

  return (
    <>
      {DialogComponent}
      <Button
        onPress={handlePress}
        className={({ isHovered, isPressed, isFocused }) =>
          cn(
            `relative aspect-square h-[3.2rem] w-[3.2rem] rounded-sm border-[3px] border-dark-gray focus:outline-none focus:ring-0`,
            {
              "border-light-gray": isHovered,
              "border-lime": isFocused,
              "border-yellow": isActive,
              "border-white": isPressed,
              "opacity-75": isLocked,
            },
          )
        }
      >
        <div className={`absolute -left-[8px] top-[0.5px] flex flex-col gap-1`}>
          {feat.list.map(({ rank, id }) => {
            const prevTicks = trackedRanks;
            trackedRanks += rank - prevTicks;
            return (
              <div key={id}>
                {Array.from(Array(rank - prevTicks)).map((_, index) => (
                  <div
                    className={`h-[6px] w-[8px] border border-black ${allocatedRanks > index + prevTicks ? (allocatedRanks >= rank ? "bg-green" : "bg-yellow") : "bg-light-gray"}`}
                    key={id + index}
                  ></div>
                ))}
              </div>
            );
          })}
        </div>
        <div
          className={cn(
            `h-full w-full cursor-pointer border-[3px] bg-dark-gray`,
            {
              "border-red": feat.type === "ClassSpecific",
              "border-indigo": feat.type === "Combat",
              "border-blue": feat.type === "Magic",
              "border-light-gray": feat.type === "ClassGeneral",
            },
          )}
        >
          <div
            className={`grid h-full w-full cursor-pointer place-items-center border border-black text-lg`}
          >
            {isLocked ? (
              <svg
                fill="none"
                className={`text-light-gray`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={32}
                height={32}
              >
                <path
                  d="M15 2H9v2H7v4H4v14h16V8h-3V4h-2V2zm0 2v4H9V4h6zm-6 6h9v10H6V10h3zm4 3h-2v4h2v-4z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <>
                <span className={`capitalize leading-[1px] text-white`}>
                  {firstSeg.substring(0, 2)}
                </span>
                {segments.length > 1 ? (
                  <span className={`-mt-1 capitalize leading-[1px] text-white`}>
                    {secondSeg.substring(0, 2)}
                  </span>
                ) : null}
              </>
            )}
          </div>
        </div>
        {tier ? (
          <span
            className={`absolute -bottom-[0.6rem] right-[0.3rem] text-yellow ${tier < 4 ? "[letter-spacing:-6px]" : "[letter-spacing:-2px]"}`}
          >
            {ROMAN_NUMERAL_MAP.get(tier) ?? "??"}
          </span>
        ) : null}
        <Handle
          tabIndex={-1}
          type="target"
          position={Position.Top}
          className="cursor-pointer opacity-0"
        />
        <Handle
          tabIndex={-1}
          type="source"
          position={Position.Bottom}
          className="cursor-pointer opacity-0"
        />
      </Button>
    </>
  );
};

const ROMAN_NUMERAL_MAP = new Map([
  [0, ""],
  [1, "I"],
  [2, "II"],
  [3, "III"],
  [4, "IV"],
  [5, "V"],
  [6, "VI"],
]);
