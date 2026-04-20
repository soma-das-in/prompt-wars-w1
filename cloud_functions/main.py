import random
from google.cloud import firestore
import functions_framework

db = firestore.Client(project='prompt-wars-hackathon-493408')

ZONES = [
    {"id": "gate_north", "name": "North Gate", "type": "gate"},
    {"id": "gate_south", "name": "South Gate", "type": "gate"},
    {"id": "gate_east", "name": "East Gate", "type": "gate"},
    {"id": "gate_west", "name": "West Gate", "type": "gate"},
    {"id": "food_east", "name": "East Food Court", "type": "food_court"},
    {"id": "food_west", "name": "West Food Court", "type": "food_court"},
]

@functions_framework.http
def simulate_crowd(request):
    try:
        batch = db.batch()
        for zone in ZONES:
            density = random.randint(10, 100)
            if density < 40:
                status = "low"
            elif density < 75:
                status = "medium"
            else:
                status = "high"
            
            doc_ref = db.collection('zones').document(zone['id'])
            batch.set(doc_ref, {
                'zone_name': zone['name'],
                'zone_type': zone['type'],
                'crowd_density': density,
                'status': status,
                'last_updated': firestore.SERVER_TIMESTAMP
            }, merge=True)
        batch.commit()
        return 'Simulation updated successfully.', 200
    except Exception as e:
        return f"Error: {str(e)}", 500
