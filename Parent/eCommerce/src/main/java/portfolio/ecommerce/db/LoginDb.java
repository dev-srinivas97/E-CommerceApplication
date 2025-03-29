package portfolio.ecommerce.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import portfolio.ecommerce.Login.LoginObj;

public class LoginDb {

	public List<LoginObj> getLoginDetails() throws Exception {
		List<LoginObj> list1 = new ArrayList<>();
		
		Connection con = null;
		try {
			String URL = "jdbc:mysql://localhost:3306/eCommerce";
			String uname = "root";
			String password = "Srinivas@97$";
			String query = "select * from LoginDetails";
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("1");
			con = DriverManager.getConnection(URL, uname, password);
			System.out.println("2");
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);

			while (rs.next()) {
				LoginObj loginObj = new LoginObj();
				loginObj.setId(rs.getInt(1));
				loginObj.setUsername(rs.getString(2));
				loginObj.setPassword(rs.getString(3));
				list1.add(loginObj);
			}
			return list1;
		} catch (Exception e) {
			throw e;
		} finally {
			con.close();
		}
	}

	public void insertSession(String username, String sessionId) throws SQLException {
		Connection con = null;
		try {
			String URL = "jdbc:mysql://localhost:3306/eCommerce";
			String uname = "root";
			String password = "Srinivas@97$";
			String query = "INSERT INTO SessionId (sessionId, username) VALUES (?, ?)";
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("1");
			con = DriverManager.getConnection(URL, uname, password);

			PreparedStatement preparedStatement = con.prepareStatement(query);

			// Set values for placeholders
			preparedStatement.setString(1, sessionId);
			preparedStatement.setString(2, username);

			// Execute the query
			int rowsInserted = preparedStatement.executeUpdate();
			if (rowsInserted > 0) {
				System.out.println("Session ID successfully inserted.");
			}
		} catch (Exception e) {

		} finally {
			con.close();
		}
	}
	public void deleteSession(String sessionId) throws SQLException {
	    Connection con = null;
	    try {
	        String URL = "jdbc:mysql://localhost:3306/eCommerce";
	        String uname = "root";
	        String password = "Srinivas@97$";
	        String query = "DELETE FROM SessionId WHERE sessionId = ?";
	        Class.forName("com.mysql.cj.jdbc.Driver");

	        System.out.println("Deleting session...");
	        con = DriverManager.getConnection(URL, uname, password);

	        PreparedStatement preparedStatement = con.prepareStatement(query);

	        // Set value for the placeholder
	        preparedStatement.setString(1, sessionId);

	        // Execute the query
	        int rowsDeleted = preparedStatement.executeUpdate();
	        if (rowsDeleted > 0) {
	            System.out.println("Session ID successfully deleted.");
	        } else {
	            System.out.println("No session found with the given session ID.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        if (con != null) {
	            con.close();
	        }
	    }
	}

}
