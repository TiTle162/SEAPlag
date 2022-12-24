import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Data from '../../assets/datasets/62160002-62160008.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  DetailsData: any = "";

  current_year: any = "";
  file_id: string = "";
  navbar_language_1: string = "";
  navbar_language_2: string = "";
  link_to_jplag: string = "";
  code_sim: string = "";
  code_select: string = "";
  switch_mode: string = "";
  copyright: string = "";
  language: string = "";
  tool: string = "";
  article: string ="";
  ref1: string = "";
  ref2: string = "";
  ref3: string = "";

  isTH: boolean = false;
  isEN: boolean = false;

  similarity: any = 0;
  source: any = 0;
  target: any = 0;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    var params = this.route.snapshot.queryParams;
    var language = params['language'];
    var file_id = params['file_id'];
    var source = params['source'];
    var target = params['target'];

    this.file_id = file_id;
    if(language == "TH"){
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }else if(language == "EN"){
      this.isTH = false;
      this.isEN = true;
      this.switch_to_eng();
    }else{
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }

    this.DetailsData = Data;
    this.set_details_data(source, target);

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

      var compare_mode = 1;
      $("#switch_mode").click(function(){
        if(compare_mode == 1){
          compare_mode = 2;

          $('textarea').css("width", "680px");
        }else if(compare_mode == 2){
          compare_mode = 1;

          $('textarea').css("width", "410px");
        }
      });
    });
  }

  switch_to_th(){
    this.navbar_language_1 = "ไทย";
    this.navbar_language_2 = "อังกฤษ";

    this.link_to_jplag = "ดําเนินการโดย ";

    this.code_sim = "เปอร์เซ็นความคล้ายคลึงของซอร์สโค้ด ";

    this.code_select = "เลือกชุดข้อมูลซอร์สโค้ด";

    this.switch_mode = "เปลี่ยนรูปแบบการแสดงผล";

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
    this.navbar_language_1 = "TH";
    this.navbar_language_2 = "EN";

    this.link_to_jplag = "Implemented by ";

    this.code_sim = "Source Code Similarity ";

    this.code_select = "Source Code Selection";

    this.switch_mode = "Switch display mode";

    this.ref1 = "Start working with";
    this.ref2 = "which can detect plagiarism of source code files and show JPlag result via Force Directed Graph from";
    this.ref3 = "that an easy way to check the copy of source code .";

    this.language = "Languages";
    this.tool = "Tools";
    this.article = "Research articles";
    this.copyright = "Copyright";
    this.current_year = new Date().getFullYear();
  }

  set_details_data(source: any, target: any){
    console.log(this.DetailsData);

    // Set similarity(percent).
    var read_similarity = this.DetailsData.similarity;
    this.similarity = Number(read_similarity*100).toFixed(2);

    // Set source code owner.
    this.source = source;
    this.target = target;

    // Loop file 
  }
}
