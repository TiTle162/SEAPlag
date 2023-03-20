public class Product {
    String name;

    double price;
    Product(){
        name = "unknown";
        price = 0;
    }
    Product(String name,double price){
        this.name = name;
        this.price = price;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
    public void print(){
        System.out.printf("%.2f",this.price);
    }
}
