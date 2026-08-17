'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function GlobalError({
  error,
}: Readonly<{
  error: Error & { digest?: string };
}>) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h2>Something went wrong.</h2>
      </body>
    </html>
  );
}
