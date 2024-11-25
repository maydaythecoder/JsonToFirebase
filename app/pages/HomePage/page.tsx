import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-blue-600">Bridge App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
        <Link href="/pages/ConverterPage" className="p-6 bg-white rounded shadow hover:bg-blue-50">
            <h2 className="text-2xl font-semibold">Data Converter</h2>
            <p>Convert between JSON, SQL, CSV, and databases.</p>
        </Link>
        <Link href="/pages/APIGeneratorPage" className="p-6 bg-white rounded shadow hover:bg-blue-50">
            <h2 className="text-2xl font-semibold">API Generator</h2>
            <p>Generate RESTful and GraphQL APIs for converted data.</p>
        </Link>
      </div>
    </div>
  );
}
