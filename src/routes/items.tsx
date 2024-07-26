import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponent, PageContainer } from "@/components/generic";
import { ItemsPanel } from "@/components/items";

export const Route = createFileRoute("/items")({
  pendingComponent: LoadingComponent,
  component: () => (
    <PageContainer>
      <ItemsPanel />
    </PageContainer>
  ),
});
