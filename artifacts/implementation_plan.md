# Smart Stadium Crowd Navigation Assistant Implementation Plan

This implementation plan outlines the steps required to build the Smart Stadium Crowd Navigation MVP based on the constraints and clarifications from `IMPLEMENTATION_SCOPE_REVIEW_v3.md` and the existing workspace documentation. 

No code is generated during this phase, as per the user request.

## Goal Description

Build a highly cost-efficient MVP (< $5) to demonstrate real-time crowd navigation within a stadium. The system will rely on Firestore for real-time state, Cloud Functions for simulated density data updates, and a containerized static frontend hosted on Cloud Run that contains all mapping and routing logic.

## Proposed Changes

The project will be built from scratch following the folder structure outlined in `README.md`.

---

### Firestore Backend configuration

Setup the database foundation.

#### [NEW] `firebase.json` & `.firebaserc`
- Define the Firebase project configuration.
- Set up Firestore security rules allowing read-only access to unauthenticated users (for the Cloud Run frontend) and restricting writes strictly to the Cloud Function.

#### [NEW] `firestore.rules` 
- Set least-privilege security rules as outlined in `docs/security.md`.

---

### Cloud Functions (Crowd Simulation)

Implement the automated data simulation layer.

#### [NEW] `cloud_functions/requirements.txt`
- Detail standard Python dependencies such as `firebase-admin` and `google-cloud-firestore`.

#### [NEW] `cloud_functions/crowd_simulation.py`
- Create a python script that interfaces with Firestore.
- Generate random/mock density metrics for pre-defined "zones" (e.g. gates, food courts).
- Calculate status constraints (low, medium, high).

---

### Frontend Application (UI & Logic)

Implement the static web application and client-side routing logic.

#### [NEW] `frontend/index.html`
- Create base markup including the stadium map static image and container zones.

#### [NEW] `frontend/styles.css`
- Apply styling for the heatmap overlays, responsive layout, and straight-line vector rendering for routing logic.

#### [NEW] `frontend/firebase-config.js`
- Hold the frontend configuration to connect to the Firebase environment.

#### [NEW] `frontend/heatmap.js`
- Initialize Firestore listener for the `zones` collection.
- Update map zone colors (Green, Yellow, Red) dynamically on data change.

#### [NEW] `frontend/app.js`
- Implement local client-side logic to determine the "least crowded gate" by sorting active gate densities from Firestore state.
- Create mapping bindings to draw a straight-line vector overlay between the user's selected position and the recommended gate.

---

### Containerization & Deployment

Prepare the frontend to be hosted on Google Cloud Run.

#### [NEW] `frontend/nginx.conf`
- Basic Nginx server configuration pointing to the static files directory. 

#### [NEW] `frontend/Dockerfile`
- Compose the lightweight web server image (e.g., `nginx:alpine`).
- Copy `index.html`, `app.js`, `styles.css`, etc. into the nginx HTML directory.

---

## Architecture Considerations 
> [!TIP]
> **Cost Control**
> By removing the Cloud Run Routing API, we eliminate one potential cost vector. The frontend Cloud Run service scales to zero when un-used, and the Cloud Function is bound by a scheduler, keeping operations severely restricted to meet the $5 limit.

> [!CAUTION]
> **Deployment Requirements**
> Standard GCP deployment scripts or continuous integration will be needed to push the Cloud Function and the Docker image to the Artifact Registry and Cloud Run. The user flow requires the Cloud service to be publicly accessible (`--allow-unauthenticated`).

## Open Questions

> [!WARNING]
> Please review the following questions before executing this plan:
> 1. Do you have a specific generic image (e.g., a `.png` or `.svg`) you want to use as the base "stadium map" for the static UI, or should a placeholder be created?
> 2. Are there any particular predefined "zones" I should hardcode into the frontend and Cloud function simulation, or should I generate a generic list (e.g., "North Gate", "South Gate", "East Food Court")?

## Verification Plan

### Automated/Mock Tests
1. **Routing Logic Tests (`app.js`)**: Execute mock inputs directly to the routing functions to verify it sorts to the least crowded gate properly. 
2. **Container Build**: Run `docker build -t smart-stadium .` in the frontend directory to ensure Nginx compiles the files properly without error. 

### Manual Verification
1. **Local Frontend Execution**: Open `index.html` manually in a web browser without the server to verify Firestore connectivity and heatmap interactions.
2. **Simulation Validation**: Create a test invocation of the Python cloud function locally to assert it correctly randomizes and pushes density updates to Firestore.
3. **Cloud Run Validation**: Deploy the container to a live Cloud Run endpoint and assert the application resolves successfully over HTTPS.
