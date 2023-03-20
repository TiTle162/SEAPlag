# SEAPlag: Front-End (Angular)

## โครงสร้างโฟลเดอร์ (เฉพาะที่สําคัญ)
-> seaplag
<&nbsp;>    -> seaplag                      โฟล์เดอร์ Front-End (Angular)
<&nbsp;><&nbsp;>        -> src             
<&nbsp;><&nbsp;><&nbsp;>            -> app
<&emsp;>                -> `import`         หน้าจออัปโหลดไฟล์ซอร์สโค้ด
<&emsp;>                -> `graph`          หน้าจอกราฟผลลัพธ์ 2 และ 3 มิติ
<&emsp;>                -> `table`          หน้าจอตารางผลลัพธ์
<&emsp;>               -> `details`        หน้าจอเปรียบเทียบซอร์สโค้ด
<&emsp;>                -> `pagefault`      หน้าจอหาหน้าไม่เจอ (ไม่สําคัญ)
<&emsp;>                -> `app.module.ts`  ไฟล์สําหรับเรียกใช้งาน Components และ Package ต่างๆ รวมถึงการทํา Routing ด้วย (สําคัญมาก)
<&nbsp;><&nbsp;><&nbsp;>            -> assets
                -> `img`            ตําแหน่งเก็บจําพวกไฟล์รูปภาพ
<&nbsp;><&nbsp;>        -> node_modules             เก็บซอร์สโค้ดของ package 
<&nbsp;><&nbsp;>        -> package.json             เก็บรายชื่อของ package
<&nbsp;><&nbsp;>        -> package-lock.json        เก็บเวอร์ชันของ package (ป้องกันไม่ให้เวอร์ชันของ package ของสมาชิกในทีมไม่ตรงกัน)

## ลําดับการทํางาน
1. เลือกภาษาและอัปโหลด zip ไฟล์ซอร์สโค้ดที่หน้า import
2. ดูผลลัพธ์ที่หน้า graph และ table
3. ดูการเปรียบเทียบซอร์สโค้ดที่หน้า details