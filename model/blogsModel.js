const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,    
    },
    content:{
        type: String,
    },
    author:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    }],
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
},
    {timestamp: true}
)
const blog = mongoose.model("Blogs", blogSchema);

module.exports = blog;