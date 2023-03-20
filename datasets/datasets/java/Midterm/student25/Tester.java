

import java.util.Scanner;

public class Tester {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();

        PromotionProduct[] item = new PromotionProduct[n];
        for (int i = 0; i < item.length; i++) {
            char Word = input.next().charAt(0);
            if (Word == 'N') {
                String name = input.next();//input name
                double price = input.nextDouble();//input price
                double discout =0;
                Product product = new Product(name, price);
                PromotionProduct promotionProduct = new PromotionProduct(product, 0);
                item[i] = new PromotionProduct(product, 0);

            } else {
                String name = input.next();//input name
                double price = input.nextDouble();//input price
                double discount = input.nextDouble();//input discount

                Product product = new Product(name, price);
                PromotionProduct promotionProduct = new PromotionProduct(product, discount);
                item[i] = new PromotionProduct(product, discount);
            }

        }

            for (int i = 0; i < item.length; i++) {
                for (int j = 0; j < item.length; j++) {
                    if (item[i].getTotalPrice() > item[j].getTotalPrice()) {
                        double meter = item[j].getTotalPrice();
                        String reName = item[j].getName();
                        item[j].setName(reName);
                        item[i].setName(reName);
                        item[j].setPrice(meter);
                        item[i].setPrice(meter);
                    }
                }
            }
            System.out.println(item[0].toString());
        }
    }


