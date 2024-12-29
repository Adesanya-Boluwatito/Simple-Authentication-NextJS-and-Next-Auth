import React, { Suspense } from "react";
import ErrorPageContent from "./ErrorPageContent";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageContent />
    </Suspense>
  );
}
