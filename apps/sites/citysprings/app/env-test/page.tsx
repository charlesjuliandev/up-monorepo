"use client";

export default function EnvTestPage() {
  return (
    <div>
      <h1>Env Test</h1>
      <p>BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL}</p>
      <p>API_BASE: {process.env.NEXT_PUBLIC_API_BASE}</p>
    </div>
  );
}
