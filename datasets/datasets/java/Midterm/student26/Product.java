public class Product {
    protected String name;
    protected double price;

    Product(){
        name = null;
        price = 0.0;
    }
    public Product(String name , double price){
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getLe() {
        return price;
    }

    public double getTotalPrice(){
        return price;
    }
}
