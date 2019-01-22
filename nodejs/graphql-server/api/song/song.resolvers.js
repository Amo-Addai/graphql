import { Song } from './song.model'

// rootValue (from parent node in graph), args (for all params)
// context (of this current resolver), info (extra information)
const getSong = (rootValue, args, context, info) => {
    return Song.findById(args.id).exec();
    // YOU CAN DEFINE ARGS AS -> (rootValue, {id, and, other, props}, context, ..)
    // THEREFORE args == { id, and, other, props }
}, allSongs = (rootValue, args, context, info) => {
    return Song.find({}).exec()
}, 

// AND NOW, DEFINE THE MUTATION RESOLVERS ...

newSong = async (rootValue, {input}, {req, user}, info) => {
    var song = input; // PERFORM SOME VALIDATIONS ON input FIRST (AS NewSong GRAPH-QL input OBJECT)
    return Song.create(song) // MAKE SURE THIS RETURNED OBJECT HAS Song GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Song RETURN OBJECT SHOULD HAVE
},
updateSong = async (rootValue, {input}, {req, user}, info) => {
    // PERFORM SOME VALIDATIONS ON input FIRST (AS UpdatedSong GRAPH-QL input OBJECT)
    const {id, ...update} = input;
    return Song.findByIdAndUpdate(id, update, {new: true}).exec()
    // OR RUN THIS INSTEAD ..
    var song = await Song.findById(input.id);
    delete input.id; // REMOVE THIS SO IT DOESN'T GET CREATED ON THE MONGO-DB OBJECT
    // REMEMBER MONGO-DB DOESN'T HAVE .id BUT ._id (SO .id IS "NEW")
    merge(song, input)
    return song.save() // MAKE SURE THIS RETURNED OBJECT HAS Song GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Song RETURN OBJECT SHOULD HAVE
},
deleteSong = async (rootValue, {input}, {req, user}, info) => {
    // PERFORM SOME VALIDATIONS ON input FIRST (AS DeletedSong GRAPH-QL input OBJECT)
    return Song.findByIdAndRemove(input.id).exec()
    // OR RUN THIS INSTEAD ..
    var song = await Song.findById(input.id);
    return song.remove() // MAKE SURE THIS RETURNED OBJECT HAS Song GRAPH-QL PARAMS
    // YOU DEFINED A SPECIFIC SET OF PROPERTIES THE Song RETURN OBJECT SHOULD HAVE
};

export const songResolvers = {
    Query: { Song: getSong, allSongs },
    Mutation: { newSong, updateSong, deleteSong },
    Song: {
        
    }
};