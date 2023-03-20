
public class PromotionProduct extends  Product{
    double discount = 0.0;
    public PromotionProduct(){
        super();
        discount=0.0;
    }
    public PromotionProduct(String name,double price, double discount){
        super(name,price);
        this.discount =discount;
    }

    public double getDiscount() {
        return discount;
    }
    public double getTotalPrice(){
        double totalPrice=0;
        totalPrice =getPrice()-getDiscount();
        return totalPrice;
    }
}
