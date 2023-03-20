
import java.util.Scanner;

public class test2 {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product[] product = new Product[n];
        Product min = new Product();
        String type;
        for (int i = 0; i < product.length ; i++) {
            type = kb.next();
            if (type.equals("N")) {
                product[i] = new Product(kb.next(),kb.nextDouble());
            }
            else if (type.equals("P")){
                product[i] = new PromotionProduct(kb.next(), kb.nextDouble(), kb.nextDouble());
                product[i].getTotalPrice();
            }
        }
        for (int i = 0; i < product.length ; i++){
            min = product[0];
            if (product[i].getPrice() < min.price) {
                min = product[i];
            }
        }
        System.out.printf(min.getName()+" "+ "%.2f",min.getPrice()) ;
    }
}

