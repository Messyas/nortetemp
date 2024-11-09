import {
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser,
  } from "aws-amplify/auth";
  import { useEffect, useState } from "react";
  
  export default function useAuthUser() {
    const [user, setUser] = useState<Record<string, unknown>>();
  
    useEffect(() => {
      async function getUser() {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
          isAdmin: false,
        };
        setUser(user);
      }
      getUser();
    }, []);
    return user;
  }