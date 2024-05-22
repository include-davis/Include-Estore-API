import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    generateHMACSignature: ({ email }: { email: string }) =>
      Authentications.generateHMACSignature(email),
    verifyHMACSignature: ({ data, signature }: { data: string, signature: string }) =>
      Authentications.verifyHMACSignature(data, signature),
    Login: (
      _: any,
      { email, password }: { email: string, password: string },
      { res }: { res: any },
    ) =>
      Authentications.login({ email, password, res }),
    Register: (
      _: any,
      { email, password }: { email: string, password: string },
      { res }: { res: any },
    ) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
