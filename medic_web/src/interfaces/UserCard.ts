import { User } from "./User";

export interface UserCardProps {
    user: User;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    hoveredUserId: number | null;
    className:string;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;

  }