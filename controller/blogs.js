const userModel = require('../model/usersModel');
const blogModel = require('../model/blogsModel');
const Joi = require('joi');
const validat = require('../middleware/validation');

// Creating blog
const createBlog = async(req, res, next)=>{
    let {title, content} = req.body;

    const result = Joi.validate(req.body, validat.valBlog);
    if (result.error) {
      return res.status(400).send({error:result.error.details[0].message});
    }
    try{
        //sanitize data
        title = title.replace(/([#$@%><*/\\])/g, "").trim();
        content = content.replace(/([#$@%><*/\\])/g, "").trim();
        const userBlog = await userModel.findById(req.user._id);

            const blog = new blogModel({
                title: title,
                content: content,
                author: userBlog
        })

        // Saving the blog
        await blog.save();
        return res.status(200).send({ message: 'Blog is created Succesfully'});
    }catch(error){
        return res.status(400).send(error.message)
    }
}

// Getting all blogs created
const getAllBlog = async(req, res, next)=>{
        
    try{
        const blog = await blogModel.find()
        .populate({path:'comment',populate:{path:'user', select:'first_name last_name'}})
        .populate('author',{ first_name: 1, last_name: 1, email:1 })
        .exec();

        if(!blog){
           return res.status(404).send({message:"No blog found!"})
        }

        return res.status(200).send({
                message:"blogs sucessfully retrive",
                blog: blog      
        });

    }

    catch(error){
       return res.status(400).send(error.message)
    }

}

// Getting  specific Author blogs created
const getAuthorBlog = async(req, res, next)=>{
        
    try{
        const blog = await blogModel.find({author: req.user._id})
        .populate('author',{ first_name: 1, last_name: 1, email:1 })
        .populate({path:'comment',populate:{path:'user', select:'first_name last_name'}})
        .exec();

        if(!blog){
           return res.status(404).send({message:"No blog found!"})
        }

       return res.status(200).send({
                message:"blogs sucessfully retrive",
                blog: blog      
        });

    }

    catch(error){
        return res.status(400).send(error.message)
    }

}


module.exports = {createBlog, getAllBlog, getAuthorBlog};
