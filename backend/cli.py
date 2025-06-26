from flask.cli import FlaskGroup
from run import app
from construction_connect import db

cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
