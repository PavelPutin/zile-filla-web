'use client'
import { Box, Typography } from "@mui/material"

 // Error components must be Client Components
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <Box>
      <Typography align="center" variant="h1">Произошла ошика</Typography>
      <Typography align="center">{error.message}</Typography>
    </Box>
  )
}