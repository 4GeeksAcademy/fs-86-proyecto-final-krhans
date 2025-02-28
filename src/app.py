import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
jwt = JWTManager(app)

setup_admin(app)
setup_commands(app)

app.register_blueprint(api, url_prefix='/api')

# Define the static file directory
static_file_dir = os.path.join(app.root_path, 'static')


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    return send_from_directory(os.path.join(app.root_path, 'public'), 'index.html')



@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    file_path = os.path.abspath(os.path.join(static_file_dir, path))

    if not os.path.isfile(file_path):
        return jsonify({"error": "Archivo no encontrado"}), 404

    return send_from_directory(static_file_dir, path)


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
