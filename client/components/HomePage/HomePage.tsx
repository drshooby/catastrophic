"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HomePage.module.css";
import { fetchHello, fetchCat } from "@/functions/fetcher";

export function HomePage() {
  const [message, setMessage] = useState<string>("");
  const [catUrl, setCatUrl] = useState<string>("");
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [isLoadingCat, setIsLoadingCat] = useState<boolean>(false);

  async function getMessage() {
    setIsLoadingMessage(true);
    setCatUrl("");

    const { message, error } = await fetchHello();

    if (error) {
      setMessage(`Error: ${error}`);
    } else {
      setMessage(message);
    }

    setIsLoadingMessage(false);
  }

  async function getCat() {
    setIsLoadingCat(true);
    setMessage("");
    setCatUrl("");

    const { url, error } = await fetchCat();

    if (error) {
      setMessage(`Error: ${error}`);
    } else if (url) {
      setCatUrl(url);
    }

    setIsLoadingCat(false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>catastrophic</h1>
        <p className={styles.subtitle}>
          enterprise-grade cat delivery platform
        </p>

        <div className={styles.buttonGroup}>
          <button
            onClick={getMessage}
            disabled={isLoadingMessage}
            className={styles.button}
          >
            {isLoadingMessage ? "Loading..." : "Talk to Cat"}
          </button>

          <button
            onClick={getCat}
            disabled={isLoadingCat}
            className={styles.buttonPrimary}
          >
            {isLoadingCat ? "Fetching..." : "Get Cat"}
          </button>
        </div>

        {message && (
          <div className={styles.messageBox}>
            <p className={styles.message}>{message}</p>
          </div>
        )}

        {catUrl && (
          <div className={styles.catContainer}>
            <Image
              src={catUrl}
              alt="Random cat"
              width={400}
              height={400}
              className={styles.catImage}
              unoptimized
            />
          </div>
        )}
      </div>
    </main>
  );
}
