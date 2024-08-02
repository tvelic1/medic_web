import { User } from "../interfaces/User";

export const handleIncrementOrdersUser = (setFormValues: React.Dispatch<React.SetStateAction<User>>) => {
  setFormValues((prevValues) => {
    console.log('Incrementing:', prevValues.orders);
    const newOrders = Number(prevValues.orders) === 10 ? 0 : Number(prevValues.orders) + 1;
    console.log('New Orders:', newOrders);
    return {
      ...prevValues,
      orders: newOrders,
    };
  });
};

export const handleDecrementOrdersUser = (setFormValues: React.Dispatch<React.SetStateAction<User>>) => {
  setFormValues((prevValues) => {
    console.log('Decrementing:', prevValues.orders);
    const newOrders = Number(prevValues.orders) === 0 ? 10 : Number(prevValues.orders) - 1;
    console.log('New Orders:', newOrders);
    return {
      ...prevValues,
      orders: newOrders,
    };
  });
};
