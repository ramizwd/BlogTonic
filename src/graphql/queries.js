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
    }
  }
`;
