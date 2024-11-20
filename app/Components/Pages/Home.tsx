"use client";

import DynamoLogo from "@/app/assets/DynamoLogo";
import CosmoLogo from "@/app/assets/CosmoLogo";
import FirebaseLogo from "@/app/assets/FirebaseLogo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-[var(--primary-foreground)]">
          Select a Configuration
        </h1>
        <div className="flex justify-center space-x-6">
          <Link
            href="/pages/CosmoDB"
            className="flex flex-col items-center px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground-cosmo)] rounded-lg shadow-lg hover:bg-opacity-90 focus:ring focus:ring-[var(--primary-cosmo)] transition-all"
          >
            <CosmoLogo />
            <span className="mt-2 text-sm">CosmoDB</span>
          </Link>
          <Link
            href="/pages/DynamoDB"
            className="flex flex-col items-center px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground-dynamo)] rounded-lg shadow-lg hover:bg-opacity-90 focus:ring focus:ring-[var(--primary-dynamo)] transition-all"
          >
            <DynamoLogo />
            <span className="mt-2 text-sm">DynamoDB</span>
          </Link>
          <Link
            href="/pages/FirestoreDB"
            className="flex flex-col items-center px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground-firebase)] rounded-lg shadow-lg hover:bg-opacity-90 focus:ring focus:ring-[var(--primary-firebase)] transition-all"
          >
            <FirebaseLogo />
            <span className="mt-2 text-sm">Firestore</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
