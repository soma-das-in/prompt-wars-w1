# Firestore Data Schema

Firestore is used to store **real-time crowd density information** for different stadium zones.

The schema is intentionally simple to minimize read/write costs.

---

# Collection Structure

Collection: `zones`

Each document represents a stadium zone.

Example zones include:

- Entry gates
- Food courts
- Exits
- Walkways

---

# Example Document
```
zone_name: Gate A
zone_type: gate
crowd_density: 72
status: medium
last_updated: timestamp
```


---

# Field Descriptions

| Field | Description |
|------|-------------|
| zone_name | Name of the stadium area |
| zone_type | Type of location (gate, exit, food court) |
| crowd_density | Numeric crowd density value |
| status | congestion level (low, medium, high) |
| last_updated | timestamp of last update |

---

# Cost Efficiency Considerations

To remain within the **$5 Google Cloud credit limit**, the Firestore schema is designed with:

- A **small number of documents**
- Limited write operations
- Efficient real-time listeners

This ensures the system demonstrates real-time functionality while minimizing database usage.