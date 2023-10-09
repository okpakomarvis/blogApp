

const authenAuthor = (req, res, next) => {
    const { isAuthor } = req.user;
    if (isAuthor === false) {
      return res.json({
        status: 403,
        message: " Unauthorize, Access Denied!"
      });
    }
    next();
  }

  module.exports = authenAuthor;
