import { db } from './firebase-config.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const COLORS = {
    low: 'var(--status-low)',
    medium: 'var(--status-med)',
    high: 'var(--status-high)',
    default: '#555'
};

let currentZones = [];

export function listenToCrowdData(onDataUpdate) {
    const q = collection(db, "zones");
    onSnapshot(q, (querySnapshot) => {
        currentZones = [];
        const zoneListEl = document.getElementById('zone-list');
        zoneListEl.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            currentZones.push(data);
            
            // Update MAP Nodes
            const mapNode = document.getElementById(`map-${doc.id}`);
            if (mapNode) {
                mapNode.style.fill = COLORS[data.status] || COLORS.default;
            }

            // Update List UI
            const li = document.createElement('li');
            li.innerHTML = `
                <span>
                    <span class="status-dot" style="background-color: ${COLORS[data.status]}"></span>
                    ${data.zone_name}
                </span>
                <span>${data.crowd_density}%</span>
            `;
            zoneListEl.appendChild(li);
        });

        if (onDataUpdate) onDataUpdate(currentZones);
    });
}
