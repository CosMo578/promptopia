'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ handleTagClick, filteredPost }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {filteredPost?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState();
  const [filteredPost, setFilteredPost] = useState();

  useEffect(() => {
    if (searchText === '') {
      setFilteredPost(posts);
      return;
    }

    const filterPost = posts?.filter(
      (post) =>
        post.creator.username
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredPost(filterPost);
  }, [filteredPost, posts, searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');

      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='w-full relative flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        filteredPost={filteredPost}
        handleTagClick={(tag) => setSearchText(tag)}
      />
    </section>
  );
};

export default Feed;
