

public class Product {
    protected String name;
    protected double price;
    Product(){
        name = "unknow";
        price = 0.0;
    }

    Product(String name, double price){
        this.name = name;
        this.price = price;
    }

    public String getName(){
        return name;
    }

    public double getPrice(){
        return price;
    }

    public double getTotalPrice(){
        return price;
    }
}
