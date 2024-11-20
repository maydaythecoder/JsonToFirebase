"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import AWS from "aws-sdk";

export default function DynamoDBMapper() {
  const [dbConfig, setDbConfig] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
  });
  const [tableName, setTableName] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [dynamoDB, setDynamoDB] = useState<any>(null);

  const handleDbConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig({ ...dbConfig, [name]: value });
  };

  const initializeDynamoDB = () => {
    try {
      const dynamo = new AWS.DynamoDB.DocumentClient({
        accessKeyId: dbConfig.accessKeyId,
        secretAccessKey: dbConfig.secretAccessKey,
        region: dbConfig.region,
      });
      setDynamoDB(dynamo);
      setMessage("DynamoDB initialized successfully!");
    } catch (error: any) {
      setMessage(`Error initializing DynamoDB: ${error.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dynamoDB) {
      setMessage("Error: DynamoDB is not initialized.");
      return;
    }

    try {
      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData)) {
        setMessage("Invalid JSON: Please provide an array of objects.");
        return;
      }

      for (const item of parsedData) {
        await dynamoDB
          .put({
            TableName: tableName,
            Item: item,
          })
          .promise();
      }

      setMessage(
        `Successfully added ${parsedData.length} items to table ${tableName}`
      );
      setTableName("");
      setJsonInput("");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] grid grid-cols-2 items-center">
      <div className="bg-[var(--bg-card-dynamo)] shadow-light p-6 rounded-lg mx-auto w-3/5 ml-80">
        <h3 className="text-lg font-semibold text-[var(--text-foreground-dynamo)]">
          DynamoDB Configuration
        </h3>
        <div className="mt-4 space-y-4">
          {Object.keys(dbConfig).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-xs font-medium text-[var(--text-foreground-dynamo)]"
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
                className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-dynamo)] text-[var(--text-foreground-dynamo)] border border-[var(--border-dynamo)] rounded-md focus:ring focus:ring-[var(--primary-dynamo)]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={initializeDynamoDB}
          className="mt-6 w-full bg-[var(--primary-dynamo)] text-[var(--primary-foreground-dynamo)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
        >
          Initialize DynamoDB
        </button>
      </div>

      <div className="bg-[var(--bg-card-dynamo)] shadow-lg p-8 rounded-lg mx-auto h-[90vh] w-10/12 mr-64 flex flex-col">
        <h1 className="text-2xl font-bold text-[var(--text-foreground-dynamo)]">
          DynamoDB JsonBridge
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 flex flex-col flex-grow"
        >
          <div>
            <label
              htmlFor="tableName"
              className="block text-sm font-medium text-[var(--text-foreground-dynamo)]"
            >
              Table Name
            </label>
            <input
              type="text"
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
              required
              className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-dynamo)] text-[var(--text-foreground-dynamo)] border border-[var(--border-dynamo)] rounded-md focus:ring focus:ring-[var(--primary-dynamo)]"
            />
          </div>

          <div className="flex-grow pb-2">
            <label
              htmlFor="jsonInput"
              className="block text-sm font-medium text-[var(--text-foreground-dynamo)]"
            >
              JSON Data
            </label>
            <textarea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste JSON array, e.g., [{"key": "value"}, {...}]'
              required
              className="mt-1 block w-full h-full px-3 py-2 bg-[var(--bg-card-dynamo)] text-[var(--text-foreground-dynamo)] border border-[var(--border-dynamo)] rounded-md focus:ring focus:ring-[var(--primary-dynamo)] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary-dynamo)] text-[var(--primary-foreground-dynamo)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
          >
            Add to DynamoDB
          </button>
        </form>
      </div>
    </div>
  );
}
