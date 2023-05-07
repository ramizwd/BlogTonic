# BlogTonic Frontend

BlogTonic is a user-friendly blogging website designed for both individuals and businesses to share their ideas and engage with their audience.

BlogTonic is an ideal platform for bloggers, writers, and content creators of all skill levels, thanks to its intuitive interface.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 16 or higher)
- npm or yarn package manager

### Installing

1.  Clone the repository
2.  Install dependencies using npm or yarn

```bash
npm  i
```

### Configuration

The frontend needs a configuration file to work properly. Create a `.env` file in the root directory with the following variables:

```dotenv
VITE_API_URL=http://localhost:3000/graphql
```

### Running the Application

To start the application in dev mode, use the following command:

```bash
npm  run  dev
```

To build the application, run the following command:

```bash
npm  run  build
```

## Fixes after 5.5
- Minor UI change in profile [0969a72](https://github.com/ramizwd/BlogTonic/commit/0969a7261edaec68409240bfc8dfee362200be34)
- Fixed updating profile info when navigating from a random's profile [17c6768](https://github.com/ramizwd/BlogTonic/commit/17c6768b70a788d75808555255160548696afa34)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ramizwd/BlogTonic/blob/main/LICENSE) file for details.
