from flask import Flask, render_template, request, jsonify
from datetime import datetime
import calendar
import time
import pandas as pd
import psycopg2
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

#-------------------------connecting to db-------------------------------------------------------
con = psycopg2.connect(
database="aiwdb",
user="postgres",
password="Login@me1",
host="localhost",
port= '5432'
)


#-------------------------home page--------------------------------------------------------------
@app.route('/home/', methods=['GET', 'POST'])
def welcome():
    return "AI_WORKBENCH"


#-------------------------upload data------------------------------------------------------------
@app.route('/upload_data/', methods=['POST'])
def upload_file():
  cursor_obj = con.cursor()
  try:
    flag = 0
    ftype = ""
    if request.method == 'POST':
      f = request.files['file']
      #-------------------------Fetching file data in binary-------------------------------------
      d = f.read()
      #-------------------------Fetching file name-----------------------------------------------
      fn = f.filename
      fname = fn.split('.')[0]
      #-------------------------Computing file size----------------------------------------------
      fsize = len(d)*0.001
      #-------------------------Fetching current or uploading timestamp--------------------------
      current_GMT = time.gmtime()
      dt = calendar.timegm(current_GMT)
      dt_object = datetime.fromtimestamp(dt)

      #-------------------------Currently manually giving userid---------------------------------
      uid = 'daniyal012'
      #-------------------------Extracting filetype from filename--------------------------------
      ftype = fn.split('.')[-1]
      #-------------------------Inserting into db---------------------------------
      cursor_obj.execute("INSERT INTO public.dataset(file_size, upload_time, user_id, file_type, file_name, data) VALUES(%s, %s, %s, %s,%s, %s);",(fsize, dt_object, uid, ftype, fname, d))
      con.commit()

      data = {'message' : 'Successfull'}
      return jsonify(data), 200
  except Exception as e:
    data = {'message' : str(e)}
    return jsonify(data), 500
  finally:
    cursor_obj.close()
#-------------------------get datasets------------------------------------------------------------

@app.route('/datasets/', methods=['GET'])
def data_sets():
    try:
        sql = '''SELECT data_id, file_name, user_id, upload_time, file_size, file_type FROM public.dataset;'''
        df = pd.read_sql_query(sql, con)
        df=df.sort_values(by='upload_time', ascending=False)
        df['upload_time'] = df['upload_time'].astype('str')
        d = df.to_json(orient = "records")
        return jsonify(eval(d)), 200
    except Exception as e:
        data = {'message' : str(e)}
        return jsonify(data), 500

@app.route('/dataset_dropdown/', methods=['GET'])
def dataset_dropdown():
    try:
        sql = '''SELECT data_id, file_name, upload_time FROM public.dataset;'''
        df = pd.read_sql_query(sql, con)
        df=df.sort_values(by='upload_time', ascending=False)
        df['upload_time'] = df['upload_time'].astype('str')
        df["dataname"] = df['file_name'] +" ["+ df["upload_time"] + " ]"
        listdata = df[['data_id', 'dataname']]
        listdata.rename(columns = {'data_id':'dataid'}, inplace = True)
        listjson = listdata.to_json(orient = "records")
        return jsonify(eval(listjson)), 200
    except Exception as e:
        data = {'message' : str(e)}
        return jsonify(data), 500


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug = True)