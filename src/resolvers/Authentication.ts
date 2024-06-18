import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    generateHMACSignature: ({ email }: { email: string }) =>
      Authentications.generateHMACSignature(email),
    verifyHMACSignature: ({ data, signature }: { data: string, signature: string }) =>
      Authentications.verifyHMACSignature(data, signature),
    login: (
      _: any,
      { email, password }: { email: string, password: string },
      { res }: { res: any },
    ) =>
      Authentications.login({ email, password, res }),
    register: (
      _: any,
      { email, password }: { email: string, password: string },
      { res }: { res: any },
    ) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
