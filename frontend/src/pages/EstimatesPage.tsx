import { useEstimates } from "../hooks/useEstimates";
import EstimateCard from "../components/EstimateCard";

const EstimatesPage = () => {
  const { data: estimates, isLoading } = useEstimates();

  const hasEstimates = estimates && estimates.length > 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">All Estimates</h1>

      {isLoading && <p className="text-gray-500">Loading estimates...</p>}

      {!isLoading && !hasEstimates && (
        <p className="text-gray-500">No estimates found.</p>
      )}

      {!isLoading && hasEstimates && (
        <div className="space-y-4">
          {estimates.map((estimate) => (
            <EstimateCard
              key={estimate.id}
              estimate={estimate}
              clientId={estimate.clientId}
              clientName={estimate.client?.name || "Unknown Client"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EstimatesPage;
