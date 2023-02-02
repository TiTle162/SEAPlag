public class Teacher {
    String name;
    int age;
    double salary;

    public Teacher(){
        this.name = "";
        this.age = 0;
        this.salary = 0.0;
    }

    public Teacher(String name,int age,double salary){
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    public void print_data(){
        System.out.print(this.name+" "+this.age+" "+this.salary);
    }
}
