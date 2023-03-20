public class PromotionProduct extends Product{
    double discount = 0.00 ;
    PromotionProduct(){
        super();
        this.discount = 0.00 ;
    }
    PromotionProduct(String name ,double price ,double discount){
        super(name,price);
        this.discount = discount ;
    }
    public double getTotalPrice() {
        return super.getPrice();
    }
    public double getDiscount() {
        return discount;
    }
}
