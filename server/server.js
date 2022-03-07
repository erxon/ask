/*
import config to access the port that
the server will listen to
*/
import config from "./../config/config";
/*
import configured express file
*/
import app from "./express";

app.listen(config.port, (err) => {
    if (err){
        console.log(err);
    }
    console.info("Server started on port %s.", config.port)
});