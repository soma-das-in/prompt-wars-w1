# User Flow

This document describes how fans interact with the Smart Stadium Navigation system.

The flow demonstrates how the application delivers **real-time crowd insights and routing suggestions**.

---

# Step 1 – User Opens the Web App

The user opens the stadium navigation web application, which is served via Cloud Run, on their mobile device or browser.

The frontend loads:

- Stadium map
- Firebase configuration
- Firestore listeners

---

# Step 2 – Map and Zones Load

The application displays a stadium map showing important zones:

- Entry gates
- Food courts
- Exits

Each zone is represented visually on the map.

---

# Step 3 – Real-Time Crowd Data Retrieval

The application listens for updates from Firestore.

When crowd data is received, the system updates:

- Heatmap colors
- Zone congestion indicators

---

# Step 4 – Heatmap Visualization

Crowd density is displayed using color coding:

Green → Low congestion  
Yellow → Moderate congestion  
Red → High congestion

---

# Step 5 – Smart Gate Recommendation

The frontend application locally analyzes the crowd density data from Firestore.

It calculates and recommends the **least crowded gate** without needing external API calls.

Example:

Gate A → High congestion  
Gate C → Recommended entry

---

# Step 6 – Route Suggestion

The recommended path is displayed using a straight-line vector overlay on the static stadium map to guide the user simply.

---

# Step 7 – Dynamic Updates

As Firestore data changes, the application updates automatically.

This ensures fans always receive **current congestion information**.

---

# Hackathon Demonstration Context

In this implementation:

- Crowd data is simulated
- Updates occur periodically
- The system demonstrates real-time architecture using minimal cloud resources

This allows the solution to run within the **$5 Google Cloud credit constraint** while still showcasing practical functionality.