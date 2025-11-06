
export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "is-active" | "blocked";
  isDeleted: boolean;
};