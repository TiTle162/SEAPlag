import java.util.Scanner;
public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        Product[] products = new Product[n];
        String type, name;
        double price, discount;

        for (int i = 0; i < n; i++) {
            type = sc.next();
            name = sc.next();
            price = sc.nextDouble();
            if (type.equals("P")) {
                discount = sc.nextDouble();
                products[i] = new PromotionProduct(name, price, discount);
            } else {
                products[i] = new Product(name, price);
            }
        }

        double minNetPrice = Double.MAX_VALUE;
        String minProductName = "";
        for (int i = 0; i < n; i++) {
            if (products[i] instanceof PromotionProduct) {
                PromotionProduct p = (PromotionProduct) products[i];
                if (p.getTotalPrice() < minNetPrice) {
                    minNetPrice = p.getTotalPrice();
                    minProductName = p.getName();
                }
            } else {
                Product p = products[i];
                if (p.getPrice() < minNetPrice) {
                    minNetPrice = p.getPrice();
                    minProductName = p.getName();
                }
            }
        }
        System.out.println(minProductName + " " + String.format("%.2f", minNetPrice));
    }
}
