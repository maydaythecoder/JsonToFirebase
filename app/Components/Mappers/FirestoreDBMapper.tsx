"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function FirestoreMapper() {
  const [dbConfig, setDbConfig] = useState({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  });
  const [collectionName, setCollectionName] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [db, setDb] = useState<any>(null);

  const handleDbConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig({ ...dbConfig, [name]: value });
  };

  const initializeFirebase = () => {
    try {
      const app = initializeApp(dbConfig);
      setDb(getFirestore(app));
      setMessage("Firebase initialized successfully!");
    } catch (error: any) {
      setMessage(`Error initializing Firebase: ${error.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!db) {
      setMessage("Error: Firebase is not initialized.");
      return;
    }

    try {
      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData)) {
        setMessage("Invalid JSON: Please provide an array of objects.");
        return;
      }

      const collectionRef = collection(db, collectionName);

      for (const item of parsedData) {
        await addDoc(collectionRef, item);
      }

      setMessage(
        `Successfully added ${parsedData.length} documents to ${collectionName}`
      );
      setCollectionName("");
      setJsonInput("");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] grid grid-cols-2 items-center">
      <div className="bg-[var(--bg-card-firebase)] shadow-light p-6 rounded-lg mx-auto w-3/5 ml-80">
        <h3 className="text-lg font-semibold text-[var(--text-foreground-firebase)]">
          Firebase Configuration
        </h3>
        <div className="mt-4 space-y-4">
          {Object.keys(dbConfig).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-xs font-medium text-[var(--text-foreground-firebase)]"
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
                className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-firebase)] text-[var(--text-foreground-firebase)] border border-[var(--border-firebase)] rounded-md focus:ring focus:ring-[var(--primary-firebase)]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={initializeFirebase}
          className="mt-6 w-full bg-[var(--primary-firebase)] text-[var(--primary-foreground-firebase)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
        >
          Initialize Firebase
        </button>
      </div>

      <div className="bg-[var(--bg-card-firebase)] shadow-lg p-8 rounded-lg mx-auto h-[90vh] w-10/12 mr-64 flex flex-col">
        <h1 className="text-2xl font-bold text-[var(--text-foreground-firebase)]">
          Firestore JsonBridge
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 flex flex-col flex-grow"
        >
          <div>
            <label
              htmlFor="collectionName"
              className="block text-sm font-medium text-[var(--text-foreground-firebase)]"
            >
              Collection Name
            </label>
            <input
              type="text"
              id="collectionName"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Enter collection name"
              required
              className="mt-1 block w-full px-3 py-2 bg-[var(--bg-card-firebase)] text-[var(--text-foreground-firebase)] border border-[var(--border-firebase)] rounded-md focus:ring focus:ring-[var(--primary-firebase)]"
            />
          </div>

          <div className="flex-grow pb-2">
            <label
              htmlFor="jsonInput"
              className="block text-sm font-medium text-[var(--text-foreground-firebase)]"
            >
              JSON Data
            </label>
            <textarea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste JSON array, e.g., [{"key": "value"}, {...}]'
              required
              className="mt-1 block w-full h-full px-3 py-2 bg-[var(--bg-card-firebase)] text-[var(--text-foreground-firebase)] border border-[var(--border-firebase)] rounded-md focus:ring focus:ring-[var(--primary-firebase)] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary-firebase)] text-[var(--primary-foreground-firebase)] py-2 rounded-lg hover:bg-opacity-90 focus:ring-2"
          >
            Add to Firestore
          </button>
        </form>
      </div>
    </div>
  );
}
