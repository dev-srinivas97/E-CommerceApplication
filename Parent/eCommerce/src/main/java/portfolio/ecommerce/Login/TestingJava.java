package portfolio.ecommerce.Login;

public class TestingJava {

	public static void main(String[] args) {

		int nums[] = { 6, 2, 9, 7, 8,3 };

		System.out.println("Befor sorting");
		int temp=0;

		for (int i = 0; i < nums.length-1; i++) {
			if(nums[i]>nums[i+1]) {
				temp=nums[i+1];
				nums[i+1]=nums[i];
				nums[i]=temp;
			}
		}
		for(int i=0;i<nums.length-1;i++) {
			if(nums[i+1]<nums[i]) {
				temp=nums[i+1];
				
			}
		}
		
		for(int i=0; i<nums.length;i++) {
			System.out.print(nums[i]+" ");
		}
	}

}
