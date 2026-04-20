# Implementation Scope Review (v2)

This document reflects the updated, refined scope for the Smart Stadium Crowd Navigation Assistant MVP, addressing initial concerns of over-engineering and ambiguity.

## 1. Cohesion and Realism for a Demo-Ready MVP
* **Highly Cohesive Design**: The architectural choices (Firebase, Cloud Functions, static frontend) strongly align with the hackathon's requirement for a lightweight, low-cost ($5 limit) solution.
* **Simplified Infrastructure**: Removed the unnecessary Cloud Run API. Using static HTML/JS for both the frontend UI and the routing logic simplifies deployment and guarantees lower cost.
* **Cost Constraints Met**: Scheduling crowd simulation to Firestore at controlled intervals (e.g., 120 seconds) appropriately restricts database writes, while the static frontend incurs zero compute cost.
* **Clear User Journey**: The user flow concisely maps out exactly what the judges or users will see, from initial load to real-time heatmap updates and local routing.

## 2. Resolved Scope Ambiguities & Clarifications
* **Eliminated Over-Engineering (Routing Logic)**: The "best gate" analysis has been successfully shifted from a dedicated Cloud Run service to the static frontend. Since the frontend inherently reads zone densities from Firestore to render the heatmap, calculating the optimal gate locally avoids the deployment complexity and potential cost of a separate backend API.
* **Clarified Map Rendering**: The scope now explicitly uses a static stadium map image with CSS overlays rather than an interactive third-party API (like Google Maps). This removes external dependencies and ensures zero cost for the map visualization.
* **Defined "Route Suggestion"**: The routing visual is constrained to drawing a simple straight-line vector to the recommended gate on the static map overlay. This appropriately bounds the scope and avoids unnecessary complex pathfinding algorithms that would distract from the core MVP value.

## 3. Final Conclusion
The project scope is now fully optimized for a $5-budget hackathon. The architecture is cleanly separated, avoids over-engineering, and the intended features (real-time heatmaps, crowd simulation, optimal routing) are realistic and achievable for a demo.
