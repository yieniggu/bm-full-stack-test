import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useClients } from "../hooks/useClients";
import { useEstimates } from "../hooks/useEstimates";

const HomePage = () => {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const { data: clients = [], isLoading: isLoadingClients } = useClients();
  const { data: estimates = [], isLoading: isLoadingEstimates } =
    useEstimates();

  if (isLoadingUser || isLoadingClients || isLoadingEstimates) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const totalClients = clients.length;
  const clientStatusCounts = {
    initiated: 0,
    in_progress: 0,
    completed: 0,
  };

  const totalEstimates = estimates.length;
  const estimateStatusCounts = {
    initiated: 0,
    in_progress: 0,
    completed: 0,
  };

  estimates.forEach((e) => {
    estimateStatusCounts[e.status]++;
    clientStatusCounts[e.status]++;
  });

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-gray-700">
        Here's a quick overview of your business activity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Clients Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Clients</h2>
            <p className="text-gray-600">Total: {totalClients}</p>
            <div className="text-sm text-gray-700 space-y-1">
            
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/clients"
              className="inline-block text-blue-700 hover:underline font-medium"
            >
              View Clients →
            </Link>
          </div>
        </div>

        {/* Estimates Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">Estimates</h2>
            <p className="text-gray-600">Total: {totalEstimates}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>🕒 Initiated: {estimateStatusCounts.initiated}</p>
              <p>🚧 In Progress: {estimateStatusCounts.in_progress}</p>
              <p>✅ Completed: {estimateStatusCounts.completed}</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/estimates"
              className="inline-block text-green-700 hover:underline font-medium"
            >
              View Estimates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
