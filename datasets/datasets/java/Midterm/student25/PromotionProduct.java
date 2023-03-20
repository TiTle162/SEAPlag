

public class PromotionProduct extends  Product{
    protected  double discount;

    public PromotionProduct(){
        super();
        discount = 0.0;
    }
    public PromotionProduct(Product product  , double    discount ){
        super(product.name , product.price );
        this.discount = discount;
    }
    public double getPrice(){
        return  super.getTotalPrice();

    }
    public void setPrice(double price){
        this.price = price;
    }
    public double getDiscount(){
        return discount;

    }
    public String toString(){
        return name + " " +price+"0";
    }
    @Override
    public  double getTotalPrice(){
        return price;
    }
    @Override
    public  String getName(){
        return name;

    }

}
