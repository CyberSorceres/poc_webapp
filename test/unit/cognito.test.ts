import { describe, it, vi, expect } from "vitest";
import { CognitoAuthenticator } from "../../src/cognito";

vi.mock("amazon-cognito-identity-js", () => {
  const CognitoUser = vi.fn();
  CognitoUser.prototype.authenticateUser = function (
    { Username },
    { onSuccess, onFailure },
  ) {
    onSuccess(Username);
  };
  CognitoUser.prototype.confirmRegistration = function (code, _, callback) {
    callback(null, this.email);
  };
  const CognitoUserPool = vi.fn();
  CognitoUserPool.prototype.signUp = function (
    email,
    password,
    __,
    _,
    callback,
  ) {
    const user = new CognitoUser();
    user.email = email;
    callback(null, { user });
  };
  return {
    CognitoUserPool,
    CognitoUserAttribute: vi.fn(),
    CognitoUser,
    AuthenticationDetails: vi.fn((a) => a),
    CognitoUserSession: vi.fn(),
  };
});

describe("Cognito tests", () => {
  it("logins correctly", async () => {
    const auth = new CognitoAuthenticator();
    const user = await auth.login("hello@gmail.com", "12345678");
    // Expect user to be the mocked one we provided
    // In the real implementation, this will be a CognitoUserSession
    expect(user).toBe("hello@gmail.com");
    expect(auth.getAuthData()).toBe("hello@gmail.com");
  });

  it("registers correctly", async () => {
    const auth = new CognitoAuthenticator();
    await auth.register("hello@gmail.com", "12345678");
    const user = await auth.confirmCode("12345");
    expect(user).toBe("hello@gmail.com");
    expect(auth.getAuthData()).toBe("hello@gmail.com");
  });
});
