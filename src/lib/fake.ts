import { Roles, User } from "./types";
import { faker } from "@faker-js/faker";

export function fakeUser(): User {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.enumValue(Roles),
    dateOfBirth: faker.date.birthdate(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    streetNumber: faker.number.int({ min: 1, max: 100 }).toString(),
    street: faker.location.street(),
    suburb: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
  };
}
