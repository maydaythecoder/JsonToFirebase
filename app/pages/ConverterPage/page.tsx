"use client";
"use client";

import { useState } from "react";

export default function ConverterPage() {
  const [inputFormat, setInputFormat] = useState<string>("JSON");
  const [outputFormat, setOutputFormat] = useState<string>("CSV");
  const [language, setLanguage] = useState<string>("Python");
  const [inputData, setInputData] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [script, setScript] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const validTypes = ["application/json", "text/csv", "text/plain"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JSON, CSV, or SQL file.");
        return;
      }

      setUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setInputData(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleConvert = () => {
    if (!inputData) {
      alert("Please upload a file or provide input data.");
      return;
    }
  
    try {
      let converted = "";
  
      // JSON to CSV
      if (inputFormat === "JSON" && outputFormat === "CSV") {
        let jsonData: Record<string, unknown>[];
        try {
          jsonData = JSON.parse(inputData);
        } catch {
          alert("Invalid JSON input.");
          return;
        }
  
        // Handle arrays or objects as root-level JSON
        if (!Array.isArray(jsonData)) {
          jsonData = [jsonData];
        }
  
        // Flatten objects to ensure consistency
        const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, string> =>
          Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
              Object.assign(acc, flattenObject(value as Record<string, unknown>, newKey));
            } else {
              acc[newKey] = value?.toString() ?? "";
            }
            return acc;
          }, {} as Record<string, string>);
  
        const flatData = jsonData.map((item) => flattenObject(item)); // Fix here
        const csvHeader = Object.keys(flatData[0]).join(",") + "\n";
        const csvRows = flatData
          .map((row) =>
            Object.keys(flatData[0])
              .map((key) => row[key] ?? "")
              .join(",")
          )
          .join("\n");
        converted = csvHeader + csvRows;
  
        // JSON to SQL
      } else if (inputFormat === "JSON" && outputFormat === "SQL") {
        let jsonData: Record<string, unknown>[];
        try {
          jsonData = JSON.parse(inputData);
        } catch {
          alert("Invalid JSON input.");
          return;
        }
  
        if (!Array.isArray(jsonData)) {
          jsonData = [jsonData];
        }
  
        const tableName = "data_table";
        const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, string> =>
          Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
              Object.assign(acc, flattenObject(value as Record<string, unknown>, newKey));
            } else {
              acc[newKey] = value?.toString() ?? "";
            }
            return acc;
          }, {} as Record<string, string>);
  
        const flatData = jsonData.map((item) => flattenObject(item)); // Fix here
        const sqlInsertStatements = flatData
          .map(
            (row) =>
              `INSERT INTO ${tableName} (${Object.keys(row).join(", ")}) VALUES (${Object.values(row)
                .map((value) => `'${value}'`)
                .join(", ")});`
          )
          .join("\n");
        converted = sqlInsertStatements;
      } else {
        converted = `Conversion from ${inputFormat} to ${outputFormat} is not supported yet.`;
      }
  
      setConvertedData(converted);
    } catch (error) {
      alert("Error during conversion: " + (error as Error).message);
    }
  };
  
  
  
  const handleGenerateScript = () => {
    if (!inputData) {
      alert("Please upload a file or provide input data.");
      return;
    }

    let scriptCode = "";

    switch (language) {
      case "Python":
        scriptCode = `import csv\nimport json\n\n# Conversion script for ${inputFormat} to ${outputFormat}\ndef convert(data):\n    # Add conversion logic here\n    pass\n\nprint(convert(${inputData}))`;
        break;
      case "JavaScript":
        scriptCode = `const convert = (data) => {\n  // Conversion logic for ${inputFormat} to ${outputFormat}\n  return data;\n};\n\nconsole.log(convert(${inputData}));`;
        break;
      case "Java":
        scriptCode = `public class Converter {\n  public static void main(String[] args) {\n    // Conversion logic for ${inputFormat} to ${outputFormat}\n  }\n}`;
        break;
      case "Rust":
        scriptCode = `fn convert(data: &str) {\n  // Conversion logic for ${inputFormat} to ${outputFormat}\n}\n\nfn main() {\n  let data = "${inputData}";\n  convert(data);\n}`;
        break;
      case "Ruby":
        scriptCode = `def convert(data)\n  # Conversion logic for ${inputFormat} to ${outputFormat}\nend\n\nputs convert("${inputData}")`;
        break;
      case "C#":
        scriptCode = `using System;\n\nclass Converter {\n  static void Main() {\n    // Conversion logic for ${inputFormat} to ${outputFormat}\n  }\n}`;
        break;
      default:
        scriptCode = `Script generation for ${language} is not supported yet.`;
    }

    setScript(scriptCode);
  };

  const downloadFile = (data: string, filename: string, type: string) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadConvertedData = () => {
    if (convertedData) {
      downloadFile(
        convertedData,
        `converted.${outputFormat.toLowerCase()}`,
        "text/plain"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Universal Data Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Conversion Settings */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Conversion Settings</h2>
          <label className="block mb-2">Input Format</label>
          <select
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
            <option value="SQL">SQL</option>
          </select>
          <label className="block mb-2">Output Format</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
            <option value="SQL">SQL</option>
          </select>
          <label className="block mb-2">Upload File (JSON, CSV, or SQL)</label>
          <input
            type="file"
            accept=".json,.csv,.sql"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-4"
          />
          <button
            onClick={handleConvert}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-4"
          >
            Convert
          </button>
          <button
            onClick={handleDownloadConvertedData}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Download Converted Data
          </button>
        </div>

        {/* Script Generator */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Script Generator</h2>
          <label className="block mb-2">Programming Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="Rust">Rust</option>
            <option value="Ruby">Ruby</option>
            <option value="C#">C#</option>
          </select>
          <button
            onClick={handleGenerateScript}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Generate Script
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 max-w-4xl mx-auto">
        {convertedData && (
          <div className="p-4 bg-gray-800 text-white rounded shadow mb-6">
            <h3 className="text-lg font-bold mb-2">Converted Data</h3>
            <pre className="overflow-auto max-h-64">{convertedData}</pre>
          </div>
        )}
        {script && (
          <div className="p-4 bg-gray-800 text-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">Generated Script</h3>
            <pre className="overflow-auto max-h-64">{script}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
