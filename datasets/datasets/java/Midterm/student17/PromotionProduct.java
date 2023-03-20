public class PromotionProduct extends Product{
    private double discount = 0;

    public PromotionProduct(){
        super();
    }
    public PromotionProduct(String name ,double price , double discount){
        this.name = name;
        this.price = price;
        this.discount =discount;
    }
    public double getTotalPrice(){
        price = price -discount;
        return price;
    }
    public double getDiscount(){
        return discount;
    }


}
