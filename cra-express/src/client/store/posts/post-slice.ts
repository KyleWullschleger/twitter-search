import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..';
import { Post, MetaData, Posts, ApiResponse,  } from '../../../types/api.type'

export type TwitterState = {
    posts : Post[]
    meta: MetaData
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    search: string
    error: string | null
    filter: string[]
};

const initialState : TwitterState = {
  posts: [],
  status: 'idle',
  error: null,
  meta: {
      maxId : "",
  },
  search: "",
  filter: []
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (text : string = "") => {
  if(!text) return await Promise.resolve(null)
  
  const response = await fetch(`/api/twitter/posts?q=${text}`);
  return await response.json() as ApiResponse<Posts>;
});

export const fetchMorePosts = createAsyncThunk('posts/fetchPosts/more', async (_, { getState }) => {
  const state = getState() as RootState;
  const response = await fetch(`/api/twitter/posts?q=${state.postData.search}&max_id=${state.postData.meta.maxId}`);
  return await response.json() as ApiResponse<Posts>;
});


const twitterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateSearch(state, action) {
      state.search = action.payload;
    },
    addFilter(state, action) {
      state.filter = [...state.filter, action.payload];
    },
    removeFilter(state, action) {
      state.filter = state.filter.filter(hashtag => hashtag !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, _action) => {
      state.status = 'loading';
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if(action.payload !== null) {
        const data = action.payload.data || initialState
        state.posts = [...(data.posts || [])];
        state.meta.maxId = data.meta.maxId;
        state.error = null;
        state.filter = [];
      } else {
        state.posts = [];
        state.meta.maxId = "";
        state.error = null;
        state.filter = [];
      }
    });

    builder.addCase(fetchPosts.rejected, (state, _action) => {
      state.status = 'failed';
    });

    builder.addCase(fetchMorePosts.pending, (state, _action) => {
      state.status = 'loading';
    });

    builder.addCase(fetchMorePosts.fulfilled, (state, action) => {
        const data = action.payload.data || initialState
        state.status = 'succeeded';
        state.posts = [...state.posts, ...data.posts || []];
        state.meta.maxId = data.meta.maxId;
        state.error = null;
    });

    builder.addCase(fetchMorePosts.rejected, (state, _action) => {
      state.status = 'failed';
    });
  },
})

export const { updateSearch, addFilter, removeFilter } = twitterSlice.actions;

export default twitterSlice.reducer;

/*
  Note to reviewers:
  This is using the newer redux toolkit, but you can achieve the same thing doing the old fashion way.
  Just have to make sure you are being stateless and not updating the state directly

  You would create a function like this and put it on the store 
   (state : TwitterState = initalState, action : ActionType) : TwitterState => {
    const { payload, type } = action;

    switch(type) {
      case UPDATE_SEARCH:
          return {...state, search:payload};
      case ADD_FILTER:
          return { 
              ...state, 
              filter : [...state.filter, action.payload]
          };
    
    ect .... 

    dispatch would then be dispatch({type : UPDATE_SEARCH, payload: data}) instead of passing in a function
*/