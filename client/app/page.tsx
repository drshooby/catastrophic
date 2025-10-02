"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { fetchHello } from "@/functions/fetcher";

export default function Home() {
  const [rspMessage, setRspMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getRsp() {
    setIsLoading(true);
    setRspMessage("Loading...");
    const { message, error } = await fetchHello();

    if (error) {
      setRspMessage(`Error: ${error}`);
    } else {
      setRspMessage(message);
    }

    setIsLoading(false);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Rust says:</h1>
      <p className={styles.message}>{rspMessage}</p>
      <button onClick={getRsp} disabled={isLoading}>
        Talk to Rust!
      </button>
    </main>
  );
}
