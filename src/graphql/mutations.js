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
