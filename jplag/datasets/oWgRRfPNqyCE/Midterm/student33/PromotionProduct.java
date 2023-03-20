public class PromotionProduct extends Product{
    private double discount = 0.0;
    public PromotionProduct(){
        super();
    }
    public PromotionProduct(double price, double discount){
        this.price = price;
        this.discount = discount;
    }

    public PromotionProduct(String name) {
        this.name = name;
    }

    @Override
    public double getTotalPrice() {
        return super.getTotalPrice();
    }

    public double getDiscount() {
        return discount;
    }
}