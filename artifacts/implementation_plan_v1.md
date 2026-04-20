# Implementation Plan - Smart Stadium Navigation Phase 2

This plan outlines the updates required to transition the Smart Stadium Navigation MVP from basic "as-the-crow-flies" routing to a more realistic, feature-rich experience.

## User Review Required

> [!IMPORTANT]
> The "Proper Directions" will be implemented using fixed SVG path segments that follow the stadium concourse. This avoids "walking through the field" but does not support dynamic obstacle avoidance (e.g., if a corridor is closed).

> [!NOTE]
> The initial user location will be fixed at a specific coordinate in the stands (e.g., North-East Stand) for the demo.

## Proposed Changes

### Frontend Improvements

#### [MODIFY] [index.html](file:///Users/soma/Library/CloudStorage/GoogleDrive-soma.09@gmail.com/My%20Drive/github_soma_das_in/prompt-wars-w1/frontend/index.html)
- Add a new `<image>` tag inside the SVG to overlay a real 2D stadium floor plan.
- Add a new action button for "Find Least Congested Food Court".
- Set a new fixed initial coordinate for the `user-location` circle in the stands.
- Define hidden `<path>` elements representing the concourse "walkways" to be used for routing.

#### [MODIFY] [app.js](file:///Users/soma/Library/CloudStorage/GoogleDrive-soma.09@gmail.com/My%20Drive/github_soma_das_in/prompt-wars-w1/frontend/app.js)
- Implement logic to track both "Least Crowded Gate" and "Least Crowded Food Court" simultaneously.
- Update `drawRoute` to handle destination selection (Gate vs Food Court).
- Replace quadratic bezier routing logic with a lookup table of polyline path strings that follow the stadium corridors.
- Integrate the new food court recommendation button.

#### [MODIFY] [styles.css](file:///Users/soma/Library/CloudStorage/GoogleDrive-soma.09@gmail.com/My%20Drive/github_soma_das_in/prompt-wars-w1/frontend/styles.css)
- Style the new navigation button to match the premium dark-mode aesthetic.
- Add a `.concourse-path` class for the new realistic route lines.
- Adjust the `stadium-map` container to ensure the floor plan image scales correctly with the SVG overlays.

---

## Open Questions

- **Image Choice:** Do you have a specific stadium image (SVG/PNG) you want me to use, or should I generate a generic high-tech floor plan?
- **User Location:** Which stand would you like the user to "start" in for the demo? (e.g., North Stand, VIP Box, etc.)

---

## Verification Plan

### Automated/Tool-based Tests
- Use the `browser_subagent` to verify the UI:
  1. Confirm both "Gate" and "Food Court" buttons toggle the correct route overlays.
  2. Verify the "YOU ARE HERE" tracker is positioned in the stands, not the center pitch.
  3. Ensure the heatmap colors correctly update based on simulated Firestore data.

### Manual Verification
- Visual inspection of the route lines to ensure they follow logical concourse paths rather than crossing the field.
- Verify the responsive behavior of the new button layout on smaller screen sizes.
