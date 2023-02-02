import java.util.Scanner;
class Work{
    public static void main (String[]args) {
        Scanner input = new Scanner (System.in);
        Integer a,b,ans;
        a = input.nextInt();
        b = input.nextInt();
        ans = a + b;
        System.out.print("Ans"+ ans);
    }
}