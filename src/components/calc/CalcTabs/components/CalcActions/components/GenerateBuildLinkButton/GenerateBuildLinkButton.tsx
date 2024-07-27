import {
  GenericDialog,
  GenericTooltip,
  IconButton,
} from "@/components/generic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePartyLoadout } from "@/stores";
import copy from "copy-to-clipboard";
import { PostgrestError } from "@supabase/supabase-js";

const BASE_URL = import.meta.env.VITE_APP_LOCATION;

export const GenerateBuildLinkButton = () => {
  const [buildLink, setBuildLink] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<PostgrestError | Error | null>();
  const { exportLoadout } = usePartyLoadout();

  const handleGenerateLink = async () => {
    setError(null);
    setBuildLink("");

    try {
      const { data, error } = await supabase
        .rpc("upsert_party_loadout", {
          loadout: exportLoadout(),
        })
        .select()
        .single();

      if (error) {
        setError(error);
      } else {
        const url = `${BASE_URL}/calc/${data.id}`;
        setBuildLink(url);
        copy(url);
      }
    } catch (e) {
      setError(e as Error);
    }

    setOpenDialog(true);
  };

  return (
    <>
      <GenericDialog
        aria-label={"Character build link"}
        isOpen={openDialog}
        onOpenChange={setOpenDialog}
      >
        {error ? (
          <>
            <p>An error occurred while generating your link:</p>
            <p className={`text-blue`}>{error.message}</p>
            <p className={`text-yellow`}>
              Please report this to the developer!
            </p>
          </>
        ) : (
          <>
            <p>Build link copied to clipboard:</p>
            <a
              target={"_blank"}
              href={buildLink}
              className={`line-clamp-3 cursor-pointer break-words text-blue underline underline-offset-4`}
            >
              {buildLink}
            </a>
          </>
        )}
      </GenericDialog>
      <GenericTooltip content={"Generate Build Link"}>
        <IconButton onPress={handleGenerateLink}>
          <svg
            fill="none"
            className={`h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h7v2H4v8h7v2H2V6h2zm16 0h-7v2h7v8h-7v2h9V6h-2zm-3 5H7v2h10v-2z"
              fill="currentColor"
            />
          </svg>
        </IconButton>
      </GenericTooltip>
    </>
  );
};
