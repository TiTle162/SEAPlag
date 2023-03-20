public class PromotionProduct extends Product {
    private double discount = 0.0;

    public PromotionProduct() {
        this.name = "unknow";
        this.price = 0.0;
        this.discount = 0.0;
    }

    public PromotionProduct(String name, double price, double discount) {
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    @Override
    public double getTotalPrice() {
        return super.getTotalPrice() - getDiscount();
    }

    public double getDiscount() {
        return discount;
    }
}
