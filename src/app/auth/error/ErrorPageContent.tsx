"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Error</h1>
      <p>{error ? error : "An unknown error occurred."}</p>
    </div>
  );
}
