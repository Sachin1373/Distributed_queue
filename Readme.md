# 🚀 Distributed Task Queue (SaaS)

A **production-grade distributed task queue system** (like AWS SQS + BullMQ) that allows developers to enqueue background jobs and process them asynchronously with full observability.

---

# 🧠 Overview

This system enables:

* Asynchronous job processing
* Retry & failure handling
* Priority & delayed jobs
* Centralized monitoring via dashboard

👉 Designed as a **SaaS product**:

* Developers integrate using SDK
* System runs on your infrastructure
* Dashboard provides visibility

---

# 🎯 Core Idea

> “Decouple heavy/slow operations from user requests and process them reliably in the background.”

---

# 🏗️ Architecture (Locked)

```
Client Backend (IGA / SaaS / Ecom)
        ↓ (SDK)
   ┌───────────────┐
   │   API Server  │  (Node.js)
   └──────┬────────┘
          ↓
      PostgreSQL (Source of Truth)
          ↓
        Redis (Queue)
          ↓
   ┌───────────────┐
   │   Worker      │ (Go)
   └──────┬────────┘
          ↓
   Client Webhook (Executes Logic)

          ↑
      Dashboard (React)
          ↑
        API Server
```

---

# ⚙️ Tech Stack (Locked)

| Layer     | Tech               |
| --------- | ------------------ |
| API       | Node.js + Express  |
| Worker    | Go (Echo optional) |
| Queue     | Redis              |
| DB        | PostgreSQL         |
| Dashboard | React + TypeScript |
| SDK       | TypeScript         |
| Monorepo  | Turborepo          |
| Infra     | Docker             |

---

# 📦 Monorepo Structure

```
distributed-queue/
│
├── apps/
│   ├── api/          # Node.js API server
│   ├── worker/       # Go worker
│   ├── dashboard/    # React dashboard
│
├── packages/
│   ├── sdk/          # SDK for developers
│   ├── shared/       # shared types/utils
│
├── infra/
│   ├── docker/       # docker configs
│
├── package.json
├── turbo.json
```

---

# 🔥 Core Features (Locked)

## 1. Job Queueing

* Add jobs via API/SDK
* Stored in DB + pushed to Redis

## 2. Async Processing

* Workers pull jobs from Redis
* Execute via webhook

## 3. Retry Mechanism

* Configurable retries
* Exponential backoff

## 4. Delayed Jobs

* Run at specific timestamp

## 5. Priority Queues

* High / Medium / Low

## 6. Dead Letter Queue (DLQ)

* Failed after retries → moved to DLQ

## 7. Dashboard

* Job monitoring
* Retry failed jobs
* Metrics & logs

## 8. Idempotency

* Prevent duplicate execution

## 9. Multi-Tenant Support

* API key based isolation

---

# 🧑‍💻 How End Users Use This System

## Step 1: Install SDK

```
npm install your-queue-sdk
```

---

## Step 2: Configure SDK

```ts
const queue = new Queue({
  apiKey: "project_123",
  baseUrl: "https://your-api.com"
});
```

---

## Step 3: Add Jobs

```ts
queue.add("send-email", {
  to: "user@gmail.com",
  campaignId: "cmp_123"
}, {
  callbackUrl: "https://client.com/job-handler",
  retries: 3
});
```

---

## Step 4: Handle Job (Client Side)

```ts
app.post("/job-handler", (req, res) => {
  // Business logic
  sendEmail(req.body.payload.to);
  res.status(200).send("done");
});
```

---

# 📊 Dashboard Usage

Used by:

* Developers
* DevOps
* Support teams

---

## Features

* View all jobs
* Filter by status/type
* View job details (payload, logs)
* Retry failed jobs
* Monitor metrics

---

# 🧠 Job Lifecycle

1. Job created via SDK
2. API stores job in DB
3. Job pushed to Redis
4. Worker pulls job
5. Worker calls webhook
6. Update job status

---

# 💣 Failure Handling

## Case 1: Success

* Webhook returns 200 → job completed

## Case 2: Temporary Failure

* Retry with backoff

## Case 3: Permanent Failure

* Move to Dead Letter Queue

---

# 🗄️ Database Schema

## Jobs Table

```
id (uuid)
type
payload (jsonb)
status (pending, processing, completed, failed)
retries
max_retries
callback_url
api_key
run_at
created_at
updated_at
```

---

## Job Logs Table

```
id
job_id
message
timestamp
```

---

# ⚙️ API Design (High-Level)

## Create Job

```
POST /jobs
```

## Get Jobs

```
GET /jobs
```

## Get Job Detail

```
GET /jobs/:id
```

## Retry Job

```
POST /jobs/:id/retry
```

## Metrics

```
GET /metrics
```

---

# 🚀 Running Locally

## 1. Install dependencies

```
npm install
```

---

## 2. Start services

```
npm run dev
```

---

## 3. Run worker

```
cd apps/worker
go run main.go
```

---

## 4. Start Redis & Postgres (Docker)

```
docker-compose up -d
```

---

# 🌍 Deployment Strategy

| Service   | Platform         |
| --------- | ---------------- |
| API       | Railway / Render |
| Worker    | Railway          |
| Dashboard | Vercel           |
| DB        | Neon / Supabase  |
| Redis     | Upstash          |

---

# 🧠 Design Principles

* Decoupled architecture
* Scalable & fault-tolerant
* Generic (no business logic inside system)
* Observable (dashboard-first design)

---

# 💥 Interview Explanation (Use This)

> “I built a distributed task queue system similar to SQS, where developers enqueue jobs via an SDK. These jobs are processed asynchronously by workers using Redis, with retries, prioritization, and failure handling. The system delegates execution via webhooks, making it generic and extensible. A dashboard provides observability and control over job execution.”

---

# 🔥 Future Improvements

* WebSocket live updates
* Rate limiting per project
* Job batching
* Cron jobs
* Horizontal worker scaling
* Kubernetes deployment

---

# 🎯 Goal of This Project

* Learn system design
* Build production-level backend system
* Prepare for 10–15 LPA backend roles

---

# ⚡ Final Mental Model

* SDK = entry point
* API = brain
* Redis = queue
* Worker = executor
* DB = memory
* Dashboard = visibility

---

👉 This is not just a project.
👉 This is **infrastructure engineering**.

---
