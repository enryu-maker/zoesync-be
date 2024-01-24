from flask import Flask, jsonify, request
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()
app = Flask(__name__)


@app.route('/read', methods=['GET'])
def read_rfid():
    try:
        id, text = reader.read()
        print(id)
        print(text)
        return jsonify({"user": text})
    finally:
        GPIO.cleanup()


@app.route('/write', methods=['POST'])
def write_rfid():
    data = request.get_json()
    uid = data.get('user')
    try:
        print("Now place your tag to write")
        reader.write(str(uid))
        return jsonify({"msg": "Written"})
    finally:
        GPIO.cleanup()


if __name__ == '__main__':
    app.run(debug=True)
