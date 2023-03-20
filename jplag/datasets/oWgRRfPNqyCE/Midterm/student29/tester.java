
import java.util.Scanner;

public class tester {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product[] arr = new Product[n];
        String name;
        double price;
        for (int i = 0 ; i < arr.length ; i++){
            String type = kb.next();
            if (type.equalsIgnoreCase("N")){
                Product p1 = new Product(kb.next() , kb.nextDouble());
                arr[i] = p1;
            } else if (type.equalsIgnoreCase("P")) {
                PromotionProduct pm1 = new PromotionProduct(kb.next() , kb.nextDouble() , kb.nextDouble());
                pm1.setprice(pm1.getTotalPrice(pm1));
                arr[i] = pm1;
            }
        }
        int total = 0;
        for (int i = 0 ; i < 1 ; i++){
            total = (int) arr[i].getTotalprice(arr);
        }
        for (int i = 0 ; i < 1 ; i++){
            System.out.printf(arr[total].getName() + " " + "%.2f",arr[total].getPrice());
        }
    }
}
