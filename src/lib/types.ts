// All types and enums go here

export enum Roles {
  Public = 4,
  Patient = 6,
  Doctor = 5,
  Admin = 3,
}

export type Role = Roles.Admin | Roles.Doctor | Roles.Patient | Roles.Public;

export type User = {
  username: string;
  email: string;
  password: string;
  role: Role;
  dateOfBirth: Date;
  gender: "Male" | "Female";
  streetNumber: string;
  street: string;
  suburb: string;
  state: string;
  country: string;
  postcode: string;
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type Location = {
  name: string;
  email: string;
  streetNumber: string;
  street: string;
  suburb: string;
  postcode: string;
  phone: string;
};

export type Appointment = {
  start: Date;
  end: Date;
  treatment: number;
  doctor: number;
  location: number;
  patient: number;
};
