# SEAPlag: Back-End (Node.js)

## โครงสร้างโฟลเดอร์ (เฉพาะที่สําคัญ)
```
-> seaplag
    -> jplag                        โฟล์เดอร์ Back-End (Node.js)
        -> `datasets`               โฟลเดอร์เก็บไฟล์ผลลัพธ์ของ JPlag
        -> `input_datasets`         โฟลเดอร์เก็บไฟล์ซอร์สโค้ดที่อัปโหลดจาก Front-End
        -> `index.js`               ไฟล์สําหรับติดต่อกับ Front-End คอยรับ Request และ Response ในรูปแบบ API  
        -> `jplag-4.1.0-jar-with-dependencies.jar`      ไลบรารี JPlag ที่เอาไว้ตรวจการคักลอกซอร์สโค้ด
        -> `node_modules`           เก็บซอร์สโค้ดของ package 
        -> `package.json`           เก็บรายชื่อของ package
        -> `package-lock.json`      เก็บเวอร์ชันของ package (ป้องกันไม่ให้เวอร์ชันของ package ของสมาชิกในทีมไม่ตรงกัน)
```

## ลําดับการทํางาน
1. ซอร์สโค้ด zip ไฟล์ ของผู้ใช้งานที่อัปโหลดมาจะถูกเก็บที่ input_datasets 
2. ระบบแตก zip ไฟล์ซอร์สโค้ดนั้น แล้วไปวางที่ datasets 
4. ระบบสั่งให้ JPlag ประมวลผลซอร์สโค้ดและบันทึกผลลัพธ์ที่ datasets
5. ระบบส่งผลลัพธ์หรือไฟล์ชื่อ overview.json กลับไปยัง Front-End