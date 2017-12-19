const authors = [
  {
    id: 'a1',
    firstName: 'Foo',
    lastName: 'Bar',
    posts: [],
  }
];

const posts = [
  {
    id: 'p1',
    title: 'Hello World',
    author: null,
    votes: 0,
  }
];

const constructedAuthors = authors.map((author, index) => {
  return {
    ...author,
    posts: [ posts[index] ],
  };
});

const constructedPosts = posts.map((post, index) => {
  return {
    ...post,
    author: constructedAuthors[index],
  };
});

export const resolvers = {
  Query: {
    posts() {
      return constructedPosts;
    },
    post(_, { postId }) {
      return constructedPosts.find(post => post.id === postId);
    },
    authors() {
      return constructedAuthors;
    },
    author(_, { authorId }) {
      return constructedAuthors.find(author => author.id === authorId);
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = constructedPosts.find(post => post.id === postId);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
    authorPost(_, { authorId, postTitle }) {
      const id = `p${constructedPosts.length + 1}`;
      const author = constructedAuthors.find(author => author.id === authorId);
      const newPost = {
        id,
        title: postTitle,
        author: author,
        votes: 0,
      };
      
      constructedPosts.push(newPost);
      author.posts.push(newPost);
      return newPost;
    }
  },
};
