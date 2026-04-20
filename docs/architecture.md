# System Architecture

The system is designed to demonstrate **real-time stadium crowd navigation** while operating within a **$5 Google Cloud credit constraint**.

To achieve this, the architecture relies heavily on **serverless services and lightweight computation**.

---

# High Level Architecture
 ```
    User
    ↓
    Cloud Run (Web App Hosting)
    ↓
    Static UI (HTML / JavaScript)
    ↓
    Firebase SDK
    ↓
    Firestore Database
    ↓
    Cloud Functions (Crowd Simulation)
    ↓
    Cloud Scheduler
 ```
 
---

# Architecture Components

## Cloud Run (Static Web App)
The frontend is built using HTML, CSS, and JavaScript, then containerized (e.g., using Nginx) and deployed to Cloud Run.

This approach avoids heavy frameworks and minimizes repository size, while utilizing Cloud Run's scale-to-zero capabilities for cost efficiency.

---

## Firebase SDK
The frontend connects to Firestore using Firebase SDK for **real-time data synchronization**.

---

## Firestore Database
Firestore stores the current crowd density for stadium zones.

It supports:

- Real-time listeners
- Low-cost serverless storage
- Minimal infrastructure management

---

## Cloud Functions
Cloud Functions simulate crowd density values.

Responsibilities:

- Generate crowd density values
- Update Firestore documents
- Run lightweight logic

The simulation interval is intentionally limited to 120 seconds or more to **reduce write operations and cost**.

---

## Cloud Scheduler
Cloud Scheduler triggers the crowd simulation periodically.

The trigger interval is configured to **balance real-time responsiveness and cost efficiency**.

---

# Cost Optimization Strategy

To stay within the **$5 credit limit**, the architecture applies the following strategies:

- Static frontend with no compute cost
- Minimal Firestore writes
- Lightweight simulation logic
- Serverless services that scale to zero
- Limited Cloud Scheduler frequency

This ensures the system demonstrates Google Cloud integration while remaining **budget-friendly for hackathon usage**.   