import java.util.Scanner
        ;
public class main {
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        int A,B,ans;
        System.out.print("input A:");
        A = input.nextInt();
        System.out.print("input B:");
        B = input.nextInt();
        ans = A + B;
        System.out.println("ans :"+ans);
    }
}