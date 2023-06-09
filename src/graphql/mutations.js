// User Mutations
export const REGISTER_USER = `
  mutation Register($user: UserInput!) {
    register(user: $user) {
      message
      user {
        id
        email
        username
      }
    }
  }
`;

export const LOGIN_USER = `
mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      message
      user {
        id
        email
        username
      }
      token
    }
  }
`;

export const UPDATE_USER = `
mutation UpdateUser($user: UserModify!) {
    updateUser(user: $user) {
      message
      user {
        id
        email
        username
      }
      token
    }
  }
`;

export const ADMIN_UPDATE_USER = `
mutation UpdateUserAsAdmin($updateUserAsAdminId: ID!, $user: UserModify!) {
    updateUserAsAdmin(id: $updateUserAsAdminId, user: $user) {
      user {
        id
        email
        username
      }
      message
    }
  }
`;

export const DELETE_USER = `
mutation DeleteUser {
    deleteUser {
      message
      user {
        email
        id
        username
      }
    }
  }
`;

export const ADMIN_DELETE_USER = `
mutation DeleteUserAsAdmin($deleteUserAsAdminId: ID!) {
    deleteUserAsAdmin(id: $deleteUserAsAdminId) {
      user {
        id
      }
    }
  }
`;

// Post Mutations
export const CREATE_POST = `
mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
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

export const UPDATE_POST = `
mutation UpdatePost($updatePost: UpdatePostInput!) {
    updatePost(updatePost: $updatePost) {
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

export const ADMIN_UPDATE_POST = `
mutation UpdatePostAsAdmin($updatePostAsAdmin: UpdatePostInput!) {
    updatePostAsAdmin(updatePostAsAdmin: $updatePostAsAdmin) {
      author {
        email
        id
        username
      }
      id
      title
      content
      likes
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = `
mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
    }
  }
`;

export const DELETE_POST_AS_ADMIN = `
mutation DeletePostAsAdmin($deletePostAsAdminId: ID!) {
    deletePostAsAdmin(id: $deletePostAsAdminId) {
      id
    }
  }
`;

export const LIKE_POST = `
mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      author {
        email
        id
        username
      }
      content
      createdAt
      id
      title
      updatedAt
      likes
    }
  }
`;

export const UNLIKE_POST = `
mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
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
