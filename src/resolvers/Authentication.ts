import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    login: ({ email, password }) =>
      Authentications.login({ email, password }),
    register: ({ email, password }) =>
      Authentications.register({ email, password }),
  },
};

export default resolvers;
