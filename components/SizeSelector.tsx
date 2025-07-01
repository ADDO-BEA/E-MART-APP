"use client";
import React, { useState } from "react";

type SizeSelectorProps = {
  sizes: { [key: string]: readonly string[] };
  onSizeSelect: (size: string | null) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onSizeSelect }) => {
  const [selectedSizeType, setSelectedSizeType] = useState<string>(Object.keys(sizes)[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);


  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    onSizeSelect(size);
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Size Type Selector (Dropdown beside the label) */}
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Size Type:</h3>
        <select
          value={selectedSizeType}
          onChange={(e) => setSelectedSizeType(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {Object.keys(sizes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Size Buttons */}
      <div className="flex flex-wrap gap-3">
        {sizes[selectedSizeType].map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`px-6 py-3 border rounded-full text-sm font-semibold transition-all ${
              selectedSize === size ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {selectedSize && (
        <p className="mt-2 text-sm text-gray-500">Selected Size: {selectedSize}</p>
      )}
    </div>
  );
};

export default SizeSelector;
