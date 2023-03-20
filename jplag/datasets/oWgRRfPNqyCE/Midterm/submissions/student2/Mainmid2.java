import java.util.Arrays;
import java.util.Scanner;
public class Mainmid2 {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int number_product = kb.nextInt();
        Product[] pro2 = new Product[number_product];
        double[] tempdouble = new double[number_product];

        for (int i = 0 ; i < pro2.length ; i++){
            String type = kb.next();

            switch (type){
                case "N":
                    pro2[i] = new Product(kb.next(),kb.nextDouble());
                    tempdouble[i] = pro2[i].getTotalPrice();
                    break;
                case "P":
                    pro2[i] = new PromotionProduct(kb.next(),kb.nextDouble(),kb.nextDouble());
                    tempdouble[i] = pro2[i].getTotalPrice();
                    break;
            }
        }

        Arrays.sort(tempdouble);

        for (int i = 0 ; i < pro2.length ; i++){
            if (pro2[i].getTotalPrice() == tempdouble[0]){
                System.out.printf("%s %.2f" , pro2[i].getName(), pro2[i].getTotalPrice());
            }
        }

    }
}
