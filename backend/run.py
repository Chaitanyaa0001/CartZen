# run.py

from app import create_app  # ✅ correct
from app.utils.database import db  # ✅ correct

app = create_app()

if __name__ == "__main__":
    print("Starting Flask server...") 
    with app.app_context():
        db.create_all()  # Initializes DB tables
    app.run(debug=True)
