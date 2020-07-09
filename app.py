# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
from flask import Flask, render_template

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.delicloud

# Drops collection if available to remove duplicates
#db.team.drop()

# Creates a collection in the database and inserts two documents

# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    productlist = list(db.products.find())
    print(productlist)

    # Return the template with the teams list passed in
    return render_template('index.html', productlist=productlist)

@app.route('/map')
def map():
    # Store the entire team collection in a list
    productlist = list(db.products.find())
    print(productlist)

    # Return the template with the teams list passed in
    return render_template('index2.html', productlist=productlist)

if __name__ == "__main__":
    app.run(debug=True)
