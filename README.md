# SEAPlag (SEAP)
- ระบบแสดงผลลัพธ์การตรวจสอบความคล้ายคลึงของซอร์สโค้ด
- เว็บแอปพลิเคชันสําหรับตรวจสอบความคล้ายคลึงของซอร์สโค้ดภายในกลุ่มของซอร์สโค้ดที่ผู้ใช้งานนําเข้าสู่ระบบ และแสดงผลในรูปแบบของกราฟซึ่งประกอบไปด้วย Node แทนเจ้าของซอร์สโค้ด และ Edge แทนร้อยละความคล้ายคลึงของซอร์สโค้ดระหว่างชุดซอร์สโค้ดที่เปรียบเทียบด้วย

# Architecture
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Architecture.PNG?raw=true)

# Screens
## 1. Select programming language and import source code page.
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Screens/Import%20Source%20Code%20Page.PNG?raw=true)
## 2. Source code similarity(%) 2D graph page.
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Screens/2DGraph%20Page.PNG?raw=true)
## 3. Source code similarity(%) 3D graph page.
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Screens/3DGraph%20Page.PNG?raw=true)
## 4. Source code similarity(%) table page.
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Screens/Table%20Page.PNG?raw=true)
## 5. Compare source code page.
![alt text](https://github.com/TiTle162/SEAPlag/blob/main/SEAP-Screens/Compare%20Page.PNG?raw=true)

## โครงสร้างโฟลเดอร์
```
-> SEAPlag
    -> jplag        โฟล์เดอร์ Back-End (Node.js)
    -> seaplag      โฟล์เดอร์ Front-End (Angular)
    -> template     โฟลเดอร์ template ของเว็บ
    -> datasets     ข้อมูลสําหรับทดสอบระบบ
```

## เริ่มต้น
ตรวจสอบสภาพแวดล้อมก่อนทําการ Clone โปรเจค
- Angular เวอรชัน 15.0.2 (ใช้คําสั่ง `ng v` เพื่อตรวจสอบคําเวอร์ชันของ Angular)
- Node เวอรชัน 18.12.1 (ใช้คําสั่ง `node -v` เพื่อตรวจสอบคําเวอร์ชันของ Node)
- You need Java SE 17 to run or build JPlag.

## Clone Project
ใช้คําสั่ง `git clone https://github.com/TiTle162/SEAPlag.git` เพื่อโคลนโปรเจค 

## Start Project
อย่าลืมเช็คเวอร์ชันของ Angular กับ Node ก่อน
1. เปิด CMD ที่ดําแหน่ง D:\seaplag\seaplag จากนั้นใช้คําสั่ง `npm install` จากนั้นใช้คําสั่ง `ng serve` 
2. เปิดเว็บบราวเซอร์ แล้วเข้า URL `http://localhost:4200/` เพื่อเปิด Front-End ของระบบ
3. เปิด CMD ที่ตําแหน่ง D:\seaplag\jplag จากนั้นใช้คําสั่ง `npx nodemon --ignore datasets/ index.js`
4. เปิดเว็บบราวเซอร์ แล้วเข้า URL `http://localhost:4000/` เพื่อเปิด Back-End ของระบบ

## คําแนะนําในการติดตั้ง Package เสริมต่างๆ
ในการติดตั้ง Package เสริมต่างๆ ตัวอย่างเช่นการใช้คําสั่ง `npm install ...` 
package นั้นจะถูกบันทึกที่โฟลเดอร์ `D:\seaplag\seaplag\package.json` 
จากนั้น ผู้พัฒนามักจะมีการเรียกใช้ package ตัวนั้นที่ `D:\seaplag\seaplag\src\app\app.module.ts`
ก่อนจะทําการ import package นั้นไปใช้งานใน Components ต่างๆ 

ปัญหาของการติดตั้ง package มักเกิดขึ้นในกรณีที่เวอร์ชันซอร์สโค้ดของผู้พัฒนาแต่ละคนในทีมไม่ตรงกัน
ทําให้อาจเกิดเหตุการณ์ที่ผู้พัฒนาคนหนึ่งอาจใช้ package นั้นได้ปกติ แต่อีกคนไม่สามารถใช้งาน package นั้นได้

คําแนะนํา คือก่อนจะมีการติดตั้ง package เสริมต่างๆ ควรมีการพูดคุยกันในทีม และจํารูปแบบคําสั่ง `npm install ...` ให้ดี
หากไม่มีการใช้ package ตัวนั้นให้ทําการใช้คําสั่ง `npm uninstall ...` ในการลบ package (ไม่แนะนําให้ลบมือ)

-> วิธีทั่วไป ทดลองใช้คําสั่ง `npm install` ที่ตําแหน่ง D:\seaplag\seaplag แล้วค่อยใช้ `ng serve`
-> วิธีไร้ทางออก ลบและโคลนโปรเจคนี้ใหม่ `:)` (อย่าลืมเช็คซอร์สโค้ดให้ดีก่อนที่จะทําการลบโปรเจค)

## คําแนะนําในการ Deploy 
`ng build --prod` คือคําสั่งที่ใช้ในการ build product ของ Angular

แต่ระวังให้ดี!!! ที่ตําแหน่ง `D:\seaplag\seaplag\package.json` ในไฟล์ package.json
จะมีส่วนของ dependencies กับ devDependencies มันคือที่เก็บชื่อ package ของโปรเจคนั่นเอง
- dependencies คือ package ที่จะถูกนําไปด้วยกับคําสั่ง `ng build --prod`
- devDependencies คือ package ที่จะไม่ถูกนําไปด้วยกับคําสั่ง `ng build --prod`

กล่าวคือถ้า package มันดันไปอยู่ตรง devDependencies มันจะสามารถใช้งานได้ตอนที่พัฒนาอยู่
แต่พอจะเอาไป Deploy บน Server ด้วยคําสั่ง `ng build --prod` มันจะไม่ถูกนําไปใช้งานด้วย

*** ดังนั้น ควรอ่านรายละเอียดของแต่ละ package ให้ดีก่อนนํามาใช้งาน ***

## ปล.
ในโฟลเดอร์ jplag และ seaplag ต่างก็มี README.md อยู่นะ อย่าลืมเข้าไปอ่านกันนะ
