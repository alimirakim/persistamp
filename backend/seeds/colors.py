from backend.models import db, Color

def seed_colors():

    colors = {
        "white":              "#ffffff",
        "grey":               "#808080",
        "black":              "#000000",
        "vivid-burgundy":     "#a5243d",
        "fiery-rose":         "#ff5964",
        "antique-brass":      "#dc9e82",
        "melon":              "#ebb3a9",
        "cedar-chest":        "#be5a38",  # 16
        "sandy-brown":        "#f29e4c",  # 17
        "gold-crayola":       "#dcc48e",
        "maize-crayola":      "#f1c453",
        "corn":               "#efea5a",
        "dutch-white":        "#f4e4ba",
        "beige":              "#f2f3d9",
        "tea-green":          "#c2d8b9",
        "granny-smith-apple": "#b0f2b4",  # 10
        "inchworm":           "#b9e769",  # 20
        "light-green":        "#83e377",
        "medium-aquamarine":  "#16db93",
        "keppel":             "#0db39e",
        "blizzard-blue":      "#b8f3ff",
        "magic-mint":         "#9df7e5",
        "middle-blue":        "#8ac6d0",
        "cadet-blue":         "#58a4b0",  # 25
        "blue-munsell":       "#048ba8",
        "sapphire-blue":      "#2c699a",
        "dark-slate-blue":    "#54478c",
        "wisteria":           "#b49fcc",
        "african-violet":     "#b07bac",  # 14
        "red-violet-crayola": "#af4d98",  # 29
        "wild-orchid":        "#d66ba0",
        "cyclamen":           "#e87ea1",
    }
    
    for title, hex in colors.items():
        color = Color(title=title,
                      hex=hex,
                      mode="dark",
                      )
        db.session.add(color)

    db.session.commit()

def undo_colors():
    db.session.execute('TRUNCATE colors CASCADE;')
    db.session.execute('ALTER SEQUENCE colors_id_seq RESTART WITH 1')
    db.session.commit()
