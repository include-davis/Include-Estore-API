import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    login: ({ email, password }) =>
      Authentications.login({ email, password }),
    register: ({ email, password }) =>
      Authentications.register({ email, password }),
    Login: (_, { email, password }, { res }) =>
      Authentications.login({ email, password, res }),
    Register: (_, { email, password }, { res }) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
