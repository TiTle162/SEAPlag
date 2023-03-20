

public class PromotionProduct extends Product{
    private double discount = 0.0;
    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(Product string, double discount){
        super(string.name, string.price);
        this.discount = discount;
    }

    @Override
    public double getTotalPrice() {
        return super.getTotalPrice() - discount;
    }

    public double getDiscount() {
        return discount;
    }
}
