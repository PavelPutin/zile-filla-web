export async function PUT(request: Request) {
  console.log(`Route ${request}`);
  await new Promise(r => setTimeout(r, 5000));
  return Response.json({});
  // const response = await fetch(`http://${process.env.BACKEND_HOST}`)
}