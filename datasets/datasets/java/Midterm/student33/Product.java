public class Product {
    protected String name;
    protected double price;
    public Product(){
        name = "Unknow";
        price = 0.0;
    }
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    public Product(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
    double Total;
    public double getTotalPrice(){
        return Total = getPrice()+price;
    }
}