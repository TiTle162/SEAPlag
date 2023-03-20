
import java.util.Scanner;

public class testMain {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n_product = input.nextInt();
        Product[] arrProduct = new Product[n_product];

        for(int i = 0 ; i < n_product ; i++){
            char status = input.next().charAt(0);
            if(status == 'N'){
                arrProduct[i] = new Product(input.next(),input.nextDouble());
            }else if(status == 'P'){
                arrProduct[i] = new PromotionProduct(input.next(),input.nextDouble(),input.nextDouble());
            }
        }
        int index_low_price = 0;
        for(int i = 1 ; i < n_product ; i++){
            if(arrProduct[index_low_price].getTotalPrice() > arrProduct[i].getTotalPrice()){
                index_low_price = i;
            }
        }
        System.out.printf("%s %.2f",arrProduct[index_low_price].getName(),arrProduct[index_low_price].getTotalPrice());
    }
}
