// User Queries
export const GET_USER_BY_ID = `
query UsersById($userByIdId: ID!) {
    userById(id: $userByIdId) {
      id
      email
      username
    }
  }
`;

// Post Queries
export const GET_POSTS = `
query Posts {
    posts {
      id
      title
      content
      author {
        id
        email
        username
      }
      createdAt
      updatedAt
      likes
    }
  }
`;

export const GET_POST_BY_ID = `
query PostById($postByIdId: ID!) {
    postById(id: $postByIdId) {
      author {
        id
        email
        username
      }
      id
      title
      content
      createdAt
      updatedAt
      likes
    }
  }
`;

export const GET_POSTS_BY_AUTHOR_ID = `
query PostsByAuthorId($authorId: ID!) {
    postsByAuthorId(authorId: $authorId) {
      author {
        id
        email
        username
      }
      id
      title
      content
      createdAt
      updatedAt
      likes
    }
  }
`;

export const GET_LIKED_POSTS_BY_USER_ID = `
query PostsLikedByUserId($userId: ID!) {
    postsLikedByUserId(userId: $userId) {
      author {
        email
        id
        username
      }
      id
      title
      content
      createdAt
      updatedAt
      likes
    }
  }
  `;
