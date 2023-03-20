
public class Product {
   protected String name ;
    protected double price ;

    public Product(){
        name = null;
        price = 0.0;
    }
    public  Product(String name , double price){
        this.name = name;
        this.price =price;
    }
    public double getTotalPrice(){
        return price;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setPrice(double price){
        this.price = price;
    }
    public String toString(){
        return name + " " + price +"0";


    }

}
