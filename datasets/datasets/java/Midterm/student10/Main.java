import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String keep = "";
        double max = 0,min = 0;
        int roll = sc.nextInt();
        Product[] products = new Product[roll];
        for(int i = 0 ; i < roll ; i++){
            String type = sc.next();
            if(type.equals("N")) {
                String name = sc.next();
                double price = sc.nextDouble();
                products[i] = new Product(name,price);
            }else if(type.equals("P")){
                String name = sc.next();
                double price = sc.nextDouble();
                double discount = sc.nextDouble();
                products[i] = new PromotionProduct(name,price,discount);
            }
        }
        for(int i = 0 ; i < roll ; i++){
            if(i == 0){
                max = products[i].getTotalPrice();
                min = products[i].getTotalPrice();
            }else if(products[i].getTotalPrice() > max){
                max = products[i].getTotalPrice();
            }else if(products[i].getTotalPrice() < min){
                min = products[i].getTotalPrice();
            }
        }
        for(int i = 0 ; i < roll ; i++){
            if(products[i].getTotalPrice() == min){
                keep = products[i].getName();
            }
        }
        System.out.printf(keep + " "+ "%.2f",min);
    }
}