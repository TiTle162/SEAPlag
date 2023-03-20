public class Product {
    protected String name;
    protected double price;
    Product(){
        name = "";
        price = 0.0;
    }
    Product(String name,double price){
        this.name = name;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public double getTotalPrice(){
        return price;
    }
}
