import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        String[] name = new String[n];
        double[] price = new double[n];
        double[] discount = new double[n];
        double[] proD =new double[n];

        Product[] product = new Product[n];
        char type;
        for (int i = 0 ; i < n ; i++){
            type = kb.next().charAt(0);
            if (type == 'N' ){
                name[i]= kb.next();
                price[i]= kb.nextDouble();
                Product normal = new Product(name[i],price[i] );
                proD[i]= normal.getTotalPrice();
                product[i] = normal;
            } else if (type=='P') {
                name[i]= kb.next();
                price[i]= kb.nextDouble();
                discount[i] = kb.nextDouble();
                PromotionProduct pro = new PromotionProduct(name[i],price[i], discount[i]);
                proD[i] = pro.getTotalPrice();
                product[i] = pro ;
            }
        }
        String nameMin = null;
        double priceMin  =proD[0];
        for (int i = 0 ; i < n ; i++){
              if (proD[i] < priceMin) {
                priceMin = proD[i];
                nameMin = name[i];
            }
        }
       
        System.out.print(nameMin+" ");
        System.out.printf("%.2f",priceMin);





    }
}
