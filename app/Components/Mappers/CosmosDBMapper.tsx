"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { CosmosClient } from "@azure/cosmos";

export default function CosmosDBMapper() {
  const [dbConfig, setDbConfig] = useState({
    endpoint: "",
    key: "",
    databaseId: "",
    containerId: "",
  });
  const [jsonInput, setJsonInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [cosmosClient, setCosmosClient] = useState<any>(null);

  const handleDbConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig({ ...dbConfig, [name]: value });
  };

  const initializeCosmosDB = () => {
    try {
      const client = new CosmosClient({
        endpoint: dbConfig.endpoint,
        key: dbConfig.key,
      });
      setCosmosClient(client);
      setMessage("Cosmos DB initialized successfully!");
    } catch (error: any) {
      setMessage(`Error initializing Cosmos DB: ${error.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cosmosClient) {
      setMessage("Error: Cosmos DB is not initialized.");
      return;
    }

    try {
      const database = cosmosClient.database(dbConfig.databaseId);
      const container = database.container(dbConfig.containerId);

      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData)) {
        setMessage("Invalid JSON: Please provide an array of objects.");
        return;
      }

      for (const item of parsedData) {
        await container.items.create(item);
      }

      setMessage(
        `Successfully added ${parsedData.length} documents to container ${dbConfig.containerId}`
      );
      setJsonInput("");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] grid grid-cols-2 items-center">
      <div className="bg-[var(--bg-card-cosmo)] shadow-light p-6 rounded-lg mx-auto w-3/5 ml-80">
        <h3 className="text-lg font-semibold text-[var(--text-foreground-cosmo)]">
          Cosmos DB Configuration
        </h3>
        <div className="mt-4 space-y-4">
          {Object.keys(dbConfig).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-xs font-medium text-[var(--text-foreground-cosmo)]"
              >
                {key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={dbConfig[key as keyof typeof dbConfig]}
                onChange={handleDbConfigChange}
                placeholder={`Enter ${key}`}
                required
                className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-cosmo)] text-[var(--text-foreground-cosmo)] border border-[var(--border-cosmo)] rounded-md focus:ring focus:ring-[var(--primary-cosmo)]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={initializeCosmosDB}
          className="mt-6 w-full bg-[var(--primary-cosmo)] text-[var(--primary-foreground-cosmo)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
        >
          Initialize Cosmos DB
        </button>
      </div>

      <div className="bg-[var(--bg-card-cosmo)] shadow-lg p-8 rounded-lg mx-auto h-[90vh] w-10/12 mr-64 flex flex-col">
        <h1 className="text-2xl font-bold text-[var(--text-foreground-cosmo)]">
          Cosmos DB JsonBridge
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 flex flex-col flex-grow"
        >
          <div>
            <label
              htmlFor="containerId"
              className="block text-sm font-medium text-[var(--text-foreground-cosmo)]"
            >
              Container ID
            </label>
            <input
              type="text"
              id="containerId"
              value={dbConfig.containerId}
              onChange={(e) =>
                setDbConfig({ ...dbConfig, containerId: e.target.value })
              }
              placeholder="Enter container ID"
              required
              className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-cosmo)] text-[var(--text-foreground-cosmo)] border border-[var(--border-cosmo)] rounded-md focus:ring focus:ring-[var(--primary-cosmo)]"
            />
          </div>

          <div className="flex-grow pb-2">
            <label
              htmlFor="jsonInput"
              className="block text-sm font-medium text-[var(--text-foreground-cosmo)]"
            >
              JSON Data
            </label>
            <textarea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste JSON array, e.g., [{"key": "value"}, {...}]'
              required
              className="mt-1 block w-full h-full px-3 py-2 bg-[var(--bg-card-cosmo)] text-[var(--text-foreground-cosmo)] border border-[var(--border-cosmo)] rounded-md focus:ring focus:ring-[var(--primary-cosmo)] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary-cosmo)] text-[var(--primary-foreground-cosmo)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
          >
            Add to Cosmos DB
          </button>
        </form>
      </div>
    </div>
  );
}
