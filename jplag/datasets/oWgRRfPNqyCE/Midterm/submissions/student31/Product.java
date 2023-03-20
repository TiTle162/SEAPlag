package Product;

public class Product {
    protected String name;
    protected double price;

    protected double TotalPrice;


    public Product() {
        name = "Unknown";
        price = 0.0;
    }

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public double getTotalprice() {
        return TotalPrice;
    }

    public String toString() {
    return getName() + " " + getPrice();


    }
}
