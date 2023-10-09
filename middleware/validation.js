const Joi = require('joi');
module.exports={
        valUsers: {
        first_name:Joi.string()
        .trim()
        .min(3)
        .required()
        ,
        last_name:Joi.string()
        .trim()
        .min(3)
        .required(),
          email: Joi.string()
            .trim()
            .email()
            .max(100)
            .required(),
          password: Joi.string()
            .trim()
            .min(6)
            .max(200)
            .required(),
          isAuthor: Joi.boolean()
          .required()
          
        },
        valLogin: {
              email: Joi.string()
                .trim()
                .email()
                .required(),
              password: Joi.string()
                .trim()
                .required()
            },
        valBlog: {
          title: Joi.string()
            .trim()
            .min(5)
            .max(200)
            .required(),
          content: Joi.string()
            .trim()
            .min(10)
            .max(500)
            .required()
        },
        valBlogComment: {
            comment: Joi.string()
              .trim()
              .min(1)
              .max(100)
              .required()
          }
}