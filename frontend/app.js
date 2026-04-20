import { listenToCrowdData } from './heatmap.js';

let bestGateId = null;
let bestFoodId = null;

// Predefined realistic paths from North Stand (500, 180) to destinations
const PATHS = {
    'gate_north': "M 500 180 L 500 120 L 500 60",
    'gate_south': "M 500 180 L 800 180 L 800 500 L 500 640",
    'gate_east': "M 500 180 L 800 180 L 900 350",
    'gate_west': "M 500 180 L 200 180 L 100 350",
    'food_east': "M 500 180 L 720 180 L 720 150",
    'food_west': "M 500 180 L 280 180 L 280 550"
};

function calculateRecommendations(zones) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.classList.add('hidden');

    // Handle Gates
    const gates = zones.filter(z => z.zone_type === 'gate');
    if (gates.length > 0) {
        gates.sort((a, b) => a.crowd_density - b.crowd_density);
        const bestGate = gates[0];
        document.getElementById('best-gate-name').innerText = bestGate.zone_name;
        document.getElementById('best-gate-name').style.color = `var(--status-${bestGate.status === 'medium' ? 'med' : bestGate.status})`;
        document.getElementById('route-gate-btn').disabled = false;
        bestGateId = bestGate.id;
    }

    // Handle Food Courts
    const foodCourts = zones.filter(z => z.zone_type === 'food_court');
    if (foodCourts.length > 0) {
        foodCourts.sort((a, b) => a.crowd_density - b.crowd_density);
        const bestFood = foodCourts[0];
        document.getElementById('best-food-name').innerText = bestFood.zone_name;
        document.getElementById('best-food-name').style.color = `var(--status-${bestFood.status === 'medium' ? 'med' : bestFood.status})`;
        document.getElementById('route-food-btn').disabled = false;
        bestFoodId = bestFood.id;
    }
}

function drawRoute(targetId) {
    if (!targetId || !PATHS[targetId]) return;
    
    const targetNode = document.getElementById(`map-${targetId}`);
    if (!targetNode) return;

    const targetX = parseFloat(targetNode.getAttribute('cx'));
    const targetY = parseFloat(targetNode.getAttribute('cy'));
    
    const routeLine = document.getElementById('route-line');
    const routePulse = document.getElementById('route-pulse');
    
    // Use the predefined concourse path
    const pathD = PATHS[targetId];
    
    routeLine.setAttribute('d', pathD);
    routePulse.setAttribute('cx', targetX);
    routePulse.setAttribute('cy', targetY);
    
    // Trigger animation re-run
    routeLine.classList.remove('visible-route');
    void routeLine.offsetWidth; // trigger reflow
    
    routeLine.classList.remove('hidden-route');
    routeLine.classList.add('visible-route');
    
    routePulse.classList.remove('hidden-route');
    routePulse.classList.add('visible-route');
}

document.addEventListener('DOMContentLoaded', () => {
    listenToCrowdData(calculateRecommendations);
    
    document.getElementById('route-gate-btn').addEventListener('click', () => drawRoute(bestGateId));
    document.getElementById('route-food-btn').addEventListener('click', () => drawRoute(bestFoodId));
});

