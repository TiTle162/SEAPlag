import java.util.Scanner;

public class Tester {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();

        Product[] arr = new Product[n];
        for(int i = 0;i < n;i++){
            char type = kb.next().charAt(0);
            if (type == 'N') {
                arr[i] = new Product(kb.next(), kb.nextDouble());
            } else if (type == 'P') {
                arr[i] = new PromotionProduct(kb.next(), kb.nextDouble(), kb.nextDouble());
            }

        }
        double least = arr[0].getTotalPrice();
        int productLeast = 0;
        for(int i = 0;i < n;i++){
            if(arr[i].getTotalPrice() < least) {
                least = arr[i].getTotalPrice();
                productLeast = i;
            }
        }

        System.out.printf("%s %.2f",arr[productLeast].getName(),arr[productLeast].getTotalPrice());
    }
}
