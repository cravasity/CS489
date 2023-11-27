from flask import Flask, jsonify, request
# import pandas as pd
import csv, json, math


app = Flask(__name__)

# data에 저장되어 있는 output csv 파일에서 data들을 가져오는 역할을 한다.
@app.route("/get-data", methods=['GET'])
def get():
    # data = pd.read_csv("/Users/juhyun/cs489/factect/data/정치_20231116_05시22분22초.csv", dtype={"date":str, "title":str, "link":str}) # (730, 4) shape의 data가 reading 된다.
    reader = open("/Users/juhyun/cs489/factdect/data/정치_20231116_05시22분22초.csv")
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

@app.route("/percentage", methods=['GET'])
def percentage():
    reader = open("/Users/juhyun/cs489/factdect/data/result_per_category_percentage.csv")
    start = True
    datas = []
    for line in reader:
        if start:
            start = not start
            continue
        each_data = line.split(",")[:5] # publisher name, fact number, fact percentage, conv percentage, fake percentage
        
        fact_float = float(each_data[2][:-1])
        conv_float = float(each_data[3][:-1])
        conv_end_float = round(fact_float+conv_float, 1)
        conv_end = str(conv_end_float) + "%"
        
        data_dict = {"publisher": each_data[0], "fact":each_data[2], "conv": conv_end, "fake": each_data[4]}
        data_json = json.dumps(data_dict)
        datas.append(data_json)
    datas.sort(key=lambda x:float(json.loads(x)["fact"][:-1]), reverse=True)
    return datas