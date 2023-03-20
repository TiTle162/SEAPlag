public class PromotionProduct extends Product{
    private double discount;
    public PromotionProduct(){
        discount=0.0;
    }
    public PromotionProduct(String name,double price,double discount){
        super(name, price);
        this.discount=discount;
    }

    @Override
    public double getTotalPrice() {
        return super.getTotalPrice()-getDiscount();
    }
    public double getDiscount(){
        return discount;
    }
}
