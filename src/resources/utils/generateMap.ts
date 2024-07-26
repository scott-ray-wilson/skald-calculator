export const generateMap = <T extends { id: string }>(list: T[]) =>
  new Map(list.map((v) => [v.id, v]));
