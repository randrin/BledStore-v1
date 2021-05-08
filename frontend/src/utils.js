export const prices = [
  {
    name: "Any",
    min: 0,
    max: 0,
  },
  {
    name: `1€ to 10€`,
    min: 1,
    max: 10,
  },
  {
    name: `10€ to 100€`,
    min: 10,
    max: 100,
  },
  {
    name: `100€ to 500€`,
    min: 100,
    max: 500,
  },
  {
    name: `500€ to 1000€`,
    min: 500,
    max: 1000,
  },
  {
    name: `> 1000€`,
    min: 1000,
    max: 2000,
  },
];
export const ratings = [
  {
    name: "Top Sellers",
    rating: 5,
  },
  {
    name: "4stars & up",
    rating: 4,
  },
  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];
export const truncate = (name, lgt) => {
  if (typeof lgt === "number") {
    return name.length > lgt ? name.substring(0, lgt) + " ..." : name;
  } else {
    return name.length > lgt ? name.substring(0, 20) + " ..." : name;
  }
}