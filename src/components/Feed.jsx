'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {
  const [searchText, setSearchText] = useState()
  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          // onChange={handleSearchText}
          required
          className='search_input peer'
        />
      </form>
    </section>
  );
};

export default Feed;
