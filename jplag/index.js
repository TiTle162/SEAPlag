/* SEAPlag backend server. */

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

'use strict';

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const decompress = require("decompress");
const fs = require('fs');
const { exec } = require('child_process');

/* Express */
const app = express();

/* Multer */
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './input_datasets');
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('file');

/* CORS */
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:4200/',
  optionsSuccessStatus: 200 
}

// App
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center; font-size: 75px; margin-top: 50px;">Welcome to <br><div style="font-size: 150px;"><span style="color: Aqua;">SEA</span><span style="color: red;">Plag.</span></div></h1>');
});

// Input & Process.
app.post('/api/jplag', (req, res) => {
    // 1. Uploaded zip file.
    upload(req, res, function (err) {
      if (err) {
        res.send({'msg': 'error'});
      } else {
        var file_name = req.file.filename;
        var destination = req.headers.destination;

        // 2. Extract zip file.        
        decompress("./input_datasets/"+file_name, "./datasets/"+file_name.slice(0, -4))
        .then((files) => {
          // 3. Process plagiarism of source code with JPlag.
          exec('java -jar ./jplag-4.1.0-jar-with-dependencies.jar -r ./datasets/'+file_name.slice(0, -4)+'/'+destination.slice(0, -4)+' -new ./datasets/'+file_name.slice(0, -4)+'/'+destination.slice(0, -4), (error, stdout, stderr) => {
            if (error) {
              res.send({'msg': 'error'});
            }
          });

          setTimeout(() => {
            res.send({'msg': 'error'});
          }, 30000)

          // Check file exists.
          while(true){
            var filePath = './datasets/'+file_name.slice(0, -4)+'/'+destination.slice(0, -4)+'/overview.json';
            if (fs.existsSync(filePath)) {
              res.send({'msg': 'success'});
              break;
            }else{
              continue;
            }
          }   
        })
        .catch((error) => {
          res.send({'msg': 'error'});
        });
      }
    })
});

// Response plagirism results.
app.post('/api/result', (req, res) => {
  var path1 = req.headers.path1;
  var path2 = req.headers.path2;

  var data = "./datasets/"+path1+"/"+path2+"/overview.json";
  fs.readFile(data, (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }else{
      var jsonData = JSON.parse(data);
      res.send(jsonData);
    } 
  });
});

// Response compare result.
app.post('/api/compare', (req, res) => {
  var path1 = req.headers.path1;
  var path2 = req.headers.path2;
  var source = req.headers.source;
  var target = req.headers.target;

  var data = "./datasets/"+path1+"/"+path2+"/"+source+"-"+target+'.json';
  fs.readFile(data, (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }else{
      var jsonData = JSON.parse(data);
      res.send(jsonData);
    } 
  });
});

// Response sourcecode.
app.post('/api/sourcecode', (req, res) => {
  var path1 = req.headers.path1;
  var path2 = req.headers.path2;
  var owner = req.headers.owner;
  var filename = req.headers.filename;

  var data = "./datasets/"+path1+"/"+path2+"/submissions/"+owner+"/"+filename;
  fs.readFile(data, (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }else{
      res.send(data);
    } 
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});