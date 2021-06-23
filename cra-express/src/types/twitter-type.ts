export type TwitterPostsAPIResponse = {
    // posts : {
        statuses : {
            text : string,
            user: {
                "screen_name" : string,
                url : string,
                "profile_image_url_https" : string,
                "profile_use_background_image" : string,
            }
        }[],
        "search_metadata" : {
            "next_results": string,
        }
    // }
}

export type TwitterDataSource = {
    getPopularTweets: (query : { 
        search: string, 
        maxId?: string
    }) => Promise<TwitterPostsAPIResponse>
}
