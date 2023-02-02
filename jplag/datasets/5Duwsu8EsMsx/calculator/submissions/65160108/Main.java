
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double A, B , ans1, ans2;
        System.out.print("Please enter a value A :");//read A
        A = input.nextDouble();
        System.out.println("Please enter a value B :");//read B
        B = input.nextDouble();
        ans1 = A + B;//process

        System.out.println("A + B :"+ ans1);//print

    }
}
