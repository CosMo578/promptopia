import Profile from '@components/Profile';

const DynamicProfile = async ({ params, searchParams }) => {
  let posts;

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users/${params?.id}/posts`,
      { cache: 'no-store' }
    );
    posts = await response.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <Profile
      name={searchParams?.name}
      data={posts}
      desc={`Welcome to ${searchParams?.name} personalized profile page. Explore ${searchParams?.name} prompts and be inspired by the power of their imagination`}
      />
  );
};

export default DynamicProfile;
