export class DecrementLevelError extends Error {
  cause: "feat_requires_level" | "feat_ranks_exceed_level";
  level: number;

  constructor(
    message: string,
    {
      cause,
      level = 0,
    }: {
      cause: "feat_requires_level" | "feat_ranks_exceed_level";
      level?: number;
    },
  ) {
    super(message);
    this.cause = cause;
    this.level = level;
  }
}
