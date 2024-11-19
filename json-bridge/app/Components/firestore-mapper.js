"use client";
import { useState } from "react";
import db from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";






export default function FirestoreMapper() {
  const [collectionName, setCollectionName] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setMessage(`Successfully added ${parsedData.length} documents to ${collectionName}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", color: "black" }}>
      <h1>Firestore JsonBridge</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="collectionName">Collection Name</label>
          <input
            type="text"
            id="collectionName"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="jsonInput">JSON Data</label>
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste JSON array, e.g., [{"key": "value"}, {...}]'
            rows="10"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            background: "blue",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add to Firestore
        </button>
      </form>

      {message && <p style={{ marginTop: "20px", color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}
