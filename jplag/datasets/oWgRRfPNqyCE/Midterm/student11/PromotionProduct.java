public class PromotionProduct extends Product{
    private double discount = 0.0;

    public PromotionProduct(){
        this.discount = 0.0;
    }

    public PromotionProduct(String name, double price, double discount){
        super();
        this.discount = discount;
    }

    public double getTotalPrice(){
        return price - discount;
    }

    public double getDiscount(){
        return discount;
    }
}
