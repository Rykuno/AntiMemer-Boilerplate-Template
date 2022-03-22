import { Button } from "ui";
import { useMe } from "lib/hooks/useMe";

export default function Web() {
  const { me, loading } = useMe();

  return (
    <div>
      <h1>Web</h1>
      <h1>{me?.email}</h1>
      <Button />
    </div>
  );
}
