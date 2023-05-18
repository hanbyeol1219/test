from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://oneweek:oneweek8@cluster0.bjgzxzp.mongodb.net/?retryWrites=true&w=majority')
db = client.OneWeek

@app.route('/')
def oneweek(): return render_template("index.html")



## 저장 - 예시
#doc = {'name':'bobby','age':21}
#db.users.insert_one(doc)
#
## 한 개 찾기 - 예시
#user = db.users.find_one({'name':'bobby'})
#
## 여러개 찾기 - 예시 ( _id 값은 제외하고 출력)
#all_users = list(db.users.find({},{'_id':False}))
#
## 바꾸기 - 예시
#db.users.update_one({'name':'bobby'},{'$set':{'age':19}})
#
## 지우기 - 예시
#db.users.delete_one({'name':'bobby'})





# 새로 치는 코드

doc = [{
    'image':'./static/image/hanbyeol.jpg',
    'name':'이한별',
    'age':27,
    'address':'광주',
    'blood':'O형',
    'hobby':'ott 시청',
    'mbti':'ENTJ',
    'blog':'https://velog.io/@lhb971219',
    'mind':'많은 친구 및 동료 사귀기! <br>내일 배움캠프 완벽 수료!<br> 멋진 프론트엔드 개발자 되기',
    'say': '안녕하세요 :) <br> 잘부탁드립니다!'
},{
    'image':'./static/image/img.png',
    'name':'임호진',
    'age':28,
    'address':'의정부',
    'blood':'A형',
    'hobby':'LOL',
    'mbti':'ISTJ',
    'blog':'https://velog.io/@lhb971219',
    'mind':'열심히 배우자!',
    'say': '화이팅 합시다!'
},{
    'image':'./static/image/img.png',
    'name':'서경모',
    'age':30,
    'address':'안양',
    'blood':'B형',
    'hobby':'독서',
    'mbti':'INTJ',
    'blog':'https://ezsswil.tistory.com/',
    'mind':'내가 짱~!',
    'say': '다들 화이팅!!!'
}]

# db.members.insert_many(doc)

# get 요청
@app.route("/member", methods=["GET"])
def member_get():
    all_members = list(db.members.find({}, {"_id": False}))
    return jsonify({"result": all_members})

#------------
if __name__ == "__main__":
    app.run("0.0.0.0", port=5009, debug=True)
