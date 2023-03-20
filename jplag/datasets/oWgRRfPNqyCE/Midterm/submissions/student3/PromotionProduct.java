public class PromotionProduct extends Product {
    private double discount;

    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(String name, double price, double discount){
        this.name = name;
        this.price = price;
        this.discount = discount;
    }
    public double getDiscount() {
        return discount;
    }
    public double getTotalPrice(){
        return getPrice()-getDiscount();
    }
}