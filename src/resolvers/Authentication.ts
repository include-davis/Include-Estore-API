import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    Login: (_, { email, password }, { res }) =>
      Authentications.login({ email, password, res }),
    Register: (_, { email, password }, { res }) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
