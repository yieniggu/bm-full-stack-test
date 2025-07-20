import { useParams, useNavigate } from "react-router-dom";
import { useClients, useDeleteClient } from "../hooks/useClients";
import { useState } from "react";
import ClientFormModal from "../components/clientFormModal";

const ClientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: clients, isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const [isEditing, setIsEditing] = useState(false);

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
            onClick={() => setIsEditing(true)}
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

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Estimates</h2>
        <p className="text-gray-500">No estimates yet.</p>
      </div>

      {isEditing && (
        <ClientFormModal client={client} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ClientDetailsPage;
