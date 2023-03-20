
public class Product {
    protected String name;
    protected double price;
    //Method
    public Product(){
        name = " ";
        price = 0.0;
    }
    public Product(String name , double price){
        this.name = name;
        this.price = price;
    }
    public String getName(){
        return name;
    }
    public double getPrice() {
        return price;
    }
    public double getTotalprice(Product[] arr){
        double min = arr[0].getPrice();
        int index = 0;
        for (int i = 0 ; i < arr.length ; i++){
            if ((arr[i].getPrice()) < min){
                min = arr[i].getPrice();
                index = i;
            }
        }
        return index;
    }
}