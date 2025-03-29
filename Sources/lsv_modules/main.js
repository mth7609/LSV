const lib = require("./database");
const con = require("./ServerFunctions");


//con.serverClose();
con.serverOpen();
lib.databaseServerConnect();
con.topResponse();
