import { RouterLink, RouterPath } from "@/components/generic";
import { cn } from "@/components/utils";
import { useRouterState } from "@tanstack/react-router";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { Fragment } from "react";

const LINKS: { id: string; to: RouterPath; title: string }[] = [
  {
    id: "calc",
    to: "/calc",
    title: "Calculator",
  },
  {
    id: "crafting",
    to: "/crafting",
    title: "Crafting",
  },
  {
    id: "items",
    to: "/items",
    title: "Item Database",
  },
];

export const NavLinks = () => {
  const {
    location: { pathname },
  } = useRouterState();

  return (
    <nav className={`ml-auto flex gap-3`}>
      {LINKS.map(({ to, title }, index) => (
        <Fragment key={to}>
          <RouterLink
            to={to}
            className={cn(
              `hidden text-white hover:text-yellow focus:text-blue focus:outline-none focus:ring-0 lg:inline`,

              {
                "underline decoration-[0.1rem] underline-offset-4":
                  pathname === to,
              },
            )}
          >
            {title}
          </RouterLink>
          {index < LINKS.length - 1 ? (
            <span className={"hidden text-light-gray lg:inline"}>|</span>
          ) : null}
        </Fragment>
      ))}
      <MenuTrigger>
        <Button className={`lg:hidden`}>
          <svg
            className={`mt-1 h-7 w-7 text-white`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
              fill="currentColor"
            />
          </svg>
        </Button>
        <Popover
          className={`crt sh rounded-sm border-2 border-light-gray bg-dark-gray shadow-[-2px_2px_0px_black]`}
        >
          <Menu
            className={`flex flex-col gap-2 border-2 border-black p-1.5 py-2`}
            items={LINKS}
          >
            {({ title, to }) => (
              <MenuItem
                className={cn(
                  `flex cursor-pointer items-start rounded-sm p-1 pr-1.5 text-white hover:bg-red focus:text-blue`,
                  {
                    "text-yellow underline underline-offset-4": pathname === to,
                  },
                )}
                href={to}
              >
                {title}
              </MenuItem>
            )}
          </Menu>
        </Popover>
      </MenuTrigger>
    </nav>
  );
};
