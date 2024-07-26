import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponent } from "@/components/generic";
import { supabase } from "@/lib/supabase";
import { importPartyLoadOut } from "@/stores";
import { PartyLoadoutSchemaType } from "@/schemas";
import { CalcPanel } from "@/components/calc";

export const Route = createFileRoute("/calc/$partyLoadoutId")({
  loader: async ({ params: { partyLoadoutId } }) => {
    try {
      const { data, error } = await supabase
        .from("party_loadouts")
        .select("*")
        .eq("id", partyLoadoutId)
        .single();

      if (error) {
        // TODO: display error to user
        console.error(error);
        return null;
      }

      importPartyLoadOut(data.loadout as PartyLoadoutSchemaType);

      return data;
    } catch (e) {
      // TODO: display error to user
      console.error(e);
      return null;
    }
  },
  pendingComponent: LoadingComponent,
  component: CalcPanel,
});
