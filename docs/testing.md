# Testing Strategy

This project uses simple validation and testing approaches appropriate for a hackathon prototype.

## Simulation Testing
The crowd simulation logic in Cloud Functions was tested to ensure:
- Crowd density values are generated correctly.
- Firestore documents update successfully.
- Status values (low, medium, high) match density thresholds.

## Firestore Update Verification
Realtime listeners in the frontend were tested to confirm that:
- Updates from Firestore trigger UI refresh.
- Heatmap values update dynamically.

## Routing Logic Testing
The frontend routing calculation was tested with mock data to verify:
- Correct gate recommendations based on density constraints
- Proper rendering of the straight-line vector to the recommended gate

## Container & Deployment Testing
- Verified the Docker image builds successfully.
- Validated the Cloud Run deployment serves the frontend correctly.

## Manual UI Testing
The web interface was tested manually to confirm:
- Map rendering
- Heatmap visualization
- Gate recommendation display
- Real-time updates

## Automated Logic Testing
The system includes automated unit tests to verify core algorithms:
- **Backend Categorization**: Validates that crowd density percentages map correctly to Low/Medium/High status.
- **Routing Algorithms**: Verifies the least-congested gate and food court logic.
- **Edge Case Handling**: Ensures stability with empty or malformed data.

Run these tests using:
`python3 tests/test_logic.py`

## Cost-Aware Testing
Testing was performed with limited simulation frequency to ensure the system remains 
within the hackathon budget.