import { useEffect, useState } from "react";
import {
  useCreateClient,
  useUpdateClient,
  type Client,
} from "../hooks/useClients";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface ClientFormModalProps {
  onClose: () => void;
  client?: Client;
}

const ClientFormModal = ({ onClose, client }: ClientFormModalProps) => {
  const isEditMode = !!client;
  const { data: user } = useCurrentUser();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        email: client.email,
        phone: client.phone || "",
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (isEditMode && client?.id) {
      updateClient.mutate(
        {
          id: client.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          userId: client.userId,
        },
        {
          onSuccess: onClose,
        }
      );
    } else {
      if (!user?.id) return;
      createClient.mutate(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          userId: user.id,
        },
        {
          onSuccess: onClose,
        }
      );
    }
  };

  const isLoading = createClient.isPending || updateClient.isPending;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Client" : "Add New Client"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEditMode ? "Update" : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientFormModal;
