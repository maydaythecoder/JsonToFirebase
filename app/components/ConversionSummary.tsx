export default function ConversionSummary({ convertedData }: { convertedData: string }) {
    return (
      <div className="p-4 bg-white rounded shadow mt-4">
        <h2 className="text-xl font-bold">Converted Data</h2>
        <pre className="mt-4 bg-gray-800 text-white p-4 rounded">{convertedData}</pre>
      </div>
    );
  }
  