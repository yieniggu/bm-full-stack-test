import { useState } from "react";
import { useClients, useDeleteClient, type Client } from "../hooks/useClients";
import ClientFormModal from "../components/clientFormModal";
import { useNavigate } from "react-router-dom";

const ClientsPage = () => {
  const navigate = useNavigate();
  const { data: clients, isLoading, error } = useClients();
  const deleteClient = useDeleteClient();
  const [client, setClient] = useState<Client | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClientForm = (
    e: React.MouseEvent<HTMLButtonElement>,
    client?: Client
  ) => {
    e.stopPropagation();
    setClient(client as Client);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="p-4">Loading clients...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading clients.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          onClick={handleClientForm as any}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </button>
      </div>

      <ul className="space-y-4">
        {clients?.map((client) => (
          <li
            key={client.id}
            className="bg-white shadow p-4 rounded-md flex justify-between cursor-pointer"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-gray-600">{client.email}</p>
              <p className="text-sm text-gray-600">{client.phone}</p>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={(e) => handleClientForm(e, client)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteClient.mutate(client.id);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <ClientFormModal
          client={client}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClientsPage;
