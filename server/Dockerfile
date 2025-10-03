# =========================
# Stage 1: dependencies
# =========================
FROM rust:1.90-slim AS deps
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Cache dependencies by building with dummy main
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src target/release/server target/release/server.d

# =========================
# Stage 2: build
# =========================
FROM rust:1.90-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/target ./target
COPY --from=deps /app/Cargo.toml /app/Cargo.lock ./
COPY . .

# Force rebuild of the binary
RUN touch src/main.rs
RUN cargo build --release

# =========================
# Stage 3: runtime
# =========================
FROM debian:bookworm-slim AS runner
WORKDIR /usr/local/bin

# Install runtime dependencies (ca-certificates AND openssl libs)
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=builder /app/target/release/server ./app
RUN chmod 700 ./app

EXPOSE 8080

# Start application
CMD ["./app"]