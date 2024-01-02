import { describe, it, vi, expect } from "vitest";
import { CognitoAuthenticator } from "../../src/cognito";

vi.mock("amazon-cognito-identity-js", () => {
  const CognitoUser = vi.fn();
  CognitoUser.prototype.authenticateUser = function (
    { Username,Password },
    
    { onSuccess, onFailure },
  ) {
   
    if( Password!=="12345678"){
      onFailure(new Error("Wrong password"));
    }
    else{
      onSuccess(Username);
    }
  };
  CognitoUser.prototype.confirmRegistration = function (code, _, callback) {
    if (code !== "12345"){
      callback(new Error("Incorrect code"));
    }
    else{
      callback(null, this.email);
    }
    
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
    if(email.includes("@")){
      callback(null, { user });
    }
    else{
      callback(new Error("Wrong email"));
    }
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
   // expect(auth.getAuthData()).toBe("hello@gmail.com");
  });

  it("login incorrectly",async()=>{
    const auth = new CognitoAuthenticator();
    
    expect(() => auth.login("hello@gmail.com", "8393722")).rejects.toThrow("Wrong password")
  });
  
 
  it("confirm code incorrect", async () => {
    const auth = new CognitoAuthenticator();
    await auth.register("hello@gmail.com", "12345678");
   
    expect(()=> auth.confirmCode("12535")).rejects.toThrow("Incorrect code")
   // expect(auth.getAuthData()).toBe("hello@gmail.com");
  });
  it("registers incorrectly", async () => {
    const auth = new CognitoAuthenticator();
    
    expect(() => auth.register("hellogmail.com", "12345678")).rejects.toThrow("Wrong email")
    
  
  });
});
