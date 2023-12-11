
# introduction to install and run

# step 1 git clone and install
  git clone https://github.com/halochg/artist.git
  cd artist
  npm install


# step 1 set up backend server using json-server
  npm install -g json-server
  json-server --watch server/db.json --port 3004

# step 2 start react 
  npm start
  