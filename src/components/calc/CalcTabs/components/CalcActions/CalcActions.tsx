import {
  CharacterLevelButtons,
  GenerateBuildLinkButton,
  ResetCalculatorButton,
} from "@/components/calc";

export const CalcActions = () => {
  return (
    <div
      className={`flex md:mb-0 mb-2 mr-1 md:ml-0 ml-1 flex-1 justify-between gap-3 items-center`}
    >
      <CharacterLevelButtons />
      <GenerateBuildLinkButton />
      <ResetCalculatorButton />
    </div>
  );
};
