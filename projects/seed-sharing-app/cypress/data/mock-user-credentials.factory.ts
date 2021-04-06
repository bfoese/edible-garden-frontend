export type UserCredentials = {
  username: string;
  email: string;
  password: string;
};

const faker = require('faker');

export class MockUserCredentialsFactory {
  private static generateEmail(username: string): string {
    return `carnica.dev+eg-e2e-${username}@gmail.com`;
  }

  public static activatedUser(): UserCredentials {
    return {
      username: 'e2e-test',
      email: 'e2e-test@gmail.com',
      password: 'Test1234'
    };
  }

  public static createForSignup(): UserCredentials {
    const username = faker.internet.userName();
    return {
      username: username,
      email: MockUserCredentialsFactory.generateEmail(username),
      // faker passwords do mostly but not always contain a digit
      password: `${faker.internet.password()}${Math.random()}`
    };
  }
}
