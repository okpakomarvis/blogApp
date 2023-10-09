const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment:{
        type: String,
        required: true,    
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
    {timestamp: true}
)
const comment = mongoose.model("Comments", commentSchema);

module.exports = comment;