import express from "express";
import path from "path";
import url from "url";
import mustache from "mustache-express";

/* Serer init parameter */
const app = express();
const addr = "127.0.0.1";
const port = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Current working directory

app.engine("html", mustache());
app.set("view engine", "html"); // use files with .html
app.set("views", __dirname + "/views"); //sets the views folder to be used by render later on

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const db = {
  totalVotes: 0,
  hamster1: 0,
  hamster2: 0,
};

/* Resource routes */
app.get("/", (req, res) => {
  // <-- http://127.0.0.1:3000/
  res.send("You successfully pinged the root resource");
});

app.get("/hamsterwar", (req, res) => {
  res.render("hamsters");
  //   res.send("Hamsters!");
});

app.get("/showRatings", (req, res) => {
  console.log(db.totalVotes);
  res.render("ratings");
});

app.post("/rateHamster1", (req, res) => {
  db.hamster1++;
  db.totalVotes++;

  res.redirect(303, "/showRatings");
});

app.post("/rateHamster2", (req, res) => {
  db.hamster2++;
  db.totalVotes++;

  res.redirect(303, "/showRatings");
});

/* Server startup */
app.listen(port, addr, () => {
  // http://localhost:3000
  console.log(`Server initialized on addr ${addr}`);
  console.log(`Port ${port} is used for server traffic`);
}); // There server awaits connections
