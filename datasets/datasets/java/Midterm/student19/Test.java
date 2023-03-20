import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int round = kb.nextInt();
        Product[] ar = new Product[round];
        PromotionProduct[] ar1 = new PromotionProduct[round] ;
        for (int i = 0; i < round; i++) {
            char ch = kb.next().charAt(0);
            if (ch == 'N'){
                String name = kb.next();
                double price = kb.nextDouble();
                ar[i] = new Product(name, price);
            }else if (ch == 'P'){
                String name = kb.next();
                double price = kb.nextDouble();
                double discount = kb.nextDouble();
                ar[i] = new Product(name, price-discount);
            }
        }
        double min = 0;
        for (int i = 0; i < round; i++) {
            min = ar[i].price ;
            for (int j = 1;j<round;j++){
                if (min > ar[j].price){
                    min = ar[j].price;
                }
            }
        }
        for (int i=0;i<round;i++){
            if (min == ar[i].price){
                System.out.print(ar[i].name+ " ");
                System.out.printf("%.2f\n",min);
            }
        }
    }
}
