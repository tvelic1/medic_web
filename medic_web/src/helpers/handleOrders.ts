

import { User} from "../interfaces/User";

  export const handleIncrementOrdersUser = (setFormValues: React.Dispatch<React.SetStateAction<User>>) => {
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        orders: Number(prevValues.orders) >= 10 ? 0 : Number(prevValues.orders) + 1,
      };
    });
  };

  export const handleDecrementOrdersUser = (setFormValues: React.Dispatch<React.SetStateAction<User>>) => {
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        orders: Number(prevValues.orders) <= 0 ? 10 : Number(prevValues.orders) - 1,
      };
    });
  };

