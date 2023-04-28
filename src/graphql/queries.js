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
