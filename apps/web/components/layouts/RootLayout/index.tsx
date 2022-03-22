import { LoadingOverlay } from "@mantine/core";
import { Header } from "components/Header";
import { useMe } from "lib/hooks/useMe";
import { AuthModal } from "components/AuthModal";
import { useRouter } from "next/router";

export const RootLayout: React.FC = ({ children }) => {
  const { loading } = useMe();
  const { query, replace, asPath } = useRouter();

  // If the user is not loaded, show a loading overlay
  if (loading) return <LoadingOverlay visible />;

  console.log("QUERY => ", query);

  return (
    <div>
      <Header />
      {children}
      <AuthModal opened={!!query.auth} />
    </div>
  );
};
