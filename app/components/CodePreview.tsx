"use client";
import { useState } from 'react';

export default function CodePreview() {
  const [apiCode, setApiCode] = useState<string>('Click "Generate" to preview API code.');

  const handleGenerate = () => {
    const mockCode = `export const fetchData = async () => {
  return { id: 1, name: "Sample Data" };
};`;
    setApiCode(mockCode);
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4 max-w-4xl mx-auto min-w-[300px]">
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate API Code
      </button>
      <pre className="mt-4 bg-gray-800 text-white p-4 rounded max-h-[400px] overflow-auto">
        <code>{apiCode}</code>
      </pre>
    </div>
  );
}
