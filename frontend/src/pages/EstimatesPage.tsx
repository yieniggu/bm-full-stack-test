import { useEstimates } from "../hooks/useEstimates";
import EstimateCard from "../components/EstimateCard";
import Layout from "../components/layout";

const EstimatesPage = () => {
  const { data: estimates, isLoading } = useEstimates();

  const hasEstimates = estimates && estimates.length > 0;

  return (
    <Layout>
      <div className="flex flex-col p-20 w-full h-full">
        <h1 className="text-2xl font-bold">All Estimates</h1>

        {isLoading && (
          <p className="text-gray-500 mt-20 text-center">
            Loading estimates...
          </p>
        )}

        {!isLoading && !hasEstimates && (
          <p className="text-gray-500 mt-20 text-center">No estimates found.</p>
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
    </Layout>
  );
};

export default EstimatesPage;
