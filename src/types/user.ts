export interface IUser {
  userId: string;
  name: string;
  phone: string;
  userEmail: string;
  isBlocked?: boolean;
  userRole: "landLord" | "tenant" | "admin";
  image?: string;
  iat?: number;
  exp?: number;
}
