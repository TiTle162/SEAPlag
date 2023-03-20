public class PromotionProduct extends Product{
    protected double discount = 0.0;
    PromotionProduct(){
        super();
        discount = 0.0;
    }
    PromotionProduct(String name,double price,double discount){
        super(name,price);
        this.discount = discount;
    }
    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
    public double getTotalPrice(){
        return price-discount;
    }
}
