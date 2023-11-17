from flask import Flask, jsonify, request
# import pandas as pd
import csv
import json


app = Flask(__name__)

# data에 저장되어 있는 output csv 파일에서 data들을 가져오는 역할을 한다.
@app.route("/get-data", methods=['GET'])
def get():
    # data = pd.read_csv("/Users/juhyun/cs489/factect/data/정치_20231116_05시22분22초.csv", dtype={"date":str, "title":str, "link":str}) # (730, 4) shape의 data가 reading 된다.
    reader = open("/Users/juhyun/cs489/factect/data/정치_20231116_05시22분22초.csv")
    start = True
    datas=[]
    for line in reader:
        if start: 
            start = not start
            continue
        
        date=line[:19]
        data=line[20:]
        data=data.split("https")
        if len(data)<2:
            continue
        title=data[0][:-1]
        link=("https"+data[1])[:-2]
        
        data_dict = {"date":date, "title":title, "link":link}
        data_json = json.dumps(data_dict)
        datas.append(data_json)
    return datas

@app.route("/sign-up", methods=['POST'])
def sign_up():
    user = request.json
    response = {
        'name': user['name'],
        'email': user['email'],
        'password': user['password'],
        'profile': user['profile']
    }
    return jsonify(response), 200