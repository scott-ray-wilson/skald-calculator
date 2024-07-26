import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Footer, Header, RouterPath } from "@/components/generic";
import { RouterProvider } from "react-aria-components";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
  pendingComponent: () => <div className={`h-screen w-screen bg-blue`}></div>,
});

function Root() {
  const navigate = useNavigate();

  // supports react aria link navigation
  const handleNavigate = (to: string) => {
    navigate({
      to: to as RouterPath,
    });
  };

  return (
    <RouterProvider navigate={handleNavigate}>
      <Header />
      <main className={`flex w-full flex-1 flex-col bg-black p-3 md:p-4`}>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </RouterProvider>
  );
}
