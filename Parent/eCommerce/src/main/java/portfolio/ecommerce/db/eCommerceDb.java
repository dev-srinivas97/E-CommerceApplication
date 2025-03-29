package portfolio.ecommerce.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import portfolio.ecommerce.ecommerce.eCommerceObj;

public class eCommerceDb {
	public List<eCommerceObj> getLoginDetails() throws Exception {
		List<eCommerceObj> list1 = new ArrayList<>();

		Connection con = null;
		try {
			String URL = "jdbc:mysql://localhost:3306/eCommerce";
			String uname = "root";
			String password = "Srinivas@97$";
			String query = "select * from ecommerce";
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("1");
			con = DriverManager.getConnection(URL, uname, password);
			System.out.println("2");
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);

			while (rs.next()) {
				eCommerceObj eCommObj = new eCommerceObj();
				eCommObj.setId(rs.getInt(1));
				eCommObj.setCategory(rs.getString(2));
				eCommObj.setItem(rs.getString(3));
				eCommObj.setPrice(rs.getString(4));
				eCommObj.setQty(rs.getString(5));
				eCommObj.setRating(rs.getString(6));
				list1.add(eCommObj);
			}
			return list1;
		} catch (Exception e) {
			throw e;
		} finally {
			con.close();
		}
	}
}
