
const BlogModel = require('../model/blogsModel');
const CommentsModel = require('../model/commentModel');
const Joi = require('joi');
const validat = require('../middleware/validation');

// Creating Comment
const createBlogComment = async(req, res, next)=>{
    const blogId = req.params.id;
    let {comment} = req.body;

    const result = Joi.validate(req.body, validat.valBlogComment);
    if (result.error) {
      return res.status(400).send({error:result.error.details[0].message});
    }
    try{
        comment = comment.replace(/([#$@%><*/\\])/g, "").trim();
            const commentBlog = new CommentsModel({
                comment: comment,
                user: req.user._id
        });
        //save comment
        await commentBlog.save();

        const blogPost = await BlogModel.findById(blogId);
         blogPost.comment.push(commentBlog);
        // Saving the blogcomment
        blogPost.save();

        return res.status(200).send({ message: 'comment is created Succesfully'});
    }catch(error){
        return res.status(400).send(error.message)
    }
}

// Get comment by  blog post
const getComment = async(req, res, next)=>{
    const blogId = req.params.id;
        
    try{
        const blogComment = await BlogModel.find({_id:blogId}, {comment:1})
        .populate({path:'comment',populate:{path:'user', select:'first_name last_name'}})

        if(!blogComment){
           return res.status(404).send({message:"No blog found!"})
        }

       return res.status(200).send({
                message:"comments sucessfully retrive",
                comment: blogComment     
        });

    }

    catch(error){
       return res.status(400).send(error.message)
    }

}
module.exports = {createBlogComment, getComment};
