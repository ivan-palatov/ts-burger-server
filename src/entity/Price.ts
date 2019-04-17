// It could be an entity, but its a simple example w/o admin management and stuff, so just an object
interface IPripce {
  [x: string]: number;
}

export const Price: IPripce = {
  cheese: 1,
  salad: 0.5,
  bacon: 1,
  meat: 2,
};
