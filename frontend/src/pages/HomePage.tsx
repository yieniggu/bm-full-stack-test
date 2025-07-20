import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const HomePage = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div className="p-4">Loading user...</div>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-gray-700">
        You can manage your clients, create new estimates, and track their
        progress.
      </p>

      <Link
        to="/clients"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Clients
      </Link>
    </div>
  );
};

export default HomePage;
    