'use client' // Error components must be Client Components
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  )
}