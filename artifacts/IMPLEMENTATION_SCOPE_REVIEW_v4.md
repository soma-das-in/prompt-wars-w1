# IMPLEMENTATION_SCOPE_REVIEW_v4.md

## 1. Cohesiveness and MVP Realism
- **Cohesiveness:** All four updates directly reinforce the core value proposition: improving fan experience via real-time crowd-aware navigation.
- **MVP Realism:** The additions are realistic for a hackathon demo, assuming "proper directions" are implemented as predefined path segments rather than a dynamic navigation engine.
- **User Flow Alignment:** Shifting the starting point to the stands makes the landing experience more relatable and highlights the "from-seat-to-destination" utility.

## 2. Scope Ambiguity and Over-engineering Risks
- **"Proper Directions" (Risk):** Attempting to implement a true Dijkstra-based pathfinding algorithm for a static image map could be over-engineering. 
  - *Mitigation:* Use simple, pre-drawn SVG polyline paths that follow the stadium's concourse layout rather than straight-line "as-the-crow-flies" vectors.
- **"Stadium Image Overlay" (Ambiguity):** Using a high-fidelity 3D render might clash with the simple CSS heatmap overlays.
  - *Recommendation:* Stick to a clean 2D architectural floor plan (SVG or PNG) to ensure the heatmap zones align perfectly with the image.
- **"Food Court Recommendation" (Redundancy):** If the logic for "Least Crowded Gate" is already present, adding food courts is a low-effort, high-impact duplication of existing logic.

## 3. Necessary Clarifications
- **Navigation Type:** Should the "proper directions" be static paths (predetermined best routes) or dynamic (avoiding red zones in real-time)? 
  - *Assumption:* Static paths following stadium walkways are best for MVP to avoid "routing into a wall" (the field).
- **User Location:** Will the initial location be fixed for the demo, or should it be selectable?
  - *Assumption:* Fixed initial location in a specific stand section is sufficient for a demo.

## 4. Final Scope Validation
- The updated scope remains within the **$5 Google Cloud credit limit** as it only increases frontend logic and static assets, without adding backend complexity or high-frequency API calls.
- The project maintains its **Smart Stadium** focus without drifting into unrelated feature sets.
