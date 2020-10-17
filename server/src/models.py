import uuid
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def generate_uuid():
    return str(uuid.uuid4())


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    apiToken = db.Column(db.String(120), unique=True, default=generate_uuid)

    def __repr__(self):
        return f"User: {self.username}, {self.password}"
    
