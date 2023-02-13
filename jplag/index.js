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

// Options for run child process //
/*
  fork = created new child process which have the same PID of parent process, return value to parent process.
  exec = replaced parent process with child process, No return value to parent process.
  spawn = supported big amount of data.
*/
// const { fork } = require('child_process'); // Can't find an example.
// const { exec } = require('child_process'); // Size of buffer limit to 200k (If buffer is bigger than 200k program will Crash!!!)
const { spawn } = require('child_process'); // Better than exec (Size of data).

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
  var time_end = (time.getSeconds()*1000)+10000;

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
          var language = req.headers.language;

          // 2. Extract zip file.        
          decompress("./input_datasets/"+file_name, "./datasets/"+pure_file_name)
          .then(async (files) => {
            if(check_file_exists("./datasets/"+pure_file_name+"/"+pure_destination)){
              
                // 3. JPlag file. 
                /* fork */
                // -

                /* exec */
                // var path = "./datasets/"+pure_file_name+"/"+pure_destination; 
                // exec('java -jar ./jplag-4.1.0-jar-with-dependencies.jar -l'+ aug +' -r '+path+' -new '+path, (error, stdout, stderr) => {
                //   if(error){
                //     res.send({'msg': 'error'});
                //   }
                // });

                /* spawn */
                var path = "./datasets/"+pure_file_name+"/"+pure_destination; 
                var child = spawn('java', ['-jar', './jplag-4.1.0-jar-with-dependencies.jar', '-l', language, '-r', path, '-new', path]);
                child.stdout.on('data', (data) => {
                  console.log('stdout: '+data);
                })
                child.stderr.on('data', (data) => {
                  console.log('stderr: '+data);
                })
                child.on('error', (error) => {
                  console.log('error: '+error.message);
                })

                res.send({'msg': 'success'});

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
app.post('/api/result', async (req, res) => {
    var filename = req.headers.filename;
    var destination = req.headers.destination;
    var path = "./datasets/"+filename+"/"+destination+"/overview.json";

    if(check_file_exists(path)){
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          res.send({'msg': 'error'});
        }

        const jsonData = JSON.parse(data);
        res.send(jsonData);
      });
    }else{
      res.send({'msg': 'error'});
    }
});

// Response compare result.
app.post('/api/compare', (req, res) => {
  var filename = req.headers.filename;
  var destination = req.headers.destination;
  var source = req.headers.source;
  var target = req.headers.target;

  var data = "./datasets/"+filename+"/"+destination+"/"+source+"-"+target+'.json';
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
  var filename = req.headers.filename;
  var destination = req.headers.destination;
  var source = req.headers.source;
  var sourcecode = req.headers.sourcecode;

  var data = "./datasets/"+filename+"/"+destination+"/submissions/"+source+"/"+sourcecode;
  fs.readFile(data, (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }else{
      res.send(data);
    } 
  });
});

// Response sourcecode for table.
app.post('/api/table', async (req, res) => {
  var filename = req.headers.filename;
  var destination = req.headers.destination;
  var path = "./datasets/"+filename+"/"+destination+"/overview.json";

  if(check_file_exists(path)){
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        res.send({'msg': 'error'});
      }

      const jsonData = JSON.parse(data);
      res.send(jsonData);
    });
  }else{
    res.send({'msg': 'error'});
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});