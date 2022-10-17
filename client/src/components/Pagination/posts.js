import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(posts)

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
         <p>{post.moviename}</p>
          {post.imdb}
        </li>
      ))}
    </ul>
  );
};

export default Posts;