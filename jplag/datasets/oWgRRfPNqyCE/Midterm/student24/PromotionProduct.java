public class PromotionProduct extends Product{
    private double discount = 0.0;

    public PromotionProduct(){

    }
    public PromotionProduct(String name, double price, double discount){
        this.name = name;
        this.price = price;
        this.discount = discount;
    }
    public double getTotalPrice(){
        return TotalPrice;
    }
    public double getDiscount(){
        return discount;
    }
}
