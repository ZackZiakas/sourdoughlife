/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CommunityContext = createContext(null);

const COMMUNITY_STORAGE_KEY = "sourdoughlife-community-posts";

const starterPosts = [
  {
    id: "starter-post-1",
    author: "Emma",
    recipeTitle: "Beginner Sourdough Loaf",
    rating: 5,
    content:
      "This was my best oven spring so far. I extended bulk fermentation by about 30 minutes and scored the loaf slightly deeper.",
    likes: 8,
    likedByCurrentUser: false,
    isOwnedByCurrentUser: false,
    createdAt: "2026-08-04T14:30:00.000Z",
  },
  {
    id: "starter-post-2",
    author: "Marcus",
    recipeTitle: "Sourdough Bagels",
    rating: 4,
    content:
      "The flavor was excellent. Next time I will boil them a little longer for a chewier crust.",
    likes: 5,
    likedByCurrentUser: false,
    isOwnedByCurrentUser: false,
    createdAt: "2026-08-03T18:15:00.000Z",
  },
];

function getStoredPosts() {
  try {
    const storedPosts = localStorage.getItem(COMMUNITY_STORAGE_KEY);

    if (!storedPosts) {
      return starterPosts;
    }

    const parsedPosts = JSON.parse(storedPosts);

    return Array.isArray(parsedPosts) ? parsedPosts : starterPosts;
  } catch (error) {
    console.error("Unable to read community posts:", error);
    return starterPosts;
  }
}

function createPostId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function CommunityProvider({ children }) {
  const [posts, setPosts] = useState(getStoredPosts);

  useEffect(() => {
    try {
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Unable to save community posts:", error);
    }
  }, [posts]);

  function addPost(postData) {
    const newPost = {
      id: createPostId(),
      author: postData.author.trim() || "Zach",
      recipeTitle: postData.recipeTitle,
      rating: Number(postData.rating),
      content: postData.content.trim(),
      likes: 0,
      likedByCurrentUser: false,
      isOwnedByCurrentUser: true,
      createdAt: new Date().toISOString(),
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);

    return newPost;
  }

  function deletePost(postId) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  }

  function togglePostLike(postId) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const nextLikedState = !post.likedByCurrentUser;

        return {
          ...post,
          likedByCurrentUser: nextLikedState,
          likes: Math.max(0, post.likes + (nextLikedState ? 1 : -1)),
        };
      }),
    );
  }

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (firstPost, secondPost) =>
          new Date(secondPost.createdAt).getTime() -
          new Date(firstPost.createdAt).getTime(),
      ),
    [posts],
  );

  const contextValue = {
    posts: sortedPosts,
    postCount: posts.length,
    addPost,
    deletePost,
    togglePostLike,
  };

  return (
    <CommunityContext.Provider value={contextValue}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error("useCommunity must be used inside CommunityProvider");
  }

  return context;
}
