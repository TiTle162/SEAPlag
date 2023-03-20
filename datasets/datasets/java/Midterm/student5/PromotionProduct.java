public class PromotionProduct extends Product {
    double discount = 0.0;

    public double getDiscount() {
        return discount;
    }

    PromotionProduct(){
        this.discount = 0.0;
    }
    PromotionProduct(String name , double price , double discount){
        super(name, price);
        this.discount = discount;

    }
    public double getTotalprice(){
        double discount = this.discount;
        double price = this.price;
        double total_price = price - discount;
        this.price = total_price;
        return this.price;
    }

}
