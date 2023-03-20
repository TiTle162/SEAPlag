
public class PromotionProduct extends Product {
    private  double discount;
    //Method
    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(String name , double price , double discount){
        super(name , price);
        this.discount = discount;
    }
    public double getDiscount(){
        return discount;
    }
    public void setprice(double price){
        this.price = price;
    }
    public double getTotalPrice(PromotionProduct pm){
        double tatal = 0;
        tatal = pm.getPrice() - pm.getDiscount();
        return tatal;
    }
}
