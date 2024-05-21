import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    Login: (_: any, { email, password }: any, { res }: any) =>
      Authentications.login({ email, password, res }),
    Register: (_: any, { email, password }: any, { res }: any) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
