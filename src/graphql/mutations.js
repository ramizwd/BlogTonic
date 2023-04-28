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
    }
  }
`;
