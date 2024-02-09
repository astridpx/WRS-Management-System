// Top customer lists
export const TopCustomer = async (salesData: any) => {
  const Persons = await salesData.map((person: any) => person.customer._id);

  const sortedPerson = Array.from(new Set(Persons));

  const TopList = await sortedPerson.map((person: any) => {
    const filtered = salesData.filter((p: any) => {
      return p.customer._id === person;
    });

    const totalAmount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const totalDiscount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.discount,
      0
    );

    // find the customer name
    const matchingCustomers = salesData.filter(
      (c: any) => c.customer._id === person
    );

    // retrieve the first and last name
    const customerName = matchingCustomers.map((item: any) => {
      const fName = item.customer.first_name;
      const lName = item.customer.last_name;

      return `${fName} ${lName}`;
    });

    // remove the duplicates since its back as array
    const sortedName = Array.from(new Set(customerName));

    const topPerson = {
      name: sortedName[0],
      totalAmount: totalAmount + totalDiscount,
    };

    return topPerson;
  });

  // Sort the array by totalAmount in descending order
  TopList.sort((a: any, b: any) => b.totalAmount - a.totalAmount);

  // Limit the array to the first 8 elements
  const top9Persons = TopList.slice(0, 8);

  return top9Persons;
};
