import { ChangeEvent } from "react";
import { User } from "../interfaces/User";

export const handleChange = (e: ChangeEvent<HTMLInputElement>, setFormValues: React.Dispatch<React.SetStateAction<User>>) => {

    const { name, value } = e.target;

    if (name === "orders") {
      const numberValue = parseInt(value);
      if (numberValue < 0 || numberValue > 10) {
        return;
      }
    }
    
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
