"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/secrets/success', // Specify the callback URL
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Use router.push for client-side navigation
        router.push('/secrets/success');
      }
    } catch  {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn("google", {
        redirect: false,  // Changed from true to false
        callbackUrl: "/secrets/success",
      });
  
      if (result?.error) {
        console.error("Google sign-in error:", result.error);
        setError("Failed to connect to Google. Please try again.");
      } else if (result?.url) {
        // Manually handle redirect like in credentials method
        router.push('/secrets/success');
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn("facebook", {
        redirect: false,
        callbackUrl: "/secrets/success",
      });
  
      if (result?.error) {
        console.error("Facebook sign-in error:", result.error);
        setError("Failed to connect to Facebook. Please try again.");
      } else if (result?.url) {
        // Manually handle redirect using router
        router.push('/secrets/success');
      }
    } catch (error) {
      console.error("Facebook sign-in error:", error);
      setError("Failed to sign in with Facebook. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "200px", alignContent:"center" }}>
      <h1 style={{padding:"15px"}}>Sign In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px", width: "250px", borderRadius:"8px" }}
      />

      <div style={{ position: "relative", width: "250px" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "100%", borderRadius: "8px", paddingRight: "40px" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <button
        onClick={handleSignIn}
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
          marginTop: "15px",
        }}
      >
        Sign In
      </button>

      <div style={{ marginBottom: "20px" }}>
        Not registered?{" "}
        <a href="/auth/signup" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Sign up here
        </a>
      </div>

      <div style={{ width: "250px", textAlign: "center", marginBottom: "10px" }}>Or sign in with:</div>

      <button
        onClick={handleGoogleSignIn}
        style={{
          backgroundColor: "#4285F4",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
          width: "250px",
        }}
      >
        <Image
          src="/google-1088004_640.png"
          alt="Google Logo"
          width={50} // Replace with your image width
          height={20}
          style={{ width: "20px", marginRight: "10px", verticalAlign: "middle" }}
        />
        Sign in with Google
      </button>

      <button
        onClick={handleFacebookSignIn}
        style={{
          backgroundColor: "#4267B2",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "250px",
        }}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt="Facebook Logo"
          width={50} // Specify the width
          height={20} 
          style={{ width: "20px", marginRight: "10px", verticalAlign: "middle" }}
        />
        Sign in with Facebook
      </button>
    </div>
  );
}
