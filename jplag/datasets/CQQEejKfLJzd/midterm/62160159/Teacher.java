public class Teacher {
    String name;
    int age;
    double salary;
    String faculty;

    public Teacher(){
        this.name = " ";
        this.age = 0;
        this.salary = 0.0;
        this.faculty = " ";
    }

    public Teacher(String name, int age, double salary, String faculty){
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.faculty = faculty;
    }

    public void print_data(){

        
        System.out.print(this.name+" "+this.age+" "+this.salary+" "+this.faculty);
    }
}
