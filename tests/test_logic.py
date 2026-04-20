import unittest

# --- CORE LOGIC TO TEST ---

def calculate_status(density):
    """Logic from cloud_functions/main.py"""
    if density < 40:
        return "low"
    elif density < 75:
        return "medium"
    else:
        return "high"

def get_best_recommendation(zones, zone_type):
    """Logic from frontend/app.js (Simulated for testing)"""
    filtered = [z for z in zones if z['zone_type'] == zone_type]
    if not filtered:
        return None
    # Sort by density ascending
    filtered.sort(key=lambda x: x['crowd_density'])
    return filtered[0]

# --- UNIT TESTS ---

class TestSmartStadiumLogic(unittest.TestCase):
    
    # Backend Logic Tests
    def test_backend_status_thresholds(self):
        """Verify crowd density values map correctly to status labels"""
        self.assertEqual(calculate_status(10), "low")
        self.assertEqual(calculate_status(40), "medium")
        self.assertEqual(calculate_status(75), "high")

    # Frontend Logic Tests
    def test_frontend_gate_recommendation(self):
        """Verify the system recommends the LEAST crowded gate"""
        mock_zones = [
            {'id': 'gate1', 'zone_type': 'gate', 'crowd_density': 80},
            {'id': 'gate2', 'zone_type': 'gate', 'crowd_density': 20}, # Should pick this
            {'id': 'gate3', 'zone_type': 'gate', 'crowd_density': 50}
        ]
        best = get_best_recommendation(mock_zones, 'gate')
        self.assertEqual(best['id'], 'gate2')

    def test_frontend_food_recommendation(self):
        """Verify the system recommends the LEAST crowded food court"""
        mock_zones = [
            {'id': 'food_a', 'zone_type': 'food_court', 'crowd_density': 10}, # Should pick this
            {'id': 'food_b', 'zone_type': 'food_court', 'crowd_density': 90}
        ]
        best = get_best_recommendation(mock_zones, 'food_court')
        self.assertEqual(best['id'], 'food_a')

    def test_empty_zones(self):
        """Ensure system handles empty data gracefully"""
        self.assertIsNone(get_best_recommendation([], 'gate'))

if __name__ == '__main__':
    unittest.main()
