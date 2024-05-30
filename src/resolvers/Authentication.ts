import Authentications from "../services/Authentications";

type AuthArgs = {
  email: string;
  password: string;
};

const resolvers = {
  Mutation: {
    Login: async (_: any, { email, password }: AuthArgs) =>
      Authentications.login({ email, password }),
    Register: async (_: any, { email, password }: AuthArgs) =>
      Authentications.register({ email, password }),
  },
};

export default resolvers;
