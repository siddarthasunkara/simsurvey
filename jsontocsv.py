import pandas as pd
import json

# 1. Load your flat CSV (the one you already have from Excel)
df = pd.read_csv("personas.csv")

# 2. Identify trait columns (they all start with "traits__")
trait_cols = [c for c in df.columns if c.startswith("traits__")]

# 3. Build new dataframe with name, description, traits(JSON)
records = []
for _, row in df.iterrows():
    traits = {c.replace("traits__", ""): row[c] for c in trait_cols}
    records.append({
        "name": row["name"],
        "description": row["description"],
        "traits": json.dumps(traits)  # store as JSON string
    })

new_df = pd.DataFrame(records)

# 4. Save to new CSV
new_df.to_csv("personas_json.csv", index=False)
print("✅ personas_json.csv created successfully!")
