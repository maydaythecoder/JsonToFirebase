import CodePreview from '../../components/CodePreview';

export default function APIGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center">API Generator</h1>
      <div className="mt-8">
        <CodePreview />
      </div>
    </div>
  );
}
