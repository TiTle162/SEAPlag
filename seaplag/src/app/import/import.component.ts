import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  constructor(private router: Router){}

  current_year: any = new Date().getFullYear();
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

  ngOnInit() {
    $(document).ready(function(){
      // right-nav-bar
      $("#th").click(function(){
        $("#en").removeClass("active");
        $("#th").addClass("active");
      });
      $("#en").click(function(){
        $("#th").removeClass("active");
        $("#en").addClass("active");
      });

      // left-nav-bar
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

    this.switch_to_th();
  }

  switch_to_th(){
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
    this.how_to_step1_detail = "...";
    this.how_to_step2_detail = "...";
    this.how_to_step3_detail = "...";

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
    this.how_to_step1_detail = "Support for Zip files to verify source code replication.";
    this.how_to_step2_detail = "Displays a graph showing a summary of the association of the desired data.";
    this.how_to_step3_detail = "Display the details of the source code file according to the similarity percentage required by the user.";

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
  
}
