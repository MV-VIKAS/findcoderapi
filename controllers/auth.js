const Authschema = require("../models/Auth");
const {success,error,info}= require("consola")

/* Access public
@http request post
@url api/auth/sign 
*/
exports.Signup = async (req, res) => {
  try {
        let { username, email, password, role } = req.body;
        let payload = new Authschema({
          username,
          password,
          email,
          role,
        });
      
      //SAVE INTO DATABASE
      let data = await Authschema.create(payload);
      res.status(201).json({ message: "successful user regiistered", data });
  } catch (err) {
      error(err);
      res.status(501).json({ message: "SERVER ERROR" });
  }
};
