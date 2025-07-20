import { useCurrentUser } from "./hooks/useCurrentUser";

function App() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading user...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
    </div>
  );
}

export default App;
