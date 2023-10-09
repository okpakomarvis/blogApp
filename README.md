# blogApp

## Introduction
this a blogging webservice delivered via RESTFULL APIs that allow client to create blog and comments on post.

## Documentation:
***
check the blog Application.postman_collection.json for all tested APIs and response, the file is in the root folder of this project

### List of APIs
- create new user 
  Post: http://localhost:3000/api/v1/signup
- login 
   Post: http://localhost:3000/api/v1/login
- create a blog by author 
  Post: http://localhost:3000/api/v1/createBlog
- get All Blog post
  GET: http://localhost:3000/api/v1/getpost
- get blog created by a author
  GET: http://localhost:3000/api/v1/getpostAuthor
- create comment by user on a blog post
  GET: http://localhost:3000/api/v1/createComment/:blogId
- get all comment on a Blog Post
  Get: http://localhost:3000/api/v1/getpostComment/:blogId


