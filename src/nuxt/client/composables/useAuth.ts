export const useAuth = () => {
  const isExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  };
  console.log(2313);
  onMounted(async () => {
    const accessToken = sessionStorage.getItem('access_token');

    // if (a)
    //   if (!accessToken && isExpired(accessToken)) {
    //     await refresh(); // <-- здесь вызов, если токена нет или он просрочен
    //   }
    const interval = setInterval(async () => {
      // if (accessToken && isExpired(accessToken.value)) {
      //   await refresh(); // <-- здесь периодический вызов, если токен просрочен
      // }
    }, 5_000);
    //
    // onUnmounted(() => clearInterval(interval));
  });
};
