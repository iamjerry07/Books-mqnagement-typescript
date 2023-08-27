import express from "express";
import bodyParser from "body-parser";
import route from "./route";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

let string =
  process.env.MONGODB_CONNECTION_STRING || "your_default_connection_string"; // Provide a default connection string if environment variable is not available

mongoose
  .connect(string, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option as well
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err: Error) => console.log(err)); // Explicitly type 'err' as 'Error'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);
app.listen(port, () =>
  console.log(
    `Rationarium Back End Developer Assessment listening on port ${port}!`
  )
);
