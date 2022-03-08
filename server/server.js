/*
import config to access the port that
the server will listen to
*/
import config from "./../config/config";

//import configured express file
import app from "./express";

//mongoose configuration
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
});



app.listen(config.port, (err) => {
    if (err){
        console.log(err);
    }
    console.info("Server started on port %s.", config.port)
});