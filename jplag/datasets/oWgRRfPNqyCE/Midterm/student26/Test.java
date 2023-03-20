import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int num = input.nextInt();

        Product[] Oj = new Product[num];

        for(int i = 0 ; i < Oj.length ; i++){
            char ch = input.next().charAt(0);
            if (ch == 'N') {
                String Str = input.next();
                double n = input.nextDouble();
                Product product = new Product(Str , n);
                Oj[i] = product;
            }
            else if(ch == 'P'){
                String Str = input.next();
                double n = input.nextDouble();
                double discount = input.nextDouble();
                PromotionProduct promotionProduct = new PromotionProduct(Str , n , discount);

                Oj[i] = promotionProduct;
                Oj[i].price = promotionProduct.getTotalPrice();
            }
        }

//        for(int i = 0 ; i < Oj.length ; i++){
//            System.out.println(Oj[i].price);
//        }

        for(int i = 0 ; i < Oj.length ; i++){
            for (int j = i+1 ; j < Oj.length ; j++){
                if(Oj[i].getLe() > Oj[j].getLe()){

                    Product temp = Oj[j];
                    Oj[j] = Oj[i];
                    Oj[i] = temp;

                }
            }
        }
        System.out.print(Oj[0].name + " ");
        System.out.printf("%.2f",Oj[0].price);

    }
}
