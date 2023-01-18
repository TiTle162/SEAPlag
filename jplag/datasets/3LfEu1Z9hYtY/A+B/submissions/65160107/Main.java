import java.util.Scanner
        ;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int a, b, answer;
        System.out.print("input a:");
        a = input.nextInt();
        System.out.print("input b:");
        b = input.nextInt();
        answer = a+b;
        System.out.print("answer:" +answer);
    }
}