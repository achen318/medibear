export {};

export type Roles = 'patient' | 'practitioner';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboarded?: boolean;
      role?: Roles;
    };
  }
}
