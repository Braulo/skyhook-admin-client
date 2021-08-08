export interface AccessTokenPayload {
  accessTokenVersion?: string;
  email: string;
  exp: string;
  iat: string;
  realmApplication?: string;
  userId: string;
  username: string;
}
