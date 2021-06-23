import express from "express";
import bodyParser from "body-parser";
import path from "path";
import twitterService  from './services/twitter'
import twitterDataSource  from './data-fetcher/twitter'

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

app.get("/api/ping", (_req, res) => {
    return res.json({
        test: 'test'
    });
});

app.get('/api/twitter/posts/raw', async (req, res) => {
    const postResponse = await twitterDataSource().getPopularTweets({
        search : req.query.q  as string
    });

    return res.json(postResponse)
})

app.get("/api/twitter/posts", async (req, res) => {
    const twitter = twitterService(twitterDataSource())
    const results = await twitter.getPopularTweets({
        search : req.query.q  as string
    })

    console.log(results)
    return  res.json(results)
});


app.get("/*", (_req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});


const port = process.env.PORT || 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});