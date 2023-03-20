

public class PromotionProduct extends Product{
    private double discount;
    PromotionProduct(){
        super();
        discount = 0.0;
    }

    PromotionProduct(String name, double price, double discount){
        super(name,price);
        this.discount = discount;
    }

    public double getTotalPrice(){
        price -= discount;
        return price;
    }

    public double getDiscount(){
        return discount;
    }
}
