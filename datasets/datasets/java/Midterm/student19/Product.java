public class Product {
    protected String name ;
    protected double price ;
    Product (){
        this.name = " Unknow" ;
        this.price =  0.00;
    }
    Product (String name , double price) {
        this.name = name ;
        this.price = price ;
    }
    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }
    public double getTotalPrice (){
        return price;
    }
}
