import java.util.Scanner;
public class Test2 {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);

        int n = kb.nextInt();
        Product[] products = new Product[n];

        for (int i=0; i<n; i++){
            String type = kb.next();

            if (type.equalsIgnoreCase("N")){
                String name = kb.next();
                double price = kb.nextDouble();
                products[i]=new Product(name,price);
            }
            else if (type.equalsIgnoreCase("P")){
                String name = kb.next();
                double price = kb.nextDouble();
                double discount = kb.nextDouble();
                Product oj =new PromotionProduct(name,price,discount);
                products[i]=new Product(oj.getName(),oj.getTotalPrice());
            }
        }
        Product min = new Product();
        min = products[0];
        for (int i=0; i<n; i++){
            if (products[i].getPrice()<min.getPrice()){
                min = products[i];
            }
        }
        System.out.print(min.getName()+" ");
        System.out.printf("%.2f", min.getPrice());
    }
}