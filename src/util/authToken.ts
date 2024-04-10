/**
 * Express.js middleware for authentication token verification.
 * Retrieves token from cookies, verifies it, and sends authentication context.
 */
import express from "express";
import jwt from "jsonwebtoken";

// Configuration
const secretKey = "top secret"; // Secret key for JWT signing and verification

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
  const token = jwt.sign(data, secretKey, {
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
    const decodedToken: DecodedToken = jwt.verify(token, secretKey);
    return {
      ok: true,
      body: decodedToken,
      error: undefined,
    };
  } catch (e) {
    return {
      ok: false,
      body: undefined,
      error: e,
    };
  }
}

/**
 * Express router for token authentication
 */
export const authTokenRouter = express.Router();

/**
 * Middleware function to handle token authentication.
 * Retrieves token from cookies, verifies it, and sends authentication context.
 * @param req - The Express request object. Assumes that there exists req.cookies.token
 * @param res - The Express response object.
 * @param next - The next middleware function in the request-response cycle.
 */
authTokenRouter.use((req, res, next) => {
  try {
    const { token } = req.cookies; // Retrieve token from cookies
    const context: Context = {
      auth: verifyToken(token), // Verify token and create authentication context
    };
    res.send(context); // Send authentication context in the response
    next();
  } catch (e) {
    const context: Context = {
      auth: {
        ok: false,
        body: undefined,
        error: e,
      } as VerifyTokenResponse,
    };
    res.send(context); // Send error authentication context in case of exceptions
    next();
  }
});