package Product;

public class Product {
    protected String name;
    protected double price;

    public Product(){
        name = "unknow";
        price = 0.0;
    }

    public Product(String name,double price){
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public double getTotal(){
        return price;
    }
}