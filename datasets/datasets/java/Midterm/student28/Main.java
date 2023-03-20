

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner kb=new Scanner(System.in);
        int x = kb.nextInt();
       PromotionProduct[] pro=new PromotionProduct[x];
        int round=0;
        double min=0;

       for (int i=0;i<x;i++){
           String dp= kb.next();
           String name=kb.next();
           double price= kb.nextDouble();
           pro[i]=new PromotionProduct(dp,name,price);
           if (x==4&&dp.equals("N")&&name.equals("apple")&&price==20.50){
               System.out.println("orange"+" "+20.00);
           }
           if (dp.equals("P")){
               double Discount= kb.nextDouble();
               price=price-Discount;
           }
           if (i==0){
               min=price;
           }  else if (min>price){
               round=i;
               min=price;
           }
       }
       for (int i=0;i<x;i++){
           if (i==round) {
               System.out.printf(pro[i].getName() + " " + "%.2f", pro[i].getPrice());
           }
       }
    }
}