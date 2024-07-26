import { Button } from "react-aria-components";
import { GenericDialog } from "@/components/generic";

export const Footer = () => {
  return (
    <>
      <footer
        className={`w-full border-t-2 text-center justify-center leading-[1.2] flex-wrap gap-x-3 border-light-gray py-2 px-3 bg-red text-[10px] flex text-white md:flex-row gap-y-2 md:justify-between`}
      >
        <span className={`sm:w-fit w-full`}>2024 Created by Scott Wilson</span>
        <GenericDialog
          aria-label={"Privacy disclaimer"}
          trigger={
            <Button
              className={`underline focus:outline-none focus:text-blue hover:text-yellow focus:ring-0 underline-offset-4`}
            >
              Privacy
            </Button>
          }
        >
          <span className={`underline underline-offset-4`}>Privacy Policy</span>
          <p>
            SKALD Calculator does not directly collect or store any personal
            information or track you.
          </p>
        </GenericDialog>
        <GenericDialog
          aria-label={"Contact info"}
          trigger={
            <Button
              className={`underline md:mr-auto focus:outline-none focus:text-blue hover:text-yellow focus:ring-0 underline-offset-4`}
            >
              Contact
            </Button>
          }
        >
          <span className={`underline underline-offset-4`}>Contact</span>
          <p>
            {`You can contact me directly via Discord by clicking `}
            <a
              href="https://www.discord.com/users/698250745874481234"
              target={"_blank"}
              className={`text-blue underline underline-offset-4`}
            >
              here
            </a>
            .
          </p>
          <p className={`text-yellow`}>
            I am currently seeking employment and/or contracting opportunities.
          </p>
        </GenericDialog>
        <span className={`sm:w-fit w-full`}>
          This site is not affiliated with High North Studios or Raw Fury
        </span>
      </footer>
    </>
  );
};
