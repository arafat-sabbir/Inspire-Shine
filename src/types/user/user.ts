export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  address: string;
  iat: number;
  exp: number;
  _id: string;
  createdAt:Date;
};
