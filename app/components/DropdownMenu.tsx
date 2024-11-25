"use client";
import { useState } from 'react';

export default function DropdownMenu() {
  const [targetFormat, setTargetFormat] = useState<string>('JSON');
  const [convertedData, setConvertedData] = useState<string>('');

  const handleConvert = () => {
    const mockData = { id: 1, name: 'Sample' };
    let converted = '';

    switch (targetFormat) {
      case 'JSON':
        converted = JSON.stringify(mockData, null, 2);
        break;
      case 'CSV':
        converted = 'id,name\n1,Sample';
        break;
      case 'SQL':
        converted = 'INSERT INTO table_name (id, name) VALUES (1, "Sample");';
        break;
      default:
        converted = 'Unsupported format selected.';
    }

    setConvertedData(converted);
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl mx-auto min-w-[300px]">
      <label className="block mb-2 text-sm font-bold">Select Format</label>
      <select
        value={targetFormat}
        onChange={(e) => setTargetFormat(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="JSON">JSON</option>
        <option value="CSV">CSV</option>
        <option value="SQL">SQL</option>
      </select>
      <button
        onClick={handleConvert}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Convert
      </button>
      {convertedData && (
        <pre className="mt-4 bg-gray-800 text-white p-4 rounded max-h-[400px] overflow-auto">
          <code>{convertedData}</code>
        </pre>
      )}
    </div>
  );
}
