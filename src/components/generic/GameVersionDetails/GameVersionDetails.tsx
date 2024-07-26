import { GAME_METADATA } from "@/resources";

export const GameVersionDetails = () => (
  <span className={`mr-1.5 mt-1.5 self-end text-xs text-dark-gray`}>
    Game Version: {GAME_METADATA.version}
  </span>
);
