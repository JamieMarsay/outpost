export interface IResource {
  type: "food" | "ore" | "gold";
  icon: "grass" | "terrain" | "join_inner";
  output: number;
}

export const resources: IResource[] = [
  {
    type: "food",
    icon: "grass",
    output: 1,
  },
  {
    type: "ore",
    icon: "terrain",
    output: 1,
  },
  {
    type: "gold",
    icon: "join_inner",
    output: 1,
  },
];

export const randomResourceGenerator = (rarity: number = 50) => {
  const randomResource = Math.floor(Math.random() * rarity);
  return resources[randomResource] || false;
};
