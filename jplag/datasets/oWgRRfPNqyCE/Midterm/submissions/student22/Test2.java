import java.util.Scanner;
public class Test2 {
    public static void main(String[] args) {
        Scanner input=new Scanner(System.in);
        int n=input.nextInt();
        double min=0;
        String minName="";
        Product[]product=new PromotionProduct[n];
        for(int i=0;i<n;i++){
            String type=input.next();
            if(type.equals("P")){
                String name=input.next();
                double price=input.nextDouble();
                double discount= input.nextDouble();
                product[i]=new PromotionProduct(name,price,discount);
            }else if(type.equals("N")){
                String name=input.next();
                double price=input.nextDouble();
                product[i]=new PromotionProduct(name,price,0);
            }
        }
        for(int i=0;i< product.length;i++){
            if(i==0){
                min=product[i].getTotalPrice();
                minName=product[i].getName();
            }else{
                if(product[i].getTotalPrice()<min){
                    min=product[i].getTotalPrice();
                    minName=product[i].getName();
                }
            }
        }
        for(int i=0;i< product.length;i++){
            if(product[i].getName().equals(minName)){
                System.out.print(product[i].getName()+" ");
            }
        }
        for(int i=0;i< product.length;i++){
            if(product[i].getTotalPrice()==min){
                System.out.printf("%.2f",product[i].getTotalPrice());
            }
        }

    }
}
