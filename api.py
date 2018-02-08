from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def hello_world():
	return "Hello World!"

@app.route('/<test-name>')
def hello_world():
	return "Hello {}!".format(name)

if __name__ == '__main__':
	app.run()