import express from "express";
import bodyParser from "body-parser";
import path from "path";
import twitterService  from './services/twitter'
import twitterDataSource  from './data-fetcher/twitter'
import { ApiResponse, Posts } from "../types/api-type";

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
    try {
        const data = await twitter.getPopularTweets({
            search : req.query.q  as string,
            maxId : req.query.max_id as string, 
        })
        return res.json({
            data,
            status: "success",
        } as ApiResponse<Posts>)
    } catch (e) {
        if(e instanceof Error) {
            return res.json({
                status: "failed",
                error : e.message
            } as ApiResponse<Posts>)
        } else {
            console.error("api/twitter/posts", e)
            return res.json({
                status: "failed",
                error : "unknown failure"
            } as ApiResponse<Posts>)
        }
    }
});


app.get("/*", (_req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});


const port = process.env.PORT || 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});