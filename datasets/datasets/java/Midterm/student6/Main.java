import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int number = kb.nextInt();
        Product[] pro = new Product[number];
        double min = 0;
        for(int i = 0 ; i < pro.length ; i++){
            String type = kb.next();


            if(type.equals("N")){
                String name = kb.next();
                double price = kb.nextDouble();
                pro[i] = new Product(name,price);
            }
            else{
                String name = kb.next();
                double price = kb.nextDouble();
                double discount = kb.nextDouble();
                pro[i] = new PromotionProduct(name , price , discount);
            }
            if(i == 0){
                min = pro[i].getTotalPrice();
            }
            else{
                min = Math.min(min , pro[i].getTotalPrice());
            }
        }
        for (int i = 0 ; i < pro.length ; i++){
            if(pro[i].getTotalPrice() == min){
                System.out.printf(pro[i].getName()+" %.2f",pro[i].getTotalPrice());
            }
        }
    }
}
