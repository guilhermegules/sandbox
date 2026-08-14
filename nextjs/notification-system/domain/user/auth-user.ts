export type AuthUser = {
  id: string;
  email?: string;
};

export type AuthUserJWT = {
  sub: string;
  email?: string;
};
