from flask import Flask, render_template, request
from datetime import datetime
import calendar
import time
import psycopg2
app = Flask(__name__)

#-------------------------connecting to db-------------------------------------------------------
con = psycopg2.connect(
database="aiwdb",
user="postgres",
password="Login@me1",
host="localhost",
port= '5432'
)
cursor_obj = con.cursor()


#-------------------------home page--------------------------------------------------------------
@app.route('/home/', methods=['GET', 'POST'])
def welcome():
    return "AI_WORKBENCH"


#-------------------------upload data------------------------------------------------------------
@app.route('/upload_data/', methods=['POST'])
def upload_file():
  try:
    flag = 0
    ftype = ""
    if request.method == 'POST':
      f = request.files['file']
      #-------------------------Fetching file data in binary-------------------------------------
      d = f.read()
      #-------------------------Fetching file name-----------------------------------------------
      fname = f.filename
      #-------------------------Computing file size----------------------------------------------
      fsize = len(d)*0.001
      #-------------------------Fetching current or uploading timestamp--------------------------
      current_GMT = time.gmtime()
      dt = calendar.timegm(current_GMT)
      dt_object = datetime.fromtimestamp(dt)
      #-------------------------Currently manually giving userid---------------------------------
      uid = 'daniyal012'
      #-------------------------Extracting filetype from filename--------------------------------
      ftype = fname.split('.')[-1]
      #-------------------------Inserting into db---------------------------------
      cursor_obj.execute("INSERT INTO public.dataset(file_size, upload_time, user_id, file_type, file_name, data) VALUES(%s, %s, %s, %s,%s, %s);",(fsize, dt_object, uid, ftype, fname, d))
      con.commit()
      return "File Uploaded Successfully"
  except Exception as e:
    return str(e)
  finally:
    con.close()

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug = True)
