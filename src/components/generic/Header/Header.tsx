import { NavLinks, RouterLink } from "@/components/generic";

export const Header = () => {
  return (
    <header
      className={`box-border w-full items-center border-b-2 t px-4 pb-3 py-2 border-light-gray h-fit flex bg-red gap-3`}
    >
      <RouterLink
        to={"/calc"}
        className={`mt-1 flex-col cursor-pointer gap-0.5 flex items-start`}
      >
        <h1 className={`text-xl leading-5 text-yellow`}>SKALD Calculator</h1>
        <h2 className={"text-xs leading-4 text-white"}>
          SKALD: Against the Black Priory Builds
        </h2>
      </RouterLink>
      <NavLinks />
    </header>
  );
};
