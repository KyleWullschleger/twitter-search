import { TwitterDataSource } from '../../types/twitter.type'
import { Posts } from '../../types/api.type'
import { parse } from "querystring"

const URL_REGEX = /(https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g
export default (twitterDataSource: TwitterDataSource) => {
    
    const getPopularTweets = async ({
        search,
        maxId
    } : {
        search: string,
        maxId: string
    }) : Promise<Posts> => {
        const postResponse = await twitterDataSource.getPopularTweets({
            search,
            maxId
        });
        const nextResults = parse(postResponse?.search_metadata?.next_results?.substring(1) || '');
        
        
        return {
            meta : {
                maxId: (nextResults?.max_id || "") as string
            },
            posts : postResponse.statuses.map(status => {
                //This seemed to switch as I was developing this.  So I'm looking for both.  The docs say text but I'm getting full_text
                const tweetContent = status.full_text || status.text || "";
                const embeddedUrl = tweetContent.match(URL_REGEX)?.map(url => url as string);
                

                return {
                    id: status.id,
                    profileImageURL : status.user.profile_image_url_https,
                    embeddedUrl : embeddedUrl,
                    text: tweetContent.replace(URL_REGEX, ''),
                    url: `https://twitter.com/${status.user.screen_name}/status/${status.id_str}`,
                    displayUrl: status.user.url,
                    userName: status.user.screen_name,
                    hashtags: status.entities.hashtags.map(hashtag => hashtag.text)
                };
            }),
            
        };
    };

    return { getPopularTweets } ;
}
