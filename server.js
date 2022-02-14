const express = require("express");
const morgan = require("morgan");
const { NODE_ENV, PORT } = require("./config")
const { DbConnection } = require("./config/db")
const { success, info, error } = require("consola")
const {colors} = require("colors")
const app = express();
const AuthRoute = require("./routes/auth");


let StartServer = async () => {
    try {
      /*-------------------------DATABASE CONNECTION START HERE------------------------*/
      DbConnection();
      /*-------------------------DATABASE ENDS  HERE------------------------*/

      /!-------------------------MIDDLEWARE SECTION START HERE------------------------*/;
      app.use(express.json());
      if (NODE_ENV === "development") {
        app.use(morgan("dev"));
      }

      //?----------------------load route block start here------------------------//

        app.use("/api/auth",AuthRoute)
      //?----------------------load route block start here------------------------//
      //!!------------------LISTEN PORT----------------------------------------/
      app.listen(PORT, err => {
        if (err) {
          error(err);
        } else {
          success(`Server is listening on port number 5000`.blue.bold);
        }
      });
      //!!------------------LISTEN PORT----------------------------------------/
    } catch (err) {
        error(`${err}`.red.bold)
    }
    /!-------------------------MIDDLEWARE SECTION ENdS HERE------------------------*/
    
};
StartServer();


