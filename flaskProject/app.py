"""
Source Code: https://medium.com/@joseortizcosta/search-utility-with-flask-and-mysql-60bb8ee83dad
"""

# app.py
from flask import Flask, render_template, request, jsonify, json
from flaskext.mysql import MySQL
import pymysql
from flask_sqlalchemy import SQLAlchemy
from sshtunnel import SSHTunnelForwarder
import sshtunnel

app = Flask(__name__)

"""
DBname = project435
table name = bi_raw
server name = localhost
username = root
password = ''
"""

# Database connection info. Note that this is not a secure connection.
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'project435'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'



# Initializes MySQL, and create a connection from Flask.
# Then, it creates a cursor in order to manipulate the data in the database.
mysql = MySQL()
mysql.init_app(app)

# conn = mysql.connect()
# cursor = conn.cursor()

"""
Creates our first endpoint to search page
    1) when loaded, it will render the search.html page from the templates folder
    2) after user enters breed or breed group in the search bar and click the submit button, 
    it will use the value entered in the search field to perform a select query in the bi_raw table
    3) the data retrieved from the database is rendered using a POST request.
"""

@app.route('/')
def home():
    return render_template('search.html')


# endpoint for search
@app.route("/ajaxfile", methods=['POST', 'GET'])
def ajaxfile():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        if request.method == 'POST':
            draw = request.form['draw']
            row = int(request.form['start'])
            rowperpage = int(request.form['length'])
            searchvalue = request.form["search[value]"]
            # print(draw)
            # print(row)
            # print(rowperpage)
            # print(searchvalue)


            # Total numbers of records without filtering
            cursor.execute("SELECT count(*) as allcount FROM bi_raw")
            rsallcount = cursor.fetchone()
            totalRec = rsallcount['allcount']
            # print(totalRec)

            # Total number of records with filtering
            likeString = "%" + searchvalue +"%"
            cursor.execute("SELECT count(*) as allcount from bi_raw WHERE breed LIKE %s or bgroup LIKE %s", (likeString, likeString))
            rsallcount = cursor.fetchone()
            totalRecWithFilter = rsallcount['allcount']
            # print(totalRecWithFilter)


            # Fetch records
            if searchvalue == '':
                cursor.execute("SELECT * FROM bi_raw ORDER BY breed asc limit %s, %s;", (row, rowperpage))
                breedList = cursor.fetchall()
            else:
                cursor.execute("SELECT * from bi_raw WHERE breed LIKE %s or bgroup LIKE %s limit %s, %s;", (likeString, likeString, row, rowperpage))
                breedList = cursor.fetchall()

            data = []
            for row in breedList:
                data.append({
                    'breed': row['breed'],
                    'avgheight': row['avgheight'],
                    'avgweight': row['avgweight'],
                    'avglifespan': row['avglifespan'],
                    'classification': row['classification'],
                    'obedience': row['obedience'],
                    'bgroup': row['bgroup'],
                })

            response = {
                'draw': draw,
                'iTotalRecords': totalRec,
                'iTotalDisplayRecords': totalRecWithFilter,
                'aaData': data,
            }
            return jsonify(response)
    except Exception as e:
        raise Exception(e)

    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
