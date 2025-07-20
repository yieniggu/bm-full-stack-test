import { useState, useEffect } from "react";
import {
  useCreateEstimate,
  useUpdateEstimate,
  type Estimate,
} from "../hooks/useEstimates";
import MaterialRow from "./MaterialRow";

type Material = {
  name: string;
  quantity: number;
  unitPrice: number;
};

type Props = {
  onClose: () => void;
  clientId: string;
  initialEstimate?: Estimate;
  mode?: "full" | "materials-only";
};

const EstimateFormModal = ({
  onClose,
  clientId,
  initialEstimate,
  mode = "full",
}: Props) => {
  const isEdit = !!initialEstimate;
  const isMaterialsOnly = mode === "materials-only";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [laborCost, setLaborCost] = useState(0);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialsTotal, setMaterialsTotal] = useState(0);
  const [originalMaterialsTotal, setOriginalMaterialsTotal] = useState(0);
  const [resetMaterials, setResetMaterials] = useState(false);

  const [newMaterial, setNewMaterial] = useState<Material>({
    name: "",
    quantity: 0,
    unitPrice: 0,
  });

  const createEstimate = useCreateEstimate();
  const updateEstimate = useUpdateEstimate();

  useEffect(() => {
    if (initialEstimate) {
      setTitle(initialEstimate.title);
      setDescription(initialEstimate.description);
      setLaborCost(initialEstimate.laborCost);
      setMaterialsTotal(initialEstimate.materialsTotal);
      setOriginalMaterialsTotal(initialEstimate.materialsTotal);
    }
  }, [initialEstimate]);

  useEffect(() => {
    const total = materials.reduce(
      (acc, m) => acc + m.quantity * m.unitPrice,
      0
    );
    setMaterialsTotal(originalMaterialsTotal + total);
  }, [materials, originalMaterialsTotal]);

  useEffect(() => {
    if (resetMaterials) {
      setOriginalMaterialsTotal(0);
    } else if (initialEstimate) {
      setOriginalMaterialsTotal(initialEstimate.materialsTotal);
    }
  }, [resetMaterials, initialEstimate]);

  const addMaterial = () => {
    if (
      !newMaterial.name ||
      newMaterial.quantity <= 0 ||
      newMaterial.unitPrice <= 0
    )
      return;
    setMaterials([...materials, newMaterial]);
    setNewMaterial({ name: "", quantity: 0, unitPrice: 0 });
  };

  const removeMaterial = (index: number) => {
    const updated = [...materials];
    updated.splice(index, 1);
    setMaterials(updated);
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      laborCost,
      materialsTotal,
      clientId,
    };

    if (isEdit && initialEstimate) {
      updateEstimate.mutate(
        { ...data, id: initialEstimate.id },
        { onSuccess: onClose }
      );
    } else {
      createEstimate.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded w-full max-w-xl space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Estimate" : "Add Estimate"}
        </h2>

        {!isMaterialsOnly && (
          <div>
            <label className="mb-2">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}

        {!isMaterialsOnly && (
          <div>
            <label className="mb-2">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        {isMaterialsOnly ? (
          <div>
            <p className="text-sm text-gray-700">Labor Cost</p>
            <p className="border rounded p-2 bg-gray-100">${laborCost}</p>
          </div>
        ) : (
          <div>
            <label className="mb-2">Labor Cost</label>
            <div className="flex flex-row gap-2 items-center">
              $
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {isEdit && !isMaterialsOnly && (
          <div className="bg-yellow-50 border border-yellow-300 p-2 text-sm rounded">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={resetMaterials}
                onChange={(e) => setResetMaterials(e.target.checked)}
              />
              Reset Material Costs
            </label>
            <p className="text-xs mt-1 text-gray-600">
              This will reset the material total and let you add new ones.
              Unchecking will restore original.
            </p>
          </div>
        )}

        {(resetMaterials || !isEdit || isMaterialsOnly) && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div>
                <label className="mb-2">Material Name</label>
                <input
                  type="text"
                  className="flex-1 border p-2 rounded"
                  value={newMaterial.name}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2">Qty</label>
                <input
                  type="number"
                  className="w-24 border p-2 rounded"
                  value={newMaterial.quantity}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2">Unit Price</label>
                <input
                  type="number"
                  className="w-28 border p-2 rounded"
                  value={newMaterial.unitPrice}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      unitPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
              <button
                onClick={addMaterial}
                className="bg-blue-600 text-white px-3 rounded h-10 mt-auto"
              >
                Add
              </button>
            </div>

            {materials.map((m, i) => (
              <MaterialRow
                key={i}
                material={m}
                onDelete={() => removeMaterial(i)}
              />
            ))}

            <div className="text-right font-semibold">
              Materials Total: ${materialsTotal.toFixed(2)}
            </div>
          </div>
        )}

        {!resetMaterials && isEdit && !isMaterialsOnly && (
          <div className="text-right font-semibold">
            Materials Total: ${originalMaterialsTotal.toFixed(2)}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateFormModal;
