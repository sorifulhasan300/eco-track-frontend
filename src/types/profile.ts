import { USER_ROLES } from "./roles";

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: USER_ROLES;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileUpdateRequest {
  name: string;
  email: string;
  image?: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
