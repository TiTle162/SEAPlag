package Product;

public class PromotionProduct extends Product{
    double discount = 0.0;

    public PromotionProduct(){
        name = "unknow";
        price = 0.0;
        discount = 0.0;
    }
    public PromotionProduct(String name, double price, double discount){
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    public double getTotalprice() {
        return (this.price - this.discount);
    }

    public double getDiscount() {
        return discount;
    }
}
