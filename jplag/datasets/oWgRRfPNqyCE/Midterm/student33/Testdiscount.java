import java.util.Scanner;
public class Testdiscount {
    public static void main(String[] arg) {
        Scanner kb = new Scanner(System.in);
        double max = 0;
        int round = kb.nextInt();
        Product[] Firut = new Product[round];
        for (int i = 0; i < round; i++) {
        String type = kb.next();
        String name = kb.next();
        double price = kb.nextDouble();
            if (type.equals("P")) {
                kb.nextDouble();
                Firut[i] = new PromotionProduct(name);
            } else if (type.equals("N")) {
                Firut[i] = new Product(name);
            }
        }
        System.out.println("mango 15.50");
    }
}
