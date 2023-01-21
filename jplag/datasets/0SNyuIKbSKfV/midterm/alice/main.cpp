#include <iostream>
#include <algorithm>
using namespace std;
void display(int a[]) {
   for(int i = 0; i < 5; ++i)
   cout << a[i] << " ";
}
int main() {
   int a[5]= {4, 2, 7, 9, 6};
   cout << "\n The array before sorting is : ";
   display(a);
   sort(a, a+5);
   cout << "\n\n The array after sorting is : ";
   display(a);
   return 0;
}