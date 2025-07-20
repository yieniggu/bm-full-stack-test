import { useState } from "react";
import { Link } from "react-router-dom";
import EstimateFormModal from "./EstimateFormModal";
import type { Estimate } from "../hooks/useEstimates";
import { useUpdateEstimate, useDeleteEstimate } from "../hooks/useEstimates";

interface Props {
  estimate: Estimate;
  clientId: string;
  clientName: string;
}

const EstimateCard = ({ estimate, clientId, clientName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingMaterials, setIsAddingMaterials] = useState(false);

  const updateEstimate = useUpdateEstimate();
  const deleteEstimate = useDeleteEstimate();

  const handleMarkCompleted = () => {
    updateEstimate.mutate({ id: estimate.id, status: "completed" });
  };

  const handleDelete = () => {
    deleteEstimate.mutate({
      id: estimate.id,
      clientId: estimate.client?.id as string,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{estimate.title}</h3>
        <p className="text-sm text-gray-600">{estimate.description}</p>
        <p className="text-sm text-gray-600">
          Labor: ${estimate.laborCost} | Materials: ${estimate.materialsTotal} |
          Total: ${estimate.totalCost}
        </p>
        <p className="text-sm text-gray-500">
          Client:{" "}
          <Link
            to={`/clients/${clientId}`}
            className="text-blue-600 hover:underline"
          >
            {clientName}
          </Link>
        </p>
        <p
          className={`text-sm font-medium capitalize ${
            estimate.status === "initiated"
              ? "text-yellow-500"
              : estimate.status === "in_progress"
              ? "text-orange-500"
              : "text-green-500"
          }`}
        >
          {estimate.status}
        </p>

        <div className="mt-2 text-xs text-gray-400">
          <p>Created on: {formatDate(estimate.createdAt)}</p>
          <p>Last Updated on: {formatDate(estimate.updatedAt)}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => setIsAddingMaterials(true)}
            className="text-green-600 hover:underline"
          >
            Add Materials
          </button>
        </div>

        {estimate.status === "in_progress" && (
          <button
            onClick={handleMarkCompleted}
            className="text-sm text-purple-600 hover:underline"
          >
            Mark as Completed
          </button>
        )}

        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>

      {isEditing && (
        <EstimateFormModal
          clientId={clientId}
          initialEstimate={estimate}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isAddingMaterials && (
        <EstimateFormModal
          clientId={clientId}
          initialEstimate={estimate}
          mode="materials-only"
          onClose={() => setIsAddingMaterials(false)}
        />
      )}
    </div>
  );
};

export default EstimateCard;
