export type TwitterPostsAPIResponse = {
    statuses : {
        id: number
        id_str: string
        full_text : string
        text?: string
        user: {
            screen_name : string
            url : string
            profile_image_url_https : string
            profile_use_background_image : string
        },
        entities : {
            hashtags : {
                text: string
            }[],
            urls : {
                url : string
                display_url: string
            }[]
        }
    }[],
    search_metadata : {
        next_results: string
    }
}

export type TwitterDataSource = {
    getPopularTweets: (query : { 
        search: string, 
        maxId?: string
    }) => Promise<TwitterPostsAPIResponse>
}
