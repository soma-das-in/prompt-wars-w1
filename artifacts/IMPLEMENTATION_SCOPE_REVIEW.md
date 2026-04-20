# Implementation Scope Review

## 1. Cohesion and Realism for a Demo-Ready MVP
* **Cohesive Design**: The architectural choices (Firebase, Cloud Functions, static frontend) strongly align with the hackathon's requirement for a lightweight, low-cost ($5 limit) solution.
* **Realistic Infrastructure**: Using static HTML/JS for the frontend and Firestore for real-time reactivity is highly effective for a demo.
* **Cost Constraints Met**: Scheduling crowd simulation at intervals (e.g., 120 seconds) appropriately restricts database writes.
* **Clear User Journey**: The user flow concisely maps out exactly what the judges or users will see, from initial load to real-time heatmap updates.

## 2. Scope Ambiguity & Over-Engineering Risks
* **Over-Engineering Risk (Cloud Run vs. Frontend Logic)**: Using Cloud Run solely for a basic API that "analyzes crowd density and recommends the least crowded gate" is an over-engineering risk. Since the frontend inherently reads zone densities from Firestore to render the heatmap, the frontend could simply calculate the least crowded gate locally, saving the deployment and execution cost of an entire Cloud Run service.
* **Scope Ambiguity (Map Rendering & Route Suggestion)**: The `user_flow.md` mentions rendering a "stadium map" and drawing a "recommended path". It is ambiguous whether this requires paid mapping tools (e.g., Google Maps API) or if it's a static image with coordinate overlays. A full routing integration might be too complex for a tight demo timeline.
* **Architecture Ambiguity (Routing Logic)**: It is not explicitly defined how the routing API will calculate the routing "path" beyond just identifying the best gate. Pathfinding algorithms around a stadium might exceed demo scope.

## 3. Proposed Clarifications
* **Simplify Gate Recommendation**: Clarify if the "Cloud Run Routing API" is strictly required for the hackathon criteria. If not, consider moving the "best gate recommendation" logic directly into the frontend or the existing Cloud Function to reduce architectural complexity.
* **Clarify Map Implementation**: Specify whether the frontend will use a static image with HTML canvas/CSS overlays or a third-party mapping SDK. A static image is highly recommended to guarantee zero cost and ease of implementation.
* **Define "Route Suggestion" Detail**: Clarify if "routing" simply means drawing a straight line to the best gate, or if it involves complex pathfinding. Stick to basic straight-line vectors or highlighted zones to avoid scope creep.
