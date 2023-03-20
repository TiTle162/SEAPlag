import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product[] fruit = new Product[n];
        for (int i = 0;i < n;i++){
            char type = kb.next().charAt(0);
            if (type == 'N'){
                fruit[i] = new Product(kb.next(), kb.nextDouble());
            } else if (type == 'P') {
                fruit[i] = new PromotionProduct(kb.next(),kb.nextDouble(),kb.nextDouble());
            }
        }
        double min = fruit[0].getPrice();
        int count = 0;
        for (int i = 1;i < n;i++){
            if (min > fruit[i].getTotalPrice()){
                min = fruit[i].getTotalPrice();
                count = i;
            }
        }
        System.out.printf("%s %.2f",fruit[count].getName(),fruit[count].getTotalPrice());
    }
}
