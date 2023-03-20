
public class PromotionProduct extends Product {
    public double discount = 0.0;
    PromotionProduct(){
        super();
        discount = 0.0;
    }
    PromotionProduct(String name , double price,double discount){
        super(name,price);
        this.discount = discount;
    }
    private void setDiscount(String name , double price,double discount){
        super.setName(name);
        super.setPrice(price);
        this.discount = discount;
    }
    public double getTotalPrice(){
        return price - discount;
    }
    public double getDiscount(){
        return  discount;
    }
}
