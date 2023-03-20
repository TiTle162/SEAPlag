import java.util.Scanner;

public class Tester {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n  = kb.nextInt();
        Product[] allfruit = new Product[n];
        Product fruit = new Product();
        PromotionProduct profruit = new PromotionProduct();
        for (int i = 0; i < n; i++) {
            String proorno = kb.next();
            if(proorno.equals("N")){
                fruit = new Product(kb.next(),kb.nextDouble());
                allfruit[i] = fruit;
            }else if(proorno.equals("P")){
                profruit = new PromotionProduct(kb.next(),kb.nextDouble(),kb.nextDouble());
                profruit.price = profruit.getTotalPrice();
                allfruit[i] = new Product(profruit.name,profruit.price);
            }
        }
        double max = 0; double min = 0;
        for (int i = 0; i < n; i++) {
            if(i == 0){
                max = allfruit[i].price;
                min = allfruit[i].price;
            }else if(allfruit[i].price >= max){
                max = allfruit[i].price;
            }else if(allfruit[i].price < min){
                min = allfruit[i].price;
            }
        }
        for (int i = 0; i < n; i++) {
            if(allfruit[i].price == min){
                System.out.printf("%s %.2f" ,allfruit[i].name,allfruit[i].price);
            }
        }
    }
}
