# prompt-wars-w1
# Smart Stadium Crowd Navigation Assistant

## Overview
The **Smart Stadium Crowd Navigation Assistant** is a lightweight web application designed to improve the fan experience at large sporting venues such as football stadiums during Indian Super League matches.

The system provides **real-time crowd insights, heatmaps, and smart routing suggestions** to help fans navigate stadium facilities like gates, food courts, and exits efficiently.

This solution is designed specifically for a **hackathon environment with a $5 Google Cloud credit limit**, ensuring that all services are used in a **cost-efficient and resource-optimized way** while still demonstrating meaningful integration with Google Cloud services.

---

# Chosen Vertical
**Smart Stadium / Event Crowd Management**

Large sporting events often experience congestion at entry gates, food courts, and exits.  
This solution demonstrates how **real-time crowd awareness and smart navigation** can improve fan experience and safety.

---

# Problem Statement
During large sporting events, thousands of fans move through stadium infrastructure simultaneously. This can cause:

- Long waiting times at entry gates  
- Overcrowded food courts  
- Congested exit pathways  
- Limited visibility into real-time crowd conditions  

Fans typically make decisions without access to crowd density information across the venue.

---

# Solution Overview
This project provides a **Smart Crowd Navigation Web App** that:

- Displays a **real-time stadium heatmap**
- Shows congestion levels for stadium zones
- Recommends **less crowded entry gates**
- Suggests the **best available route**

Crowd data is **simulated using lightweight backend logic** to demonstrate real-time updates while keeping operational cost extremely low.

---

# Key Features

## Real-Time Crowd Heatmap
Color-coded visualization of congestion levels:

- **Green** – Low congestion  
- **Yellow** – Moderate congestion  
- **Red** – High congestion  

---

## Smart Gate Recommendation
The system analyzes crowd density and recommends the **least crowded gate**.

Example:

Gate A → Crowded  
Gate C → Recommended entry

---

## Dynamic Updates
The UI automatically updates when Firestore data changes.

---

# Cost-Efficient Cloud Design

This solution is intentionally designed to stay within a **$5 Google Cloud credit limit**.

Cost control strategies include:

- Using **serverless services with free tiers**
- Running lightweight simulation functions
- Using **Firestore with minimal read/write operations**
- Avoiding heavy compute workloads
- Using a **containerized frontend deployed on Cloud Run**

---

# Technology Stack

## Frontend
- HTML
- CSS
- JavaScript
- Firebase SDK
- Static map image with CSS overlays

The frontend is implemented as a **static web application** to keep the repository size and infrastructure costs low.

---

## Backend

### Firestore
Stores real-time crowd density data.

### Cloud Functions
Simulates crowd density updates.

### Cloud Scheduler
Triggers simulation at controlled intervals e.g. Update crowd data every 120 seconds.

### Cloud Run
Hosts the containerized frontend web application, scaling to zero when not in use.

# Repository Structure
```
/prompt-wars-w1
├── frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── app.js
│   ├── heatmap.js
│   └── styles.css
├── cloud_functions
│   ├── main.py
│   └── requirements.txt
├── docs
│   ├── architecture.md
│   ├── testing.md
│   └── user_flow.md
├── tests
│   └── test_logic.py # Automated Logic Verification
├── README.md
└── .gitignore
```


---

For detailed system design and implementation details, see the documentation in `/docs`: architecture.md, firestore_schema.md, user_flow.md. acessibility.md, security.md,testing.md

# Setup Instructions

### 1. Clone the repository
`git clone <repository_url>`


### 2. Configure Firebase

Add Firebase configuration in:
`frontend/firebase-config.js`


### 3. Deploy Backend

Deploy:

- Cloud Functions
- Cloud Run (Frontend container)

### 4. Run the Frontend

Build the Docker image and deploy to Cloud Run, or open locally:
`frontend/index.html`

### 5. Run Automated Tests
Verify core system logic:
`python3 tests/test_logic.py`

---

# Assumptions

- Crowd density data is simulated for demonstration.
- Stadium map layout is simplified.
- Routing recommendations are basic logic.

---

# Evaluation Alignment

This project demonstrates:

- Clean modular code structure
- Cost-efficient Google Cloud architecture
- Real-time data processing
- Practical usability in large venues

---
