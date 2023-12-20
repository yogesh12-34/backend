const passport = require("passport");

exports.isAuth=(req,res,done)=>{
    return passport.authenticate(`jwt`)
  };
  exports.sanitizeUser=(user)=>{
    return{id:user.id,role:user.role}
  }
  exports.cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
   // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODE1MjVjZDc2MTg0ZjMxMjliOGFhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAyOTc0MDkxfQ.rjqmg6vJZ7BAgyPQcyClDuykO6PYeAomk8kJzCHOprA"
    return token;
  };