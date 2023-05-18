from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient(
    "mongodb+srv://one_week:test@cluster0.z3lmmyi.mongodb.net/?retryWrites=true&w=majority",
    tlsCAFile=ca,
)

db = client.dbsparta

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/message", methods=["POST"])
def message_post():
    name_receive = request.form["name_give"]
    message_receive = request.form["message_give"]
    name_from = request.form["name_from"]
    doc = {"name": name_receive, "message": message_receive, "from": name_from}
    db.message.insert_one(doc)
    return jsonify({"msg": "저장 완료!"})

@app.route("/member", methods=["GET"])
def member_get():
    all_members = list(db.member.find({}, {"_id": False}))
    return jsonify({"result": all_members})

@app.route("/message", methods=["GET"])
def message_get():
    all_message = list(db.message.find({}, {"_id": False}))
    return jsonify({"result": all_message})

# 메시지 수신 코드 구문 각각 1개씩

@app.route("/hanbyul", methods=["GET"])
def comment_get1():
    all_comment = list(db.hanbyul.find({}, {"_id": False}))
    return jsonify({"result": all_comment})

@app.route("/hojin", methods=["GET"])
def comment_get2():
    all_comment = list(db.hojin.find({}, {"_id": False}))
    return jsonify({"result": all_comment})

@app.route("/kyungmo", methods=["GET"])
def comment_get3():
    all_comment = list(db.kyungmo.find({}, {"_id": False}))
    return jsonify({"result": all_comment})

# 메시지 송신 코드 구문 각각 1개씩

@app.route("/hanbyul", methods=["POST"])
def message_post1():
    name_from = request.form["name_from"]
    send_message = request.form["send_message"]
    doc = {"from": name_from, "comment": send_message}
    db.hanbyul.insert_one(doc)
    return jsonify({"msg": "저장 완료!"})

@app.route("/hojin", methods=["POST"])
def message_post2():
    name_from = request.form["name_from"]
    send_message = request.form["send_message"]
    doc = {"from": name_from, "comment": send_message}
    db.hojin.insert_one(doc)
    return jsonify({"msg": "저장 완료!"})

@app.route("/kyungmo", methods=["POST"])
def message_post3():
    name_from = request.form["name_from"]
    send_message = request.form["send_message"]
    doc = {"from": name_from, "comment": send_message}
    db.kyungmo.insert_one(doc)
    return jsonify({"msg": "저장 완료!"})

if __name__ == "__main__":
    app.run("0.0.0.0", port=5002, debug=True)