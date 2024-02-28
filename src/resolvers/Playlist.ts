import Playlists from "../services/Playlists";
import Users from "../services/Users";

const resolvers = {
  Playlist: {
    user: ({ userId }) => Users.find({ id: userId }),
    songs: ({ id }) => Playlists.getSongs({ id }),
  },
  Query: {
    playlist: (_, { id }) => Playlists.find({ id }),
    playlists: () => Playlists.findAll(),
  },
  Mutation: {
    createPlaylist: (_, { userId, input }) =>
      Playlists.create({ userId, input }),
    addSong: (_, { playlistId, songId }) =>
      Playlists.addSong({ playlistId, songId }),
  },
};
export default resolvers;
