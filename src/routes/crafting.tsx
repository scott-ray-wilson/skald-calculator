import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponent, PageContainer } from "@/components/generic";
import { CraftingPanel } from "@/components/crafting";

export const Route = createFileRoute("/crafting")({
  pendingComponent: LoadingComponent,
  component: () => (
    <PageContainer>
      <CraftingPanel />
    </PageContainer>
  ),
});
