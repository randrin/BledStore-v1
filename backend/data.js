import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      pseudo: "randrino17",
      name: "Randrin Nzeukang",
      email: "nzeukangrandrin@gmail.com",
      phone: "3296187465",
      password: bcrypt.hashSync("123456789", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Randrino's Seller",
        logo: "/assets/images/products/product-1.jpg",
        description: "Best quality products in lower cost for all the people on the world",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      pseudo: "bokino12",
      name: "Boclair",
      email: "temgoua2001@gmail.com",
      password: bcrypt.hashSync("0000000", 8),
      phone: "325568656",
      isAdmin: false,
    },
  ],
  products: [
    {
      _id: "5baa3bb4b33646b6a772709f",
      name: "Gray Coat",
      description:
        "ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices",
      category: "Clothes",
      brand:
        "a pede posuere nonummy integer non velit donec diam neque vestibulum eget",
      rating: 9.8,
      numReviews: 18,
      countInStock: 12,
      price: 83,
      image: "/assets/images/products/product-1.jpg",
    },
    {
      _id: "7e7463da17824c269dbdff4b",
      name: "Brown Scarf",
      description:
        "pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
      category: "Clothes",
      brand: "mi in porttitor pede justo eu massa donec dapibus duis at",
      rating: 5.8,
      numReviews: 75,
      countInStock: 10,
      price: 86,
      image: "/assets/images/products/product-2.jpg",
    },
    {
      _id: "ef5244f734b645e4b653c2ce",
      name: "Brown Tshirt",
      description:
        "magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient",
      category: "Tshirt",
      brand:
        "non lectus aliquam sit amet diam in magna bibendum imperdiet nullam",
      rating: 9.8,
      numReviews: 36,
      countInStock: 30,
      price: 14,
      image: "/assets/images/products/product-3.jpg",
    },
    {
      _id: "eb9c79870b474d2c85f9eff0",
      name: "Brown Sweater",
      description:
        "vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes",
      category: "Clothes",
      brand:
        "orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur",
      rating: 4.3,
      numReviews: 75,
      countInStock: 91,
      price: 79,
      image: "/assets/images/products/product-4.jpg",
    },
    {
      _id: "4714df41ea6a4b2f9f914eef",
      name: "Yellow Dress",
      description:
        "dui maecenas tristique est et tempus semper est quam pharetra magna ac",
      category: "Clothes",
      brand:
        "tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna",
      rating: 1.1,
      numReviews: 16,
      countInStock: 61,
      price: 98,
      image: "/assets/images/products/product-5.jpg",
    },
    {
      _id: "c052e69cd0024b788234a8e6",
      name: "Dark Green Women Set",
      description:
        "maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras",
      category: "Tshirt",
      brand:
        "tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo",
      rating: 7.4,
      numReviews: 58,
      countInStock: 95,
      price: 21,
      image: "/assets/images/products/product-6.jpg",
    },
    {
      _id: "5b0e640c308e417d9c2e00de",
      name: "Dress Jeans",
      description:
        "dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
      category: "Clothes",
      brand:
        "mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy",
      rating: 6.3,
      numReviews: 7,
      countInStock: 18,
      price: 60,
      image: "/assets/images/products/product-7.jpg",
    },
    {
      _id: "c6022c1d42744bd1b186a68b",
      name: "Women Shoes",
      description:
        "eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
      category: "Shoes",
      brand:
        "ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
      rating: 3.2,
      numReviews: 48,
      countInStock: 24,
      price: 69,
      image: "/assets/images/products/product-8.jpg",
    },
    {
      _id: "78341449a1b547338a4c4ce9",
      name: "Gray Bag",
      description:
        "ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo",
      category: "Bag",
      brand: "ut nunc vestibulum ante ipsum primis in faucibus orci luctus",
      rating: 9.5,
      numReviews: 88,
      countInStock: 51,
      price: 26,
      image: "/assets/images/products/product-9.jpg",
    },
    {
      _id: "c3a48b792a9d4c5989256772",
      name: "Yellow Tshirt Small",
      description:
        "risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum",
      category: "Tshirt",
      brand:
        "pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel",
      rating: 5.8,
      numReviews: 46,
      countInStock: 58,
      price: 17,
      image: "/assets/images/products/product-10.jpg",
    },
    {
      _id: "07e7eef3b26e496c9365aca6",
      name: "Woman High Shoe",
      description:
        "habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate",
      category: "Shoes",
      brand:
        "tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero",
      rating: 1.7,
      numReviews: 12,
      countInStock: 7,
      price: 49,
      image: "/assets/images/products/product-11.jpg",
    },
    {
      _id: "f7416cf2e80643558a9c1812",
      name: "Black Bag",
      description:
        "in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin",
      category: "Bag",
      brand:
        "gravida nisi at nibh in hac habitasse platea dictumst aliquam augue",
      rating: 4.4,
      numReviews: 58,
      countInStock: 68,
      price: 47,
      image: "/assets/images/products/product-12.jpg",
    },
    {
      _id: "f8befa09755647d892fe7703",
      name: "Brown Bag",
      description:
        "duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in",
      category: "Bag",
      brand:
        "eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed",
      rating: 2.2,
      numReviews: 2,
      countInStock: 32,
      price: 74,
      image: "/assets/images/products/product-13.jpg",
    },
    {
      _id: "a3ae909f08604034b944f098",
      name: "Brown Mini Dress",
      description:
        "ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor",
      category: "Clothes",
      brand:
        "posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin",
      rating: 2.8,
      numReviews: 87,
      countInStock: 42,
      price: 99,
      image: "/assets/images/products/product-14.jpg",
    },
    {
      _id: "566db4af24c24508abe5d635",
      name: "Brown Mini Bag",
      description:
        "faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec",
      category: "Bag",
      brand:
        "nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in",
      rating: 9.6,
      numReviews: 6,
      countInStock: 1,
      price: 11,
      image: "/assets/images/products/product-15.jpg",
    },
  ],
};

export default data;
