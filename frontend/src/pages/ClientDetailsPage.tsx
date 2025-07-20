import { useParams, useNavigate } from "react-router-dom";
import { useClients, useDeleteClient } from "../hooks/useClients";
import { useState } from "react";
import ClientFormModal from "../components/clientFormModal";
import { useEstimatesByClient } from "../hooks/useEstimates";
import EstimateCard from "../components/EstimateCard";
import EstimateFormModal from "../components/EstimateFormModal";
import type { Estimate } from "../hooks/useEstimates";
import Layout from "../components/layout";

const ClientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: clients, isLoading } = useClients();
  const { data: estimates } = useEstimatesByClient(id!);
  const deleteClient = useDeleteClient();

  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isCreatingEstimate, setIsCreatingEstimate] = useState(false);

  const client = clients?.find((c) => c.id === id);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!client) return <div className="p-4 text-red-500">Client not found.</div>;

  const handleDelete = () => {
    deleteClient.mutate(client.id, {
      onSuccess: () => navigate("/clients"),
    });
  };

  return (
    <Layout>
      <div className="flex flex-col p-20">
        <h1 className="text-2xl font-bold">Client Details</h1>

        <div className="bg-white shadow p-4 rounded space-y-2">
          <p>
            <strong>Name:</strong> {client.name}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Phone:</strong> {client.phone}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsEditingClient(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Estimates</h2>
          {estimates?.length ? (
            estimates.map((estimate) => (
              <EstimateCard
                key={estimate.id}
                estimate={estimate}
                clientId={client.id}
                clientName={client.name}
              />
            ))
          ) : (
            <p className="text-gray-500">No estimates yet.</p>
          )}
        </div>

        {isEditingClient && (
          <ClientFormModal
            client={client}
            onClose={() => setIsEditingClient(false)}
          />
        )}

        {isCreatingEstimate && (
          <EstimateFormModal
            clientId={client.id}
            onClose={() => setIsCreatingEstimate(false)}
          />
        )}
      </div>

      {/* Floating Add Estimate Button */}
      <button
        onClick={() => setIsCreatingEstimate(true)}
        className="fixed bottom-8 right-8 z-10 bg-yellow-600 hover:bg-yellow-700 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        title="Add Estimate"
      >
        +
      </button>
    </Layout>
  );
};

export default ClientDetailsPage;
