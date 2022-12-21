import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  constructor(private router: Router){}

  /* File upload */
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          var new_file_name = this.random_file_name(); 

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, new_file_name)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

          // Redirect to Graph page.
          this.router.navigate(['/Graph'], {
            queryParams: {
              language: this.current_language,
              file_id: new_file_name,
              mode: "2D",
              min: 1,
              max: 100
            },
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    // console.log(event);
  }

  public fileLeave(event: any){
    // console.log(event);
  }
  /* File upload */

  current_language: string = "";
  current_year: any = "";
  file_upload: string = "";
  suggestion_1: string = "";
  suggestion_2: string = "";
  navbar_menu_1: string = "";
  navbar_menu_2: string = "";
  navbar_menu_3: string = "";
  navbar_language_1: string = "";
  navbar_language_2: string = "";
  link_to_jplag: string = "";
  welcome_word: string = "";
  support_language: string = "";
  objectives_word_1: string = "";
  objectives_word_2: string = "";
  objective_1: string = "";
  objective_2: string = "";
  objective_3: string = "";
  objective_4: string = "";
  how_to_1: string = "";
  how_to_2: string = "";
  how_to_3: string = "";
  how_to_step1: string = "";
  how_to_step2: string = "";
  how_to_step3: string = "";
  how_to_step1_detail: string = "";
  how_to_step2_detail: string = "";
  how_to_step3_detail: string = "";
  credit_word: string = "";
  front_end_dev_name: string = "";
  back_end_dev_name: string = "";
  advisor_name: string = "";
  front_name: string = "";
  back_name: string = "";
  advisor: string = "";
  fac: string = "";
  major: string = "";
  adv_major: string = "";
  university: string = "";
  mail: string = "";
  front_end_mail = "62160158@buu.ac.th";
  back_end_mail = "62160158@buu.ac.th";
  advisor_mail = "peerasak@buu.ac.th";
  copyright: string = "";
  language: string = "";
  tool: string = "";
  article: string ="";
  ref1: string = "";
  ref2: string = "";
  ref3: string = "";
  Or: string = "";

  ngOnInit() {
    this.switch_to_th();

    $(document).ready(function(){
      // left-nav-bar
      $("#th").click(function(){
        $("#en").removeClass("active");
        $("#th").addClass("active");
      });
      $("#en").click(function(){
        $("#th").removeClass("active");
        $("#en").addClass("active");
      });
      $("#top-btn").click(function(){
        $("#obj-btn").removeClass("active");
        $("#howto-btn").removeClass("active");
        $("#credit-btn").removeClass("active");
      });
      $("#obj-btn").click(function(){
        $("#obj-btn").addClass("active");
        $("#howto-btn").removeClass("active");
        $("#credit-btn").removeClass("active");
      });
      $("#howto-btn").click(function(){
        $("#obj-btn").removeClass("active");
        $("#howto-btn").addClass("active");
        $("#credit-btn").removeClass("active");
      });
      $("#credit-btn").click(function(){
        $("#obj-btn").removeClass("active");
        $("#howto-btn").removeClass("active");
        $("#credit-btn").addClass("active");
      });
    });
  }

  switch_to_th(){
<<<<<<< HEAD
    this.file_upload = "จุดวางไฟล์ซอร์สโค้ด (.zip) ";
    this.Or ="หรือ";
=======
    this.current_language = "TH";

    this.file_upload = "จุดวางไฟล์ซอร์สโค้ด (.zip)";
    this.suggestion_1 = "คําแนะนํา: ";
    this.suggestion_2 = "กรุณารีเฟรชหน้าจอนี้ หากระบบไม่แสดงกราฟผลลัพธ์ หลังจากนําเข้า .zip";
>>>>>>> 5f5d83070a8cc8fa7f67271d8b86a7d3c73830a8

    this.navbar_menu_1 = "เป้าหมาย";
    this.navbar_menu_2 = "วิธีใช้งาน";
    this.navbar_menu_3 = "เครดิต";

    this.navbar_language_1 = "ไทย";
    this.navbar_language_2 = "อังกฤษ";

    this.link_to_jplag = "ดําเนินการโดย ";

    this.welcome_word = "ตรวจสอบการคัดลอกซอร์สโค้ดกับ";

    this.support_language = "ภาษาที่รับรองและสนับสนุน";

    this.objectives_word_1 = "";
    this.objectives_word_2 = "เป้าหมายของระบบ";
    this.objective_1 = "ใช้งานง่าย";
    this.objective_2 = "เรียนรู้ได้อย่างรวดเร็ว";
    this.objective_3 = "พร้อมให้บริการ";
    this.objective_4 = "เที่ยงตรงและแม่นยํา";

    this.how_to_1 = "วิธีใช้งาน ";
    this.how_to_2 = "SEA";
    this.how_to_3 = "Plag";

    this.how_to_step1 = "นําเข้าข้อมูล";
    this.how_to_step2 = "แสดงผลลัพธ์";
    this.how_to_step3 = "ดูรายละเอียด";
    this.how_to_step1_detail = "เมนูสำหรับนำเข้าไฟล์ข้อมูลซอร์สโค้ดที่ผู้ใช้ต้องการตรวจสอบนำเข้าสู่ระบบ ซึ่งผู้ใช้นั้นจำเป็นต้องนำเข้าข้อมูลที่อยู่ในรูปแบบของไฟล์ .zip เพื่อตรวจสอบความคล้ายคลึงของซอร์สโค้ด ";
    this.how_to_step2_detail = "เมนูสำหรับแสดงกราฟข้อมูลความคล้ายคลึงกันของซอร์สโค้ด โดยผู้ใช้สามารถกำหนดขอบเขตของเปอร์เซ็นควมคล้ายคลึงของซอร์สโค้ดได้ และเลือกข้อมูลเพื่อใช้ในการตรวจสอบข้อมูลในหน้าถัดไป";
    this.how_to_step3_detail = "เมนูสำหรับแสดงการเปรียบเทียบซอร์สโค้ดตามเปอร์เซ็นความคล้ายคลึงกันของซอร์สโค้ดที่ผู้ใช้ทำการเลือก โดยหน้าจอจะแสดงข้อมูลไฟล์ที่มีความคล้ายคลึงกัน และทำการภาพรวมของแสดงเปอร์เซ็นความคล้ายคลึงกันของซอร์สโค้ด";

    this.credit_word = "เครดิต";
    this.front_end_dev_name = "นางสาวพรนภัส เขียวอิ่ม";
    this.back_end_dev_name = "นายสิรวิชญ์ ฐิติสุนทรลักษณ์";
    this.advisor_name = "อาจารย์พีระศักดิ์ เพียรประสิทธิ์";
    this.front_name = "นักพัฒนาฝั่ง Front-End";
    this.back_name = "นักพัฒนาฝั่ง Back-End";
    this.advisor = "อาจารย์ที่ปรึกษา"; 
    this.fac = "คณะวิทยาการสารสนเทศ";
    this.mail = "อีเมล";
    this.major = "นักศึกษาสาขาวิศวกรรมซอฟต์แวร์ รุ่นที่ 9";
    this.adv_major = "อาจารย์ประจําสาขาวิศวกรรมซอฟต์แวร์";
    this.university = "มหาวิทยาลัยบูรพา";

    this.ref1 = "เริ่มจากศึกษาการทํางานของ";
    this.ref2 = "ซึ่งเป็นเครื่องมือสําหรับตรวจสอบความคล้ายคลึงของซอร์สโค้ด จากนั้นจึงนําผลลัพธ์ของ JPlag มาแสดงในรูปแบบของกราฟจากไลบราลี่";
    this.ref3 = "โดยรวมแล้วเป็นวิธีการที่เหมาะสมที่จะใช้ในการตรวจสอบการคัดลอกซอร์สโค้ด";

    this.language = "ภาษา";
    this.tool = "เครื่องมือ";
    this.article = "บทความวิจัยที่เกี่ยวข้อง";
    this.copyright = "ลิขสิทธิ์";
    this.current_year = new Date().getFullYear()+543;
  }

  switch_to_eng(){
<<<<<<< HEAD
    this.file_upload = "Drag and Drop your file source code here. (.zip) ";
    this.Or = "OR";
=======
    this.current_language = "EN";

    this.file_upload = "Drag and drop file source code here. (.zip)";
>>>>>>> 5f5d83070a8cc8fa7f67271d8b86a7d3c73830a8

    this.suggestion_1 = "HINTS: ";
    this.suggestion_2 = "Please refresh this page if graph result don't show up after import .zip file.";

    this.navbar_menu_1 = "Objectives";
    this.navbar_menu_2 = "How to use";
    this.navbar_menu_3 = "Credits";

    this.navbar_language_1 = "TH";
    this.navbar_language_2 = "EN";

    this.link_to_jplag = "Implemented by ";

    this.welcome_word = "Detect plagiarism of source code with ";

    this.support_language = "Supported languages.";

    this.objectives_word_1 = "Our ";
    this.objectives_word_2 = "objectives.";
    this.objective_1 = "Easy to use";
    this.objective_2 = "Fast to learn";
    this.objective_3 = "Ready for everyone";
    this.objective_4 = "Accurate and precise";

    this.how_to_1 = "How to use ";
    this.how_to_2 = "SEA";
    this.how_to_3 = "Plag";

    this.how_to_step1 = "Import file";
    this.how_to_step2 = "Show result";
    this.how_to_step3 = "View details";
    this.how_to_step1_detail = "The menu for importing source code data files that users want to check into the system. The user needs to import the data in the form of a zip file to verify the similarity of the source code.";
    this.how_to_step2_detail = "The menu for displaying similarity graphs of source code, The user can set the extent of the similarity percentage of the source code. and select the information to be used to verify the information on the next page.";
    this.how_to_step3_detail = "The menu to display source code comparison based on the source code similarity percentage selected by the user. The screen will display similar file information. And make an overview of showing the similarity percentage of the source code.";

    this.credit_word = "Credits";
    this.front_end_dev_name = "Ms. Pornnapas Khiaw-im";
    this.back_end_dev_name = "Mr. Sirawit Thitisoontornlak";
    this.advisor_name = "Mr. Peerasak Pianprasit";
    this.front_name = "Front-End Developer";
    this.back_name = "Back-End Developer";
    this.advisor = "Advisor"; 
    this.fac = "Faculty of Informatics";
    this.mail = "E-mail";
    this.major = "Software Engineering #9";
    this.adv_major = "Lecturer of Software Engineering";
    this.university = "Burapha University";

    this.ref1 = "Start working with";
    this.ref2 = "which can detect plagiarism of source code files and show JPlag result via Force Directed Graph from";
    this.ref3 = "that an easy way to check the copy of source code .";

    this.language = "Languages";
    this.tool = "Tools";
    this.article = "Research articles";
    this.copyright = "Copyright";
    this.current_year = new Date().getFullYear();
  }
  
  random_file_name(){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 12; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    return result;
  }
}
