/*********************************************************************************************************************************
 * Student : 65160101 Kunanont Rungrujee                                      																				                         					  *                                                                                                        	*
 * Program : ข้อ 1           				                 	           		             		     	`																														 *
 * Description : โปรแกรมรับตัวเลขจำนวนเต็ม 2 จำนวน คือ a และ b หลังจากนั้นทำประมวลผลหาค่าผลรวมระหว่าง a และ b และแสดงผลรวม  *
 *********************************************************************************************************************************/
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int a;
        int b;
        Scanner kb = new Scanner(System.in);
        a = kb.nextInt();
        b = kb.nextInt();
        System.out.println(a+b);
    }
}