package Product;

public class PromotionProduct extends Product{
    double discount = 0.0;

    public PromotionProduct(){
        super();
        name = "unknow";
        price = 0.0;
        discount = 0.0;
    }

    public double getTotalPrice() {
        return super.getTotal();
    }

    public double getDiscount() {
        return discount;
    }
}
