import java.util.Scanner;  

public class Main {
    public static void main(String[] args){
        Scanner input_data = new Scanner(System.in);
        
        String name = input_data.nextLine();
        int age = input_data.nextInt();
        double salary = input_data.nextDouble();
        String faculty = input_data.nextString();

        Teacher teacher158 = new Teacher(name, age, salary, faculty);
        
        teacher158.print_data();
    }
}
