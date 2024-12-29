"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard"); // Adjust this to the desired page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#0070f3" }}>🎉 Sign-In Successful!</h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "20px" }}>
        Welcome to the application! We&apos;re glad to have you here.
      </p>
      <button
        onClick={handleNavigate}
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
