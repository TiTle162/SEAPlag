import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);

        int n = kb.nextInt();
        Product[] p = new Product[n];
        PromotionProduct[] p1 = new PromotionProduct[n];
        String[] typecheck = new  String[n];
        double min = 0.0;
        int r = 0;
        for (int i = 0;i < n;i++){
            char type = kb.next().charAt(0);

            if (type == 'N'){
                String name = kb.next();
                double price = kb.nextDouble();
                p[i] = new Product(name,price);
                typecheck[i] = "N";
                if (i == 0){
                    min = p[i].getPrice();
                    r = i;
                }else if (min >= price){
                    min = p[i].getPrice();
                    r = i;
                }
            }else if(type == 'P'){
                typecheck[i] = "P";
                String name1 = kb.next();
                double price1 = kb.nextDouble();
                double disprice = kb.nextDouble();
                p[i] = new PromotionProduct(name1,price1,disprice);
                if (i == 0){
                    min = p[i].getTotalPrice();
                    r = i;
                }else if (min >= p[i].getTotalPrice()){
                    min = p[i].getTotalPrice();
                    r = i;
                }
            }

        }
        for (int i = 0 ;i < n ;i++){
            if (typecheck[i] == "N"){
                if (i == r) {
                    System.out.printf(p[i].name + " " + "%.2f", p[i].getPrice());
                }
            }else {
                if(i == r) {
                    System.out.printf(p[i].name + " " + "%.2f", p[i].getTotalPrice());
                }
            }






        }
    }
}
