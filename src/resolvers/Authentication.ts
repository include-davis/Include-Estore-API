import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    Login: ({ email, password }) =>
      Authentications.login({ email, password }),
    Register: ({ email, password }) =>
      Authentications.register({ email, password }),
  },
};

export default resolvers;
