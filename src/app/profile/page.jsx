'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);

      const data = await response.json();

      setPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete thsis prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
