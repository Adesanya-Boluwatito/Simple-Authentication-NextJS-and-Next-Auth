"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/auth/signin"); // Redirect to signin page after signup
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch  {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "200px" }}>
      <h1 style={{padding:"15px"}}>Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px", width: "250px", borderRadius:"8px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px", width: "250px", borderRadius:"8px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px", borderRadius:"8px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSignUp} style={{ padding: "10px 20px", cursor: "pointer", borderRadius:"8px", marginTop:"10px" }}>
        Sign Up
      </button>
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <a href="/auth/signin" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
          Sign in here
        </a>
      </p>
    </div>
  );
}
