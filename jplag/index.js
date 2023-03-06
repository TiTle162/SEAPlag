/* SEAPlag backend server. */

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';
const PATH = 'http://localhost:4200/';

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
const { spawn, spawnSync } = require('child_process'); // Better than exec (Size of data).

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
  origin: PATH,
  optionsSuccessStatus: 200 
}

// App
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center; font-size: 75px; margin-top: 50px;">Welcome to <br><div style="font-size: 150px;"><span style="color: Aqua;">SEA</span><span style="color: red;">Plag.</span></div></h1>');
});

async function check_similarity(language, path, pure_file_name, pure_destination){
  try{
    var child = await spawnSync('java', ['-jar', './jplag-4.1.0-jar-with-dependencies.jar', '-l', language, '-r', path+'res', '-new', path]);
    await decompress('./datasets/'+pure_file_name+'/'+pure_destination+"res.zip", path);
    return '{"msg": "success"}';
  }catch(error){
    return '{"msg": "error"}';
  }
}

// Input & Process.
app.post('/api/jplag', async (req, res) => {
      // 1. Uploaded zip file.
      await upload(req, res, async function (err) {
        if(err){
          res.send({'msg': 'error'});
        }else{
          var file_name = req.file.filename;
          var destination = req.headers.destination;
          var pure_file_name = req.file.filename.slice(0, -4);
          var pure_destination = req.headers.destination.slice(0, -4);
          var language = req.headers.language;

          // 2. Extract zip file.        
          await decompress("./input_datasets/"+file_name, "./datasets/"+pure_file_name);
          var path = "./datasets/"+pure_file_name+"/"+pure_destination; 

          // 3. Check similarity.
          var result = await check_similarity(language, path, pure_file_name, pure_destination);
          res.send(result);
        }
      });
});

// Response plagirism results.
app.post('/api/result', async (req, res) => {
  var filename = req.headers.filename;
  var destination = req.headers.destination;
  var path = "./datasets/"+filename+"/"+destination+"/overview.json";

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
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

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      res.send({'msg': 'error'});
    }
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});