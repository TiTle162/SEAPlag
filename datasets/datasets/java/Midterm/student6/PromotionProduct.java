public class PromotionProduct extends Product{
    private double discount;

    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(String name , double price , double discount){
        super(name , price);
        this.discount = discount;
    }
    public double getTotalPrice(){
        return price - discount;
    }
    public double getDiscount(){
        return discount;
    }
}
