import Authentications from "../services/Authentications";

const resolvers = {
  Mutation: {
    Login: ({ email, password, res }) =>
      Authentications.login({ email, password, res }),
    Register: ({ email, password, res }) =>
      Authentications.register({ email, password, res }),
  },
};

export default resolvers;
