export type MockOrder = {
  _id: string;
  orderNumber: number;
  customerName: string;
  price: number;
  status: "pending" | "preparing" | "ready";
  createdAt: string;
  cart: {
    productId: string;
    name: string;
    quantity: number;
    extras: { name: string }[];
    condiments: { name: string }[];
  }[];
};

export const mockOrders: MockOrder[] = [
  {
    _id: "order-128",
    orderNumber: 128,
    customerName: "Anna Lind",
    price: 92,
    status: "pending",
    createdAt: "2026-11-25T11:14:00",
    cart: [
      {
        productId: "product-1",
        name: "Grillad korv med bröd",
        quantity: 1,
        extras: [{ name: "Rostad lök" }],
        condiments: [{ name: "Senap" }],
      },
      {
        productId: "product-1",
        name: "Grillad korv med bröd",
        quantity: 1,
        extras: [{ name: "Bostongurka" }],
        condiments: [],
      },
      {
        productId: "product-2",
        name: "Pucko",
        quantity: 2,
        extras: [],
        condiments: [],
      },
    ],
  },
  {
    _id: "order-127",
    orderNumber: 127,
    customerName: "Johan Berg",
    price: 145,
    status: "pending",
    createdAt: "2026-11-25T11:18:00",
    cart: [
      {
        productId: "product-3",
        name: "Tunnbrödsrulle",
        quantity: 2,
        extras: [{ name: "Extra räksallad" }],
        condiments: [{ name: "Ketchup" }],
      },
      {
        productId: "product-4",
        name: "Coca-Cola",
        quantity: 1,
        extras: [],
        condiments: [],
      },
    ],
  },
  {
    _id: "order-126",
    orderNumber: 126,
    customerName: "Erik Svensson",
    price: 78,
    status: "pending",
    createdAt: "2026-11-25T11:21:00",
    cart: [
      {
        productId: "product-5",
        name: "Chorizo med bröd",
        quantity: 1,
        extras: [{ name: "Smält cheddarost" }],
        condiments: [{ name: "Stark senap" }],
      },
    ],
  },
  {
    _id: "order-125",
    orderNumber: 125,
    customerName: "Maria Nilsson",
    price: 121,
    status: "preparing",
    createdAt: "2026-11-25T11:09:00",
    cart: [
      {
        productId: "product-6",
        name: "Grillad korv med bröd",
        quantity: 2,
        extras: [{ name: "Rostad lök" }],
        condiments: [],
      },
      {
        productId: "product-7",
        name: "Pommes frites",
        quantity: 1,
        extras: [],
        condiments: [{ name: "Bearnaisesås" }],
      },
    ],
  },
  {
    _id: "order-124",
    orderNumber: 124,
    customerName: "Oskar Holm",
    price: 50,
    status: "ready",
    createdAt: "2026-11-25T10:54:00",
    cart: [
      {
        productId: "product-8",
        name: "Nisses vanliga",
        quantity: 1,
        extras: [{ name: "Rostad lök" }],
        condiments: [{ name: "Räksallad" }],
      },
    ],
  },
  {
    _id: "order-123",
    orderNumber: 123,
    customerName: "Lisa Andersson",
    price: 64,
    status: "ready",
    createdAt: "2026-11-25T10:48:00",
    cart: [
      {
        productId: "product-9",
        name: "Kokt korv med bröd",
        quantity: 2,
        extras: [],
        condiments: [{ name: "Senap" }],
      },
    ],
  },
];
