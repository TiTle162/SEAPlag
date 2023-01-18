import  java.util.Scanner;
public class Work {
    public static  void main(String[] args) {
      Scanner input = new Scanner(System.in);
      double A,B,total;
      System.out.print("Input A : ");
      A = input.nextDouble();
      System.out.print("Input B : ");
      B = input.nextDouble();
      total = A + B;
      System.out.println("total :" + total);
    }
}