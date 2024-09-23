export {};
export type Roles = "admin" | "member" | "affiliate";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  interface UserPublicMetadata {
    role?: Roles;
  }
}
