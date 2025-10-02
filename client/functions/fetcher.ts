export async function fetchHello() {
  try {
    const res = await fetch("/hello");
    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {"error": err.message}
    } else {
      return {"error": "unknown"}
    }
  }
}