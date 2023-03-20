

import java.util.Scanner;
import java.text.DecimalFormat;  
import java.util.Arrays;


public class tester {
  private static final DecimalFormat decfor = new DecimalFormat("0.00");  

	public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        Product[] parrProducts = new Product[n];
        String[] typeString = new String[n];
        
        for (int i = 0; i < n; i++) {
        	 typeString[i] = input.next();
        	
        	 if(typeString[i].equals("N")) {
        		 String nameString =input.next();
                 double price = input.nextDouble();
                 parrProducts[i] = new Product(nameString, price);
        	 }
        	 
             if(typeString[i].equals("P")) {
            	 String nameString =input.next();
                 double price = input.nextDouble();
                 double dc = input.nextDouble();
                 parrProducts[i] = new Promotion(nameString, price, dc);
        	 }
		}
        
        
        
        double l =parrProducts[0].getTotalprice();
        int iprint =0;
        for (int i = 0 ; i < n; i++) {
        	if(parrProducts[i].getTotalprice()<l) {
        		l = parrProducts[i].getTotalprice();
        		iprint=i;
        		
        		
        	}
        
     
        }
    	

       
        	System.out.println(parrProducts[iprint].getName()+" "+decfor.format(parrProducts[iprint].getTotalprice()));
        	
        	
		
        
        
        
    
        
        
        			
	}	
		
}
        
        
        
        
        
        


