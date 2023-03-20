import java.util.Scanner;
public class Tester2 {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product[] products = new Product[n];
        for (int i = 0; i < products.length; i++) {
            char type = kb.next().charAt(0);
            switch (type){
                case 'N':
                    products[i] = new Product(kb.next(), kb.nextDouble());
                    break;
                case 'P':
                    products[i] = new PromotionProduct(kb.next(), kb.nextDouble(), kb.nextDouble());
                    break;
            }
        }

        for (int i = 0; i < products.length; i++) {
            if(products[0].getTotalPrice() > products[i].getTotalPrice()){
                products[0] = products[i];
            }
        }
        System.out.printf("%s %.2f",products[0].getName(),products[0].getTotalPrice());
    }
}
