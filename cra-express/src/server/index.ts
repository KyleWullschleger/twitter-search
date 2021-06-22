import express from "express";
import bodyParser from "body-parser";
import path from "path";

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

app.get("/ping", function (_req, res) {
    return res.json({
        test: 'test'
    });
});

app.get("/*", function (_req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});



const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});