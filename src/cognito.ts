import {
  CognitoUserPool,
  CognitoUserAttribute,
  ISignUpResult,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

/**
 * Opaque interface type that holds Authentication data
 */
export interface AuthData {}

export interface Authenticator {
  login(email: string, password: string): Promise<AuthData>;
  register(email: string, password: string): Promise<void>;
  confirmCode(code: string): Promise<AuthData>;
  getAuthData(): AuthData | null;
}

export class CognitoAuthenticator implements Authenticator {
  private userPool: CognitoUserPool;
  private user: CognitoUser;
  private authData: CognitoUserSession;

  constructor() {
    const poolData = {
      UserPoolId: "eu-north-1_3IXfYlKCt",
      ClientId: "3dfitbij9sve1mirmk6bdriu83",
    };

    this.userPool = new CognitoUserPool(poolData);
  }
  async login(email: string, password: string): Promise<CognitoUserSession> {
    return await new Promise((res, err) => {
      this.user = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });
      this.user.authenticateUser(
        new AuthenticationDetails({
          Username: email,
          Password: password,
        }),
        {
          onSuccess: (session) => {
            this.authData = session;
            res(this.authData);
          },
          onFailure: (error) => {
            err(error);
          },
        },
      );
      this.userPool.getClientId();
    });
  }

  async confirmCode(code: string): Promise<AuthData> {
    return new Promise((resolve, error) => {
      this.user.confirmRegistration(code, true, (err, user) => {
        if (err) {
          error(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  async register(email: string, password: string): Promise<void> {
    return await new Promise((resolve, error) => {
      this.userPool.signUp(email, password, [], null, (err, res) => {
        if (err) {
          error(err);
        } else {
          this.user = res.user;
          resolve();
        }
      });
    });
  }
  getAuthData() {
    return this.authData;
  }
}
