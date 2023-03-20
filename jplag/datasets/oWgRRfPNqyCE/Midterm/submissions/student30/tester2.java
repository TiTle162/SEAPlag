

import java.util.Scanner;

public class tester2 {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product[] products = new Product[n];

        for (int i = 0; i< products.length; i++){
            String type = kb.next();
            if (type.equals("N")){
                products[i] = new Product(kb.next(),kb.nextDouble());
            } else if (type.equals("P")) {
                products[i] = new PromotionProduct(new Product(kb.next(), kb.nextDouble()),kb.nextDouble());
                products[i].getTotalPrice();
            }
        }
        double minPrice = products[0].getPrice();
        int numMin = 0;
        for (int i = 1; i < products.length; i++){
            if (minPrice > products[i].getTotalPrice()){
                minPrice = products[i].getTotalPrice();
                numMin = i;
            }

        }
        System.out.printf(products[numMin].getName() + " %.2f",products[numMin].getTotalPrice());

    }
}
