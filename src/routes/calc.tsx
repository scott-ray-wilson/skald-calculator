import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponent } from "@/components/generic";
import { importPartyLoadOut } from "@/stores";
import { CalcPanel } from "@/components/calc";

export const Route = createFileRoute("/calc")({
  validateSearch: (search: Record<string, unknown>): { build?: string } => {
    return search;
  },
  loaderDeps: ({ search: { build } }) => ({ build }),
  loader: async ({ deps: { build } }) => {
    if (!build) return;

    try {
      console.log("atob", JSON.parse(atob(build)));
      importPartyLoadOut(JSON.parse(atob(build)));
    } catch (e) {
      // do nothing, just load default config
      // TODO: display error to user
      console.error(e);
    }
  },
  pendingComponent: LoadingComponent,
  component: CalcPanel,
});
