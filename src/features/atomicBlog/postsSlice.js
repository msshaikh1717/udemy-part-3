import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const initialState = {
  posts: Array.from({ length: 30 }, () => createRandomPost()),
  archivedPosts: Array.from({ length: 5000 }, () => createRandomPost()),
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectArchivePosts = (state) => state.posts.archivedPosts;
export const { addPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
