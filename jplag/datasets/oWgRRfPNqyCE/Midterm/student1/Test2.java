package Product;
import java.util.Scanner;
import java.util.Arrays;

public class Test2 {
    public static void main(String args[]){
//        int[] number = {10, 30, 15, 25, 35};
//        int max = Arrays.stream( number ).max().getAsInt();
//        System.out.println( number );
//        System.out.println( "Max is : "+max );

        Scanner input = new Scanner(System.in);
        int count;
        count = input.nextInt();
        Product[] proD = new Product[count];

        String type,name;
        double price = 0.0;
        for(int i=0; i<count; i++){
            type = input.next();
            name = input.next();
            price = input.nextDouble();
            proD[i] = new Product(name,price);
            proD[i] = new PromotionProduct();

            if(type.equals("N")){

            }else if (type.equals("P")) {

            }
        }

    }

}
