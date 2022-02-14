const bcrypt = require("bcryptjs/dist/bcrypt");
const { Schema, model } = require("mongoose");
const AuthSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "please add username"],
      minlength: [6, "username should be minimum 6 character"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "please add email address"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      // /^(?:[\w\!\#\$\%\&\'\\+\-\/\=\?\^\`\{\|\}\~]+\.)[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
    },
    password: {
      type: String,
      require: [true, "please add password"],
      select: false,
      // password not to fetch while downloading
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
  },
  { timestamps: true }
);
AuthSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("user", AuthSchema);
