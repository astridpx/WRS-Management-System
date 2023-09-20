const Transactions = [
  {
    customer: "MongoDB Customer ID",
    service: "Deliver",
    status: "for deliver",
    transaction_date: "september 09 2023",
    amount: 200,
    paid: true,
    balance: 0,
    orders: [
      {
        type: "Slim",
        quantity: 3,
      },
      {
        type: "Rounded",
        quantity: 3,
      },
    ],
  },
  {
    customer: "MongoDB Customer ID",
    service: "pickUp",
    status: "Delivered",
    transaction_date: "september 09 2023",
    amount: 200,
    paid: false,
    balance: 100,
    orders: [
      {
        type: "Slim",
        quantity: 3,
      },
      {
        type: "Rounded",
        quantity: 3,
      },
    ],
  },
];
