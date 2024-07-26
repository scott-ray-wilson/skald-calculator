import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { build?: string } => {
    return search;
  },
  beforeLoad: ({ search }) => {
    throw redirect({
      // handle redirect with old links using build query param
      to: search.build ? `/calc?build=${search.build}` : `/calc`,
    });
  },
});
