import { Playlist } from './playlist.model'

// rootValue (from parent node in graph), args (for all params)
// context (of this current resolver), info (extra information)
const getPlaylist = (rootValue, args, context, info) => {
    return Playlist.findById(args.id).exec();
    // YOU CAN DEFINE ARGS AS -> (rootValue, {id, and, other, props}, context, ..)
    // THEREFORE args == { id, and, other, props }
}, allPlaylists = (rootValue, args, context, info) => {
    return Playlist.find({}).exec()
}

// AND NOW, DEFINE THE MUTATION RESOLVERS ...

newPlaylist = async (rootValue, {input}, {req, user}, info) => {
    var playlist = input; // PERFORM SOME VALIDATIONS ON input FIRST (AS NewPlaylist GRAPH-QL input OBJECT)
    return Playlist.create(playlist) // MAKE SURE THIS RETURNED OBJECT HAS Playlist GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Playlist RETURN OBJECT SHOULD HAVE
},
updatePlaylist = async (rootValue, {input}, {req, user}, info) => {
    // PERFORM SOME VALIDATIONS ON input FIRST (AS UpdatedPlaylist GRAPH-QL input OBJECT)
    const {id, ...update} = input;
    return Playlist.findByIdAndUpdate(id, update, {new: true}).exec()
    // OR RUN THIS INSTEAD ..
    var playlist = await Playlist.findById(input.id);
    delete input.id; // REMOVE THIS SO IT DOESN'T GET CREATED ON THE MONGO-DB OBJECT
    // REMEMBER MONGO-DB DOESN'T HAVE .id BUT ._id (SO .id IS "NEW")
    merge(playlist, input)
    return playlist.save() // MAKE SURE THIS RETURNED OBJECT HAS Playlist GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Playlist RETURN OBJECT SHOULD HAVE
},
deletePlaylist = async (rootValue, {input}, {req, user}, info) => {
    // PERFORM SOME VALIDATIONS ON input FIRST (AS DeletedPlaylist GRAPH-QL input OBJECT)
    return Playlist.findByIdAndRemove(input.id).exec()
    // OR RUN THIS INSTEAD ..
    var playlist = await Playlist.findById(input.id);
    return playlist.remove() // MAKE SURE THIS RETURNED OBJECT HAS Playlist GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Playlist RETURN OBJECT SHOULD HAVE
};

export const playlistResolvers = {
    Query: { Playlist: getPlaylist, allPlaylists },
    Mutation: { newPlaylist, updatePlaylist, deletePlaylist },
    Playlist: {
        songs: (playlistRootValue, args, context, info) => {
            // YOU CAN RETURN AN ARRAY OF SONGS, OR SONG IDs
            // BUT FOR songs FIELD HOWEVER, IT'S SUPPOSED TO BE AN ARRAY OF Song TYPES/OBJECTS
            // THEREFORE, YOU NEED TO TELL MONGO-DB TO deepPopulate THE songs FIELD WITH SONG OBJECTS
            // AND NOT JUST GO "BY DEFAULT" AND ONLY RETURN AN ARRAY OF SONG OBJECT IDs (STRINGS)


        }
    }
};