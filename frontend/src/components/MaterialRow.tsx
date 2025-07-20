type Props = {
  material: {
    name: string;
    quantity: number;
    unitPrice: number;
  };
  onDelete: () => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const MaterialRow = ({ material, onDelete }: Props) => {
  const total = material.quantity * material.unitPrice;

  return (
    <div className="flex items-center justify-between border-b py-3 px-2">
      <div className="flex-1">
        <p className="font-medium">{material.name}</p>
        <p className="text-sm text-gray-600">
          {material.quantity} × {formatCurrency(material.unitPrice)} ={" "}
          {formatCurrency(total)}
        </p>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MaterialRow;
