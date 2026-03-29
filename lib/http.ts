export async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options?.headers,

    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

  return response.json();
}
