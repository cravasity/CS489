from flask import Flask, jsonify, request
# import pandas as pd
import csv, json, math


app = Flask(__name__)

# data에 저장되어 있는 output csv 파일에서 data들을 가져오는 역할을 한다.
@app.route("/get", methods=['GET'])
def get():
    # data = pd.read_csv("/Users/juhyun/cs489/factect/data/정치_20231116_05시22분22초.csv", dtype={"date":str, "title":str, "link":str}) # (730, 4) shape의 data가 reading 된다.
    input_pub = request.args.get('input_pub')
    reader = open("data/total_result.csv")
    start = True
    datas=[]
    for line in reader:
        if start: 
            start = not start
            continue
        date=line[:10]
        data=line[11:]
        data=data.split(",")
        publisher = data[-2]
        if publisher != input_pub:
            continue
        result = data[-1]
        title_list = data[:-2]
        title = ''.join(title_list)
                
        data_dict = {"date":date, "title":title, "result": result}
        data_json = json.dumps(data_dict)
        datas.append(data_json)
    return datas

# 모든 publisher의 fact, conv, false의 percentage 정보를 return한다.
@app.route("/percentage", methods=['GET'])
def percentage():
    reader = open("data/result_per_category_percentage.csv")
    start = True
    datas = []
    for line in reader:
        if start:
            start = not start
            continue
        each_data = line.split(",")[:5] # publisher name, data number, fact percentage, conv percentage, fake percentage
        data_num = each_data[1]
        fact_float = float(each_data[2][:-1])
        conv_float = float(each_data[3][:-1])
        conv_end_float = round(fact_float+conv_float, 1)
        conv_end = str(conv_end_float) + "%"
        
        data_dict = {"publisher": each_data[0], "data_num": data_num, "fact":each_data[2], "conv": conv_end, "fake": each_data[4]}
        data_json = json.dumps(data_dict)
        datas.append(data_json)
    datas.sort(key=lambda x:float(json.loads(x)["fact"][:-1]), reverse=True)
    return datas

# publisher 값을 넣어주면 해당 publisher의 fact, conv, false의 percentage와 number을 output 시킨다.
@app.route("/pub-info", methods=['GET'])
def publisher_info():
    input_pub = request.args.get('input_pub')
    
    start = True
    datas = []
    data_num, fact, conv, fake = 0, 0, 0, 0
    fact_num, conv_num, false_num = 0, 0, 0
    # percentage 정보 따기
    reader = open("data/result_per_category_percentage.csv")
    for line in reader:
        if start:
            start = not start
            continue
        each_data = line.split(",")[:5] # publisher name, data number, fact percentage, conv percentage, fake percentage
        publisher = each_data[0]
        if input_pub==publisher:    
            fact = each_data[2][:-1]
            conv = each_data[3][:-1]
            fake = each_data[4].strip()[:-1]
            data_num = each_data[1]
            break
    # Number 정보 따기
    start = True
    reader=open("data/result_per_category.csv")
    for line in reader:
        if start:
            start = not start
            continue
        each_data = line.split(",") # publisher name, data number, fact number, conv number, fake number
        each_data[-1] = each_data[-1].strip()
        publisher = each_data[0]
        if input_pub==publisher:
            fact_num = each_data[2]
            conv_num = each_data[3]
            false_num = each_data[4]
            break
        
    data_dict = {"publisher": publisher, "data_num": data_num, "fact_num": fact_num, "conv_num": conv_num, "false_num": false_num, "fact":fact, "conv": conv, "fake": fake}
    data_json = json.dumps(data_dict)
    datas.append(data_json)
    return datas