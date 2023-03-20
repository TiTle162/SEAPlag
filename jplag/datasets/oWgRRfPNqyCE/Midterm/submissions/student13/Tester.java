import java.util.Scanner;

public class Tester {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int num = input.nextInt();
        String newname = "";
        double min = 0;
        Product [] p2 = new Product[num];
        for (int i = 0; i < p2.length; i++) {
            char type = input.next().charAt(0);
            if(type == 'N'){
                String name = input.next();
                double price = input.nextDouble();
                p2[i] = new Product(name,price);
            } else if (type == 'P') {
                String name = input.next();
                double price = input.nextDouble();
                double discount = input.nextDouble();
                Product p1 = new Product(name,price);
                p2[i] = new PromotionProduct(p1,discount);
                p2[i].getTotalPrice();
            }
            if(i == 0){
                min = p2[0].price;
            }
           else if(p2[i].price<min) {
                min = p2[i].price;
                newname = p2[i].name;
            }
        }
        for (int i = 0; i < 1; i++) {
            System.out.printf(newname+ " " + "%.2f",min);
        }
    }
}