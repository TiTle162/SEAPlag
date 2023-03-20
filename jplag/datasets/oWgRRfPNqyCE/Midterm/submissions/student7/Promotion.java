
public class Promotion extends Product{
	
	double discount =0;
	
	Promotion() {
		super("Unknow", 0);
		discount = 0;
	}

	Promotion(String name, double price ,double dis) {
		super(name, price);
		discount = dis;
	}
	
	public double getDiscount() {
		return discount;
	}
	
	public double getTotalprice() {
		return super.price- discount;
	}

	
	
}
