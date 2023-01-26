import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
};

export const authenticate = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
        state.user = null;
        state.token = null;
        },
        setPosts: (state, action) => {
        state.posts = action.payload.posts;
       },
        setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
         return post;
        });
        state.posts = updatedPosts;
      },
    }
});

export const {setLogin,setLogout,setPost,setPosts } = authenticate.actions;
export default authenticate.reducer;