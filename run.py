from construction_connect import create_app

app = create_app()
from flask_migrate import Migrate
from construction_connect import db

migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)
