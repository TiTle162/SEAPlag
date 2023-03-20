
public class Product {
    protected String name;
    protected double price = 0.0;

    public Product(){

    }

    public Product(String name,double price){
        this.name = name;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public double getTotalPrice(){
        return price;
    }
}
