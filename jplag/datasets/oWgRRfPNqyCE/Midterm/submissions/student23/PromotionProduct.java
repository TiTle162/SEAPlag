public class PromotionProduct extends Product{
    public double discount;

    public PromotionProduct(){
        super();
        discount = 0.0;
    }

    public PromotionProduct(String name, double price, double discount){
        super(name, price);
        this.discount = discount;
    }

    @Override
    public double getTotalPrice() {
        return getPrice() - getDiscount();
    }

    public double getDiscount() {
        return discount;
    }
}
