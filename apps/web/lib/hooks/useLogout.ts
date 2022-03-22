import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

export const useLogout = () => {
  const client = useApolloClient();
  const router = useRouter();
  const handleLogout = async () => {
    // await router.replace("/logout");
    await fetch("/api/logout", { method: "post" });
    await client.resetStore();
  };
  return handleLogout;
};
