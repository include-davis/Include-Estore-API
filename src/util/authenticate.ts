import { verifyToken } from "./authToken";

// Check the auth state with this function
export default function authenticate({ req }: any): boolean {
  // Check if the token has expired
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return false;
  }
  const verification = verifyToken(token);
  if (verification.ok) {
    return verification.body.expires < Date.now();
  }
  return false;
}
