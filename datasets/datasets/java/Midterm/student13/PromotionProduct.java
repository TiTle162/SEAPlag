public class PromotionProduct extends Product {
    private double discount = 0.0;
    PromotionProduct(){
        super();
        discount = 0.0;
    }
    PromotionProduct(Product p1,double discount){
        super(p1.name, p1.price);
        this.discount = discount;
    }

    @Override
    public double getTotalPrice() {
        price = price - discount;
        return price;
    }

    public double getDiscount() {
        return discount;
    }
}