class PromotionProduct extends Product {
    private double discount;

    public PromotionProduct() {
        super();
        this.discount = 0.0;
    }

    public PromotionProduct(String name, double price, double discount) {
        super(name, price);
        this.discount = discount;

    }
    public double getDiscount() {
    return this.discount ;
}
public  void setDiscount(double discount){
    this.discount=discount;
    }
    public double getTotalPrice(){
        return this.getPrice() - this.discount;
    }
}
