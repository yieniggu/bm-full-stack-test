import { useState } from "react";
import { useClients, useDeleteClient, type Client } from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import ClientFormModal from "../components/clientFormModal";

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
    setClient(client);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="p-4">Loading clients...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading clients.</div>;

  const hasClients = clients && clients.length > 0;

  return (
    <Layout>
      <div className="relative flex flex-col w-full h-full p-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>

        {!isLoading && !hasClients && (
          <p className="text-gray-500 mt-20 text-center">No clients found.</p>
        )}

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

        <button
          onClick={(e) => handleClientForm(e)}
          className="fixed bottom-8 right-8 z-10 bg-blue-600 hover:bg-blue-700 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          title="Add Client"
        >
          +
        </button>

        {isModalOpen && (
          <ClientFormModal
            client={client}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ClientsPage;
