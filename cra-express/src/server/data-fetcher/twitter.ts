import fetch from 'node-fetch'
import querystring from 'querystring'
import { TwitterDataSource } from '../../types/twitter.type'
import { getConfig } from '../configuration'

const RESULT_TYPE = "popular"
const TWITTER_API_URL = 'https://api.twitter.com/1.1'


export default () : TwitterDataSource => {
    
    const { twitterToken } = getConfig();

    return { 
        getPopularTweets :  async ({
            search,
            maxId
        }) => {
            const qs = querystring.stringify({
                q : search,
                result_type: RESULT_TYPE,
                count: '5',
                max_id: maxId,
                tweet_mode: 'extended'
            });
            const response = await fetch(`${TWITTER_API_URL}/search/tweets.json?${qs}`, {
                headers: {
                    Authorization : twitterToken
                }
            });
            
            if (response.statusText !== "OK") {
                console.error("Unable to fetch twitter posts", {
                    status : response.status,
                    statusText : response.statusText
                });
                throw Error("Unable to fetch tweets");
            }

            const body = await response.json(); 

            return body;
        } 
    };
}
