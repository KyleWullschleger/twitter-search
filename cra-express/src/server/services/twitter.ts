import { TwitterDataSource } from '../../types/twitter-type'
import { Posts } from '../../types/api-type'

export default (twitterDataSource: TwitterDataSource) => {
    
    const getPopularTweets = async ({
        search
    } : {
        search: string,
    }) : Promise<Posts> => {
        const postResponse = await twitterDataSource.getPopularTweets({
            search
        });

        console.log(postResponse)
        
        return {
            meta : {
                qsNextResults: postResponse.search_metadata.next_results
            },
            posts : postResponse.statuses.map(status => ({
                profileImageURL : status.user.profile_image_url_https,
                text: status.text,
                url: status.user.url,
                userName: status.user.screen_name
            }))
        };
    };

    return { getPopularTweets } ;
}
