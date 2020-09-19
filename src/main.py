from config import config
from flasgger import Swagger

from app import create_app

enviroment = config['development']

app = create_app(enviroment)

app.config["SWAGGER"] = {
"swagger_version": "2.0",
"title": "Sales API",
"specs": [
    {
        "version": "0.0.1",
        "title": "Sales",
        "endpoint": "spec",
        "route": "/app/spec",
        "rule_filter": lambda rule: True,  # all in
    }
],
"static_url_path": "/apidocs",
}

Swagger(app)

if __name__ == '__main__':
    app.run()