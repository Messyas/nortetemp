import { fetchAuthSession} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<{ isLoggedIn: boolean } | undefined>();

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        setUser({ isLoggedIn: false });
        return;
      }
      
      setUser({ isLoggedIn: true });
    }

    getUser();
  }, []);

  return user;
}
