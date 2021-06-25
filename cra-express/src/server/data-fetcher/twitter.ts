import { ok } from 'assert'
import fetch from 'node-fetch'
import querystring from 'querystring'
import { TwitterPostsAPIResponse, TwitterDataSource } from '../../types/twitter-type'

const RESULT_TYPE = "popular"
const TWITTER_API_URL = 'https://api.twitter.com/1.1'


export default () : TwitterDataSource => {
    // const getPopularTweets ?

    return { 
        getPopularTweets :  async ({
            search,
            maxId
        }) => {
            const qs = querystring.stringify({
                q : search,
                result_type: RESULT_TYPE,
                count: '5',
                'max_id': maxId,
                tweet_mode: 'extended'
            });
            const response = await fetch(`${TWITTER_API_URL}/search/tweets.json?${qs}`, {
                headers: {
                    //TODO: Get this in a config somewhere.  Also you would never check in a token like this :)
                    Authorization : "Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG"
                }
            });

            const body = await response.json() //(response.bodyUsed ?  : Promise.resolve({}));
            if (response.statusText !== "OK") {
                console.error("Unable to fetch twitter posts", {
                    status : response.status,
                    statusText : response.statusText,
                    body : body,
                });
                throw Error("Unable to fetch tweets");
            }

            return body;
        } 
    };
}
