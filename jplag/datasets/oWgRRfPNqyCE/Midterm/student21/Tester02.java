import java.util.Scanner;

public class Tester02 {
    public static void main(String[] args) {
        Scanner kb=new Scanner(System.in);
        int n=kb.nextInt();
        String[] name = new String[n];
        double[] price = new double[n];
        PromotionProduct [] objProduct = new PromotionProduct[n];
        Product[] objProduct2=new Product[n];
        double [] discount=new double[n];
        for (int i = 0; i < n; i++) {
            String type= kb.next();
            if(type.equals("N")){
                name[i] = kb.next();
                price[i] = kb.nextDouble();
                Product p1 = new Product(name[i], price[i]);
                objProduct2[i]=p1;
            }else if(type.equals("P")){
                name[i] = kb.next();
                price[i] = kb.nextDouble();
                discount[i]= kb.nextDouble();
                Product p1=new Product(name[i],discount[i] );
                PromotionProduct p2 =new PromotionProduct(p1,discount[i]);
                objProduct[i]=p2;
            }
        }
        double min=Double.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            if (objProduct[i].getTotalPrice() < min) {
                min = objProduct[i].getTotalPrice();
                objProduct[i].name = name[i];
            }else if(objProduct2[i].getPrice()<min){
                min=objProduct2[i].getPrice();
                objProduct2[i].name=name[i];
            }
        }
        for (int i = 0; i < n; i++) {
            if (objProduct[i].getPrice()==min){
                System.out.printf(objProduct[i].name+" "+" %.2f",objProduct[i].getTotalPrice());
            }else if(objProduct2[i].getPrice()==min){
                System.out.printf(objProduct2[i].name+" %.2f",objProduct2[i].price);
            }
        }
    }
}
