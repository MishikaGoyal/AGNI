export async function GET({ params }) {
  const code = params.code;

  const response = await fetch("/api/update", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();
}
