import { useParams, useNavigate } from "react-router-dom";
import { useClients, useDeleteClient } from "../hooks/useClients";
import { useState } from "react";
import ClientFormModal from "../components/clientFormModal";
import { useEstimatesByClient } from "../hooks/useEstimates";
import EstimateCard from "../components/EstimateCard";
import EstimateFormModal from "../components/EstimateFormModal";
import type { Estimate } from "../hooks/useEstimates";

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
    <div className="p-6 max-w-3xl mx-auto space-y-4">
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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Estimates</h2>
          <button
            onClick={() => setIsCreatingEstimate(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            + Add Estimate
          </button>
        </div>

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
  );
};

export default ClientDetailsPage;
