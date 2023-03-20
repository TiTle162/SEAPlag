

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product p[] = new Product[n];
        for(int i = 0; i < n; i++){
            char ans = kb.next().charAt(0);
            if(ans == 'P'){
                p[i] = new PromotionProduct(kb.next(),kb.nextDouble(),kb.nextDouble());
            }
            else{
                p[i] = new Product(kb.next(),kb.nextDouble());
            }
        }
        double min = p[0].getTotalPrice();
        int index = 0;
        for(int i = 0; i < n; i++){
            if(p[i].getTotalPrice() < min){
               min = p[i].getPrice();
                index = i;
            }
        }
        System.out.printf("%s %.2f",p[index].getName(), p[index].getPrice());
    }
}