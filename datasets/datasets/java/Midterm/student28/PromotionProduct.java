

public class PromotionProduct extends Product{
    private double discount;
    private String DiscountPrice;
    public PromotionProduct(){
        discount=0.0;
    }
    public PromotionProduct(String dp,String name,double price){
        super();
        this.DiscountPrice=dp;
        this.name=name;
        this.price=price;

    }

    @Override
    public double getPrice() {
        return super.getPrice();
    }

    public double getDiscount() {
        return discount;
    }

    public String getDiscountPrice() {
        return DiscountPrice;
    }
}
