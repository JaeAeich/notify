const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());

//Used this to that on clg(req.body) doesn't show undefined in the console.
app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
	console.log(`Examples app listening on port no ${port}`);
});
