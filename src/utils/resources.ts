
export const resources = [
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

export const randomResourceGenerator = () => {
  const randomResource = Math.floor(Math.random() * 50);
  return resources[randomResource] || false;
};
