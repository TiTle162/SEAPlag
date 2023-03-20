import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner spy = new Scanner(System.in);
        int n;
        n = spy.nextInt();
        Product[] array = new PromotionProduct[n];
        for (int i = 0; i < n; i++) {
            String type = spy.next();
            if (type == "N") {
                array[i] = new Product(spy.next(), spy.nextDouble());
            } else if (type == "P") {
                array[i] = new PromotionProduct(spy.next(), spy.nextDouble(), spy.nextDouble());
            }
        }
        for (int i = 0; i < n; i++) {
            array[i].getTotalprice();
        }
        
    }
}
