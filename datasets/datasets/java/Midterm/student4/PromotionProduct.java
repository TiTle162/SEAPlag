public class PromotionProduct extends  Product{
    double discount;

    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(String name,double price,double discount){
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    @Override
    public double getTotalPrice() {
        return super.getTotalPrice()-discount;
    }

    public double getDiscount() {
        return discount;
    }
}
