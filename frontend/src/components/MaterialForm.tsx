import { useState, useEffect } from "react";

type Material = {
  name: string;
  quantity: number;
  unitPrice: number;
};

type Props = {
  onSubmit: (material: Material) => void;
  initialMaterial?: Material;
};

const MaterialForm = ({ onSubmit, initialMaterial }: Props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    if (initialMaterial) {
      setName(initialMaterial.name);
      setQuantity(initialMaterial.quantity);
      setUnitPrice(initialMaterial.unitPrice);
    }
  }, [initialMaterial]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, quantity, unitPrice });
    setName("");
    setQuantity(1);
    setUnitPrice(0);
  };

  return (
    <div className="flex gap-2 items-end">
      <input
        type="text"
        placeholder="Material name"
        className="flex-1 border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Qty"
        className="w-20 border p-2 rounded"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Unit Price"
        className="w-28 border p-2 rounded"
        value={unitPrice}
        onChange={(e) => setUnitPrice(Number(e.target.value))}
      />
      <button
        className="bg-green-600 text-white px-3 py-2 rounded"
        onClick={handleSubmit}
      >
        {initialMaterial ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default MaterialForm;
