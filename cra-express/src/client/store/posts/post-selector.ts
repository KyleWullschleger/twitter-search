import { Post } from '../../../types/api-type'
import { RootState } from '../index'

export const getUniqueHashtags = () => (state: RootState) => state.postData.posts.map(post => post.hashtags) as string[][]

export const getPostById = (id: number) => (state: RootState) => state.postData.posts.find((post) => post.id === id) as Post

export const getPostsByFilteredHashtags = () => (state: RootState) => state.postData.posts.filter(post => {
    return state.postData.filter.length === 0 || post.hashtags.some(hashtag => state.postData.filter.includes(hashtag))
})