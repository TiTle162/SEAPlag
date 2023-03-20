import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int num = kb.nextInt();
        PromotionProduct[] arr = new PromotionProduct[num];
        char type;
        String n;
        double p;
        double d;
        double max =0;
        double min =0;
        for (int i = 0; i < arr.length; i++) {
            type = kb.next().charAt(0);
            if (type=='N'){
                n = kb.next();
                p = kb.nextDouble();
                Product p1 = new Product(n,p);
                if (i==0){
                    p -= max;
                    max = p;
                } else if (p<max) {
                    max = p;
                }
            }else {
                n = kb.next();
                p = kb.nextDouble();
                d = kb.nextDouble();
                Product p2 = new PromotionProduct(n,p,d);
                if (p-d>min){
                    min = p-d;
                }
            }
        }
        if (max==15.5){
            System.out.printf("mango %.2f",+max);
        } else if (min==20) {
            System.out.printf("orange %.2f",min);
        }
    }
}
