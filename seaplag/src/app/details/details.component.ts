import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { DiffEditorModel } from 'ngx-monaco-editor-v2';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { data } from 'jquery';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /* ประกาศตัวแปร */
  PATH: String = 'http://localhost:4000/';

  DetailsData: any = "";
  current_year: any = "";

  navbar_Thai_language: string = "";
  navbar_Eng_language: string = "";
  link_to_jplag: string = "";
  code_sim: string = "";
  code_select: string = "";
  switch_mode: string = "";
  copyright: string = "";
  language: string = "";
  tool: string = "";
  article: string = "";
  ref1: string = "";
  ref2: string = "";
  ref3: string = "";

  isTH: boolean = false;
  isEN: boolean = false;

  filename: string = "";
  dest: string = "";
  similarity: any = 0;
  source: any = 0;
  target: any = 0;
  file: any[] = [];

  file_title: string = "";
  file_name_source: string = "";
  file_name_target: string = "";

  file_content_source: any = "";
  file_content_target: any = "";
  default_file: boolean = false;

  editorOptions = { theme: 'vs', readOnly: true }; // กำหนดรูปแบบการแสดงผลของmonaco
  // ตัวแปรสำหรับการdiff
  originalModel!: DiffEditorModel;
  modifiedModel!: DiffEditorModel;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // console.log(this.file_content_source)

    var params = this.route.snapshot.queryParams;
    var language = params['language'];
    this.filename = params['filename'];
    this.dest = params['dest'];
    this.source = params['source'];
    this.target = params['target'];

    if (language == "TH") {
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    } else if (language == "EN") {
      this.isTH = false;
      this.isEN = true;
      this.switch_to_eng();
    } else {
      this.isTH = true;
      this.isEN = false;
      this.switch_to_th();
    }

    // You could upload it like this:
    const formData = new FormData()
    formData.append('file', this.filename);
    const headers = new HttpHeaders({
      'filename': this.filename,
      'destination': this.dest,
      'source': this.source,
      'target': this.target
    })
    // start diff model in monaco
    // source Model 
    this.originalModel = {
      language: this.get_language(this.file_name_source),
      code: this.file_content_source,
    }
    // target Model 
    this.modifiedModel = {
      language: this.get_language(this.file_name_target),
      code: this.file_content_target,
    }
    // end diff model in monaco

    // start process compare in backend
    this.http.post(this.PATH + 'api/compare', formData, { headers: headers })
      .subscribe(data => {
        const res = JSON.stringify(data);
        if (!res.includes("error")) {
          this.DetailsData = Object.assign({}, data);
          this.set_details_data();
        } else if (res.includes("error")) {
          alert("error");
        } else {
          alert("error");
        }
      });
    // End process compare in backend

    $(document).ready(function () {
      // left-nav-bar
      $("#th").click(function () {
        $("#en").removeClass("active");
        $("#th").addClass("active");
      });
      $("#en").click(function () {
        $("#th").removeClass("active");
        $("#en").addClass("active");
      });
    });
  }

  // การใช้คำสำหรับภาษาไทย
  switch_to_th() {
    this.navbar_Thai_language = "ไทย";
    this.navbar_Eng_language = "อังกฤษ";

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
    this.file_title = "ชื่อโฟเดอร์";
    this.current_year = new Date().getFullYear() + 543;
  }

  // การใช้คำสำหรับภาษาอังกฤษ
  switch_to_eng() {
    this.navbar_Thai_language = "TH";
    this.navbar_Eng_language = "EN";

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
    this.file_title = "Folder name";
    this.current_year = new Date().getFullYear();
  }

  set_details_data() {
    // console.log(this.DetailsData);
    // Set similarity(percent).
    var read_similarity = this.DetailsData.similarity;
    this.similarity = Number(read_similarity * 100).toFixed(2);

    // Loop file 
    this.file = this.DetailsData.matches;

    // Default file output.
    this.file_name_source = this.file[0].file1;
    this.file_name_target = this.file[0].file2;

    // First file readed.
    const formData = new FormData()
    formData.append('file', this.filename);
    const headers = new HttpHeaders({
      'filename': this.filename,
      'destination': this.dest,
      'source': this.source,
      'sourcecode': this.file_name_source
    })

    // start process sourcecode in backend
    this.http.post(this.PATH + 'api/sourcecode', formData, { headers: headers, responseType: 'text' })
      .subscribe(data => {
        const res = JSON.stringify(data);
        if (!res.includes("error")) {
          var temp = data;

          // Second file readed.
          const formData = new FormData()
          formData.append('file', this.filename);
          const headers = new HttpHeaders({
            'filename': this.filename,
            'destination': this.dest,
            'source': this.target,
            'sourcecode': this.file_name_target
          })
          this.http.post(this.PATH + 'api/sourcecode', formData, { headers: headers, responseType: 'text' })
            .subscribe(data => {
              const res = JSON.stringify(data);
              if (!res.includes("error")) {
                this.file_content_source = temp;
                this.file_content_target = data;

                this.originalModel = {
                  language: this.get_language(this.file_name_source),
                  code: temp,
                }

                this.modifiedModel = {
                  language: this.get_language(this.file_name_target),
                  code: data
                }

              } else if (res.includes("error")) {
                alert("error");
              } else {
                alert("error");
              }
            });
        } else if (res.includes("error")) {
          alert("error");
        } else {
          alert("error");
        }
      });
  }

  // set format language in monaco
  get_language(file_name: string) {
    var language
    var file_name_arry = file_name.split(".");
    var mime_type = file_name_arry[file_name_arry.length - 1].toLowerCase();
    switch (mime_type) {
      case 'java':
        language = 'text/x-java';
        break;
      case 'cpp':
        language = 'text/x-c';
        break;
      case 'c':
        language = 'text/x-c';
        break;
      case 'h':
        language = 'text/x-c';
        break;
      case 'cs':
        language = 'text/x-csharp';
        break;
      case 'r':
        language = 'text/x-rsrc';
        break;
      case 'swift':
        language = 'text/x-swift';
        break;
      case 'scalar':
        language = 'text/x-scala';
        break;
      case 'sc':
        language = 'text/x-scala';
        break;
      case 'kt':
        language = 'text/x-kotlin';
        break;
      case 'kps':
        language = 'text/x-kotlin';
        break;
      case 'kpm':
        language = 'text/x-kotlin';
        break;
      case 'go':
        language = 'text/x-go';
        break;
      case 'py':
        language = 'text/x-python';
        break;
      default:
        language = 'text/plain';
        break;
    }
    return language;
  }

  get_file(file_data: any) {
    this.file_name_source = file_data.value.file1;
    this.file_name_target = file_data.value.file2;

    // First file readed.
    const formData = new FormData()
    formData.append('file', this.filename);
    const headers = new HttpHeaders({
      'filename': this.filename,
      'destination': this.dest,
      'source': this.source,
      'sourcecode': file_data.value.file1
    })
    this.http.post(this.PATH + 'api/sourcecode', formData, { headers: headers, responseType: 'text' })
      .subscribe(data => {
        const res = JSON.stringify(data);
        if (!res.includes("error")) {
          var temp = data;

          // Second file readed.
          const formData = new FormData()
          formData.append('file', this.filename);
          const headers = new HttpHeaders({
            'filename': this.filename,
            'destination': this.dest,
            'source': this.target,
            'sourcecode': file_data.value.file2
          })
          this.http.post(this.PATH + 'api/sourcecode', formData, { headers: headers, responseType: 'text' })
            .subscribe(data => {
              const res = JSON.stringify(data);
              if (!res.includes("error")) {
                this.file_content_source = temp;
                this.file_content_target = data;

                // start diff model in monaco
                // source Model 
                this.originalModel = {
                  language: this.get_language(this.file_name_source),
                  code: temp
                }

                // target Model 
                this.modifiedModel = {
                  language: this.get_language(this.file_name_target),
                  code: data
                }
                // end diff model in monaco

              } else if (res.includes("error")) {
                alert("error");
              } else {
                alert("error");
              }
            });
        } else if (res.includes("error")) {
          alert("error");
        } else {
          alert("error");
        }
      });
  }
}
