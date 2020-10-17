from flask import Flask, request, json
from .models import db, User

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../database.db"
db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/api/login", methods=["POST"])
def login():
    req = request.get_json()
    username = req.get("username")
    password = req.get("password")

    user = User.query.filter(
        User.username == username, User.password == password
    ).first()
    if user is None:
        return json.jsonify(message="user not found"), 404

    return json.jsonify(apiToken=user.apiToken)


@app.route("/api/signup", methods=["POST"])
def signup():
    req = request.get_json()

    user = User(username=req.get("username"), password=req.get("password"))

    try:
        db.session.add(user)
        db.session.commit()
        return json.jsonify({"apiToken": user.apiToken})
    except Exception as err:
        import logging

        LOGGER = logging.getLogger(__name__)
        LOGGER.error(err)
        return json.jsonify({"message": "Error creating new user"}), 400
