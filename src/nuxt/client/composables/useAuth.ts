import { api } from '#shared/api/axios';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';
import type { User } from '~/interfaces/adminGlobal';

export const useAuth = () => {
  const accessToken = useState<string | null>('access_token', () => null);
  onMounted(async () => {
    // const storedToken = sessionStorage.getItem('access_token')
    //
    // if (storedToken && !isExpired(storedToken)) {
    //   accessToken.value = storedToken
    // } else {
    //   await refresh()  // <-- здесь вызов, если токена нет или он просрочен
    // }
    //
    // // запуск интервала для периодической проверки
    // const interval = setInterval(async () => {
    //   if (accessToken.value && isExpired(accessToken.value)) {
    //     await refresh()  // <-- здесь периодический вызов, если токен просрочен
    //   }
    // }, 60_000)
    //
    // onUnmounted(() => clearInterval(interval))
  });
};
