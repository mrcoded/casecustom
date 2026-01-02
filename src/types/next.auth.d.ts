import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 1. Extend the User type to include 'id'
// This ensures 'user.id' is known when using the PrismaAdapter
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // Add the custom property 'id'
  }

  // 2. Extend the Session type
  interface Session extends DefaultSession {
    user: {
      id: string; // Add 'id' to the user object within the session
    } & DefaultSession["user"]; // Keep existing fields (name, email, image)
  }
}

// 3. Extend the JWT type
// This ensures 'token.id' is known and can be passed to the session callback
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string; // Add 'id' to the token
  }
}
