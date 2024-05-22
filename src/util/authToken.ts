/**
 * Express.js middleware for authentication token verification.
 * Retrieves token from cookies, verifies it, and sends authentication context.
 */
import jwt from "jsonwebtoken";

// Configuration
const { JWT_SECRET } = process.env; // Secret key for JWT signing and verification

/**
 * Represents an optional value of type T.
 */
export type Optional<T> = T | null | undefined;

/**
 * Represents a JWT token.
 */
export type Token = string;

/**
 * Represents a decoded JWT token.
 */
export type DecodedToken = any;

/**
 * Represents the response from a token creation operation.
 */
export type CreateTokenResponse = {
  /** Indicates whether the token creation was successful. */
  ok: boolean;
  /** The body of the token if creation was successful. */
  body: Optional<Token>;
  /** An error object if an error occurred during token creation. */
  error: Optional<Error>;
};

/**
 * Represents the response from a token verification operation.
 */
export type VerifyTokenResponse = {
  /** Indicates whether the token verification was successful. */
  ok: boolean;
  /** The decoded body of the token if verification was successful. */
  body: Optional<DecodedToken>;
  /** An error object if an error occurred during token verification. */
  error: Optional<Error>;
};

/**
 * Represents the context for authentication operations.
 */
export type Context = {
  /** The authentication verification response. */
  auth: VerifyTokenResponse;
};

/**
 * Creates a JWT token with the provided data.
 * @param data - The data to be encoded into the token.
 * @param durationOfToken - Optional. Duration for which the token will be valid (default is "1h").
 * @returns The response indicating the success or failure of token creation.
 */
export function createToken(data: any, durationOfToken: string = "1h"): CreateTokenResponse {
  const token = jwt.sign(data, JWT_SECRET as string, {
    expiresIn: durationOfToken,
  });

  return {
    ok: true,
    body: token,
    error: undefined,
  };
}

/**
 * Verifies the authenticity of a JWT token.
 * @param token - The token to be verified.
 * @returns The response indicating the success or failure of token verification.
 */
export function verifyToken(token: Token): VerifyTokenResponse {
  try {
    const decodedToken: DecodedToken = jwt.verify(token, JWT_SECRET as string);
    return {
      ok: true,
      body: decodedToken,
      error: undefined,
    };
  } catch (e) {
    return {
      ok: false,
      body: undefined,
      error: e as Optional<Error>,
    };
  }
}

// Check the auth state with this function
export function authenticate({ req }: { req: any }) {
  try {
    const { token } = req.cookies; // Retrieve token from cookies
    const context: Context = {
      auth: verifyToken(token), // Verify token and create authentication context
    };
    return context;
  } catch (e) {
    const context: Context = {
      auth: {
        ok: false,
        body: undefined,
        error: e,
      } as VerifyTokenResponse,
    };
    return context;
  }
}
