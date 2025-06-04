export async function checkToken() {
  const router = useRouter();
  const accessToken = sessionStorage.getItem('access_token');

  if (!accessToken) {
    await router.push('/authorization');
    throw new Error('No access token');
  }
  return accessToken;
}
