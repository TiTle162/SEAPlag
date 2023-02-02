import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService){}

  GraphData: any = ""; 
  TableData: any = "";

  current_language: string = "";
  filename: string = "";
  dest: string = ""

  navbar_language_1: string = "";
  navbar_language_2: string = "";
  link_to_jplag: string = "";

  ref1: string = "";
  ref2: string = "";
  ref3: string = "";

  language: string = "";

  tool: string = "";
  article: string = "";
  copyright: string = "";
  current_year: any = "";

  table_header: string = "";
  no: string = "";
  link: string = "";
  similarity: string = "";
  
  ngOnInit(){
    var params = this.route.snapshot.queryParams;
    this.current_language = params['language'];
    this.filename = params['filename']; 
    this.dest = params['dest'];

    if(this.current_language == "TH"){
      this.switch_to_th();
    }else if(this.current_language == "EN"){
      this.switch_to_eng();
    }else{
      this.switch_to_th();
    }

    // Show loading screen.
    this.showSpinner();
  
    // You could upload it like this:
    const formData = new FormData()
    formData.append('file', this.filename);
    const headers = new HttpHeaders({
      'filename': this.filename,
      'dest': this.dest,
    })

    this.http.post('http://localhost:4000/api/table', formData, { headers: headers })
    .subscribe(data => {
      this.hideSpinner();

      console.log(data);

      var res = JSON.stringify(data);
      if(!res.includes("error")){
        // Read JSON data.
        this.GraphData = Object.assign({}, data);
        
        var links = this.GraphData.metrics[0]["topComparisons"];

        for (let i = 0; i < links.length; i++) {
          if((links[i].similarity*100) <= 0.0){
            links.splice(i);
          }
        }

        for (let i = 0; i < links.length; i++) {
          links[i].value = (links[i].similarity*100).toFixed(2);

          delete links[i].similarity;
        }

        this.GraphData["links"] = links;

        this.TableData = this.GraphData["links"];
      }else if(res.includes("error")){
        this.show_error();
      }else{
        this.show_error();
      }
    });
  }

  switch_to_th(){
    this.navbar_language_1 = "ไทย";
    this.navbar_language_2 = "อังกฤษ";

    this.link_to_jplag = "ดําเนินการโดย ";

    this.ref1 = "เริ่มจากศึกษาการทํางานของ";
    this.ref2 = "ซึ่งเป็นเครื่องมือสําหรับตรวจสอบความคล้ายคลึงของซอร์สโค้ด จากนั้นจึงนําผลลัพธ์ของ JPlag มาแสดงในรูปแบบของกราฟจากไลบราลี่";
    this.ref3 = "โดยรวมแล้วเป็นวิธีการที่เหมาะสมที่จะใช้ในการตรวจสอบการคัดลอกซอร์สโค้ด";

    this.language = "ภาษา";
    this.tool = "เครื่องมือ";
    this.article = "บทความวิจัยที่เกี่ยวข้อง";
    this.copyright = "ลิขสิทธิ์";
    this.current_year = new Date().getFullYear() + 543;

    this.table_header = "ตารางผลลัพธ์ความคล้ายคลึงของซอร์สโค้ด";

    this.no = 'ลําดับ';
    this.link = 'จับคู่เจ้าของซอร์สโค้ด';
    this.similarity = "ความคล้ายคลึงกันของซอร์สโค้ด (%)";
  }

  switch_to_eng(){
    this.navbar_language_1 = "TH";
    this.navbar_language_2 = "EN";

    this.link_to_jplag = "Implemented by ";

    this.ref1 = "Start working with";
    this.ref2 = "which can detect plagiarism of source code files and show JPlag result via Force Directed Graph from";
    this.ref3 = "that an easy way to check the copy of source code .";

    this.language = "Languages";
    this.tool = "Tools";
    this.article = "Research articles";
    this.copyright = "Copyright";
    this.current_year = new Date().getFullYear();

    this.table_header = "Plagiarism of source code result";

    this.no = 'No.';
    this.link = 'Matched Source Code';
    this.similarity = "Source Code Similarity (%)";
  }

  show_comparison(start: String, end: String) {
    var urlTree = this.router.createUrlTree(['/Details'], {
      queryParams: {
        language: this.current_language,
        filename: this.filename,
        dest: this.dest,
        source: start,
        target: end 
      }
    });

    var url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');
  }

  showSpinner(): void {
    this.spinner.show();
  }
  
  hideSpinner(): void {
    this.spinner.hide();
  }

  show_error() {
    if(this.current_language == "TH"){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถดึงข้อมูลการประมวลผลลัพธ์ได้',
        icon: 'error',
        showCancelButton: false,
        showDenyButton: false,
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.href = '/';
        } 
      });
    }else if(this.current_language == "EN"){
      Swal.fire({
        title: 'Error!',
        text: "Can't query a processed result data.",
        icon: 'error',
        showCancelButton: false,
        showDenyButton: false,
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.href = '/';
        } 
      });
    }
  }

  sort_similarity(){
    alert("Sorting");
  }
}
