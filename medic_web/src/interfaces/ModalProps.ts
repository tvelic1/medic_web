import { User } from "./User";

export interface ModalProps {
    onClose: () => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    user: User;
  }

 export interface ModalAddProps {
    onClose: () => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  
  }
  export interface IFailedLogin {
    message: string;
    onClose: () => void;
  }