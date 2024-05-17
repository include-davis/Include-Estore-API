import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    Login: ({ email, password }) =>
      Authentications.login({ email, password }),
    Register: ({ email, password }) =>
      Authentications.register({ email, password }),
    generateHMACSignature: ({ email }: { email: string }) =>
      Authentications.generateHMACSignature(email),
    verifyHMACSignature: ({ token }: { token: string }) =>
      Authentications.verifyHMACSignature(token),
  },
};

export default resolvers;
