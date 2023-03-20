import java.util.Scanner;

public class TestProduct {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        Product fruit [] = new Product[n];
        for (int i = 0 ; i< fruit.length;i++){
            String type = kb.next();
            if (type.equals("N")){
                String name = kb.next();
                double price = kb.nextDouble();
                fruit[i] = new Product(name,price);
            } else if (type.equals("P")) {
                String name = kb.next();
                double price = kb.nextDouble();
                double promotion = kb.nextDouble();
                fruit[i] = new PromotionProduct(name,price,promotion);
            }

        }
        for (int i = 0 ; i< fruit.length;i++){
            if (fruit[i] instanceof PromotionProduct){
                PromotionProduct p = (PromotionProduct) fruit[i];
                p.getTotalprice();
            }
        }

        double highest_fruit = fruit[0].getPrice();
        for (int i = 0 ; i< fruit.length;i++){

            if (highest_fruit >fruit[i].getPrice()){
                highest_fruit = fruit[i].getPrice();
                fruit[0].setName(fruit[i].getName());
                fruit[0].setPrice(fruit[i].getPrice());
                fruit[i].setPrice(highest_fruit);
            }
        }
        System.out.print(fruit[0].getName()+" ");
        fruit[0].print();

    }

}
