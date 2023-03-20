
import java.util.Scanner;

public class TestProduct {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int count = kb.nextInt();
        Product[] products = new Product[count];
        for (int i =0 ;i<products.length;i++){
            String type = kb.next();
            if(type.equals("N")){
                products[i]=new Product(kb.next(), kb.nextDouble());
            }else {
                products[i]=new PromotionProduct(kb.next(), kb.nextDouble(), kb.nextDouble());
            }

        }
        int min = 0;
        for (int i =1 ;i<products.length;i++){
            if(products[i].getTotalPrice()>products[i-1].getTotalPrice()){
                products[i]=new Product( products[i-1].getName(),products[i-1].getTotalPrice());
                min=i-1;
            }else {
                min=i;
            }
        }
     System.out.printf(products[min].getName()+" %.2f",products[min].getTotalPrice());

    }
}
