import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponent } from "@/components/generic";
import { importPartyLoadOut, INITIAL_CUSTOM_CHARACTER_STATE } from "@/stores";
import { CalcPanel } from "@/components/calc";
import { PLAYER_PORTRAIT_LIST } from "@/resources";

export const Route = createFileRoute("/calc/")({
  // support old build links using query param
  validateSearch: (search: Record<string, unknown>): { build?: string } => {
    return search;
  },
  loaderDeps: ({ search: { build } }) => ({ build }),
  loader: async ({ deps: { build } }) => {
    if (!build) return;

    try {
      const { primaryAttributes, level, skills, feats, classId, backgroundId } =
        JSON.parse(atob(build));

      importPartyLoadOut([
        {
          ...INITIAL_CUSTOM_CHARACTER_STATE,
          primaryAttributes,
          skills,
          feats,
          classId,
          backgroundId,
          level,
          category: "main",
          portrait: PLAYER_PORTRAIT_LIST[10].id,
        },
        null,
        null,
        null,
        null,
        null,
      ]);
    } catch (e) {
      // do nothing, just load default config
      // TODO: display error to user
      console.error(e);
    }
  },
  pendingComponent: LoadingComponent,
  component: CalcPanel,
});
