"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./HomePage.module.css";
import { fetchHello, fetchCat } from "@/functions/fetcher";

export function HomePage() {
  const [message, setMessage] = useState<string>("");
  const [catUrl, setCatUrl] = useState<string>("");
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [isLoadingCat, setIsLoadingCat] = useState<boolean>(false);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  // essentially simple rate-limiting for cat pictures from the public api
  const MIN_REQUEST_INTERVAL = 2000; // 2 seconds

  // Unblock button on mount after initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlocked(false);
    }, MIN_REQUEST_INTERVAL);

    return () => clearTimeout(timer);
  }, []);

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
    const now = Date.now();

    if (isBlocked || now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      setMessage("Please wait a moment before requesting again");
      return;
    }

    setIsLoadingCat(true);
    setIsBlocked(true);
    setMessage("");
    setCatUrl("");
    setLastRequestTime(now);

    const { url, error } = await fetchCat();

    if (error) {
      setMessage(`Error: ${error}`);
    } else if (url) {
      setCatUrl(url);
    }

    setIsLoadingCat(false);

    // Unblock after interval
    setTimeout(() => {
      setIsBlocked(false);
    }, MIN_REQUEST_INTERVAL);
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
            disabled={isLoadingCat || isBlocked}
            className={styles.buttonPrimary}
          >
            {isLoadingCat ? "Fetching..." : isBlocked ? "Wait..." : "Get Cat"}
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
