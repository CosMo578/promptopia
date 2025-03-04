'use client';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const DynamicProfile = ({ params, searchParams }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={searchParams?.name}
      data={posts}
      desc={`Welcome to ${searchParams?.name} personalized profile page. Explore ${searchParams?.name} prompts and be inspired by the power of their imagination`}
    />
  );
};

export default DynamicProfile;
