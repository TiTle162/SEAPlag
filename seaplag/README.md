# SEAPlag: Front-End (Angular)

## โครงสร้างโฟลเดอร์ (เฉพาะที่สําคัญ)
-> seaplag<br/>
    -> seaplag                      โฟล์เดอร์ Front-End (Angular)<br/>
        -> src            <br/> 
            -> app<br/>
                -> `import`         หน้าจออัปโหลดไฟล์ซอร์สโค้ด<br/>
                -> `graph`          หน้าจอกราฟผลลัพธ์ 2 และ 3 มิติ<br/>
                -> `table`          หน้าจอตารางผลลัพธ์<br/>
                -> `details`        หน้าจอเปรียบเทียบซอร์สโค้ด<br/>
                -> `pagefault`      หน้าจอหาหน้าไม่เจอ (ไม่สําคัญ)<br/>
                -> `app.module.ts`  ไฟล์สําหรับเรียกใช้งาน Components และ Package ต่างๆ รวมถึงการทํา Routing ด้วย (สําคัญมาก)<br/>
            -> assets<br/>
                -> `img`            ตําแหน่งเก็บจําพวกไฟล์รูปภาพ<br/>
        -> node_modules             เก็บซอร์สโค้ดของ package <br/>
        -> package.json             เก็บรายชื่อของ package<br/>
        -> package-lock.json        เก็บเวอร์ชันของ package (ป้องกันไม่ให้เวอร์ชันของ package ของสมาชิกในทีมไม่ตรงกัน)<br/>

## ลําดับการทํางาน
1. เลือกภาษาและอัปโหลด zip ไฟล์ซอร์สโค้ดที่หน้า import
2. ดูผลลัพธ์ที่หน้า graph และ table
3. ดูการเปรียบเทียบซอร์สโค้ดที่หน้า details