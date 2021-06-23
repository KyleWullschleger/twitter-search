export type Posts = {
    posts : {
        text: string
        userName: string
        url: string
        profileImageURL: string
    }[],
    meta : {
        qsNextResults : string
    }
}
