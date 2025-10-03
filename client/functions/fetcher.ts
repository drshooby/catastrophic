export async function fetchHello() {
  try {
    const res = await fetch("/hello");
    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    } else {
      return { error: "unknown" };
    }
  }
}

export async function fetchCat() {
  try {
    const res = await fetch("/cat");
    if (!res.ok) {
      return { error: "Failed to fetch cat" };
    }
    const blob = await res.blob();
    return { url: URL.createObjectURL(blob) };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    } else {
      return { error: "unknown" };
    }
  }
}