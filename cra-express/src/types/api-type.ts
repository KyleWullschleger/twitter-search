export type Posts = {
    posts : Post[]
    meta : MetaData
}

export type Post = {
    id: number
    text: string
    userName: string
    url?: string
    embeddedUrl? : string
    displayUrl? : string
    profileImageURL: string
    hashtags: string[]
}

export type MetaData = {
    maxId : string
}

export type ApiResponse<T> = {
    status: 'success' | 'failed'
    error?: string
    data? : T
}