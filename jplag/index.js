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

function check_file_exists(path){
  var time= new Date();
  var time_start = '';
  var time_end = (time.getSeconds()*1000)+15000;

  while(true){
    time_start = (time.getSeconds()*1000);
    if (fs.existsSync(path)) {
      return true;
    }else if(time_start === time_end){
      return false;
    }else{
      continue;
    }
  }
}

// Input & Process.
app.post('/api/jplag', (req, res) => {

      // 1. Uploaded zip file.
      upload(req, res, function (err) {
        if(err){
          res.send({'msg': 'error'});
        }else{
          var file_name = req.file.filename;
          var destination = req.headers.destination;
          var pure_file_name = req.file.filename.slice(0, -4);
          var pure_destination = req.headers.destination.slice(0, -4);
          var aug = req.headers.aug;

          // 2. Extract zip file.        
          decompress("./input_datasets/"+file_name, "./datasets/"+pure_file_name)
          .then((files) => {
            if(check_file_exists("./datasets/"+pure_file_name+"/"+pure_destination)){
              
              // 3 JPlag file. 
              var path = "./datasets/"+pure_file_name+"/"+pure_destination; 
              exec('java -jar ./jplag-4.1.0-jar-with-dependencies.jar -l'+ aug +' -r '+path+' -new '+path, (error, stdout, stderr) => {
                if(error){
                  res.send({'msg': 'error'});
                }
              });

              if(check_file_exists("./datasets/"+pure_file_name+"/"+pure_destination+"/overview.json")){
                res.send({'msg': 'success'});

                // fs.readFile(path, (err, data) => {
                //   if(err){
                //     res.send({'msg': 'error'});
                //   }else{
                //     var jsonData = JSON.parse(data);
                //     res.send(jsonData);
                //   } 
                // });
              }else{
                res.send({'msg': 'error'});
              }
            }else{
              res.send({'msg': 'error'});
            }
          })
          .catch((error) => {
            res.send({'msg': 'error'});
          });
        }
      });
});

// Response plagirism results.
// app.post('/api/result', (req, res) => {
//     var path1 = req.headers.path1;
//     var path2 = req.headers.path2;
  
//     if(check_file_exists("./datasets/"+path1+"/"+path2+"/overview.json")){
//       res.send({'msg': 'success +++'});

//       // fs.readFile(path, (err, data) => {
//       //   if(err){
//       //     res.send({'msg': 'error'});
//       //   }else{
//       //     var jsonData = JSON.parse(data);
//       //     res.send(jsonData);
//       //   } 
//       // });
//     }else{
//       res.send({'msg': 'error'});
//     }
// });

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