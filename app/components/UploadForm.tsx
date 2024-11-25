"use client";
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedData, setConvertedData] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleConversion = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    try {
      const fileText = await file.text();
      // Mock conversion logic
      const converted = convertToJSON(fileText); // Example conversion to JSON
      setConvertedData(JSON.stringify(converted, null, 2));
    } catch (error) {
      setConvertedData(`Error converting file: ${(error as Error).message}`);
    }
  };

  const convertToJSON = (data: string): object => {
    // Mock logic to convert to JSON
    return { message: `File contents converted to JSON: ${data}` };
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl mx-auto min-w-[300px]">
      <label className="block mb-2 text-sm font-bold">Upload File</label>
      <input
        type="file"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />
      <button
        onClick={handleConversion}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Convert Data
      </button>
      {convertedData && (
        <pre className="mt-4 bg-gray-800 text-white p-4 rounded max-h-[400px] overflow-auto">
          <code>{convertedData}</code>
        </pre>
      )}
    </div>
  );
}
