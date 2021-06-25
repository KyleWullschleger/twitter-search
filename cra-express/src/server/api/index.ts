import express from 'express'
import twitterService  from '../services/twitter'
import twitterDataSource  from '../data-fetcher/twitter'
import { ApiResponse, Posts } from "../../types/api.type";

export default (app : express.Application) => {
    app.get("/api/ping", (_req, res) => {
        return res.json({
            test: 'test'
        });
    });
    
    app.get('/api/twitter/posts/raw', async (req, res) => {
        const postResponse = await twitterDataSource().getPopularTweets({
            search : req.query.q  as string
        });
    
        return res.json(postResponse);
    });
    
    app.get("/api/twitter/posts", async (req, res) => {
        const twitter = twitterService(twitterDataSource());
        try {
            const data = await twitter.getPopularTweets({
                search : req.query.q  as string,
                maxId : req.query.max_id as string, 
            })
            return res.json({
                data,
                status: "success",
            } as ApiResponse<Posts>);
        } catch (e) {
            if(e instanceof Error) {
                return res.json({
                    status: "failed",
                    error : e.message
                } as ApiResponse<Posts>);
            } else {
                console.error("api/twitter/posts", e)
                return res.json({
                    status: "failed",
                    error : "unknown failure"
                } as ApiResponse<Posts>);
            }
        }
    });

    app.get("/api/*", async (req, res) => {
        res.sendStatus(404);
    });
}