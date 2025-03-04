package portfolio.ecommerce.intf;

import java.security.SecureRandom;
import java.sql.SQLException;

import portfolio.ecommerce.Login.LoginObj;
import portfolio.ecommerce.Login.ValidateLoginObj;
import portfolio.ecommerce.db.LoginDb;
import portfolio.ecommerce.jwt.JwtTokenUtil;

public class LoginValidate implements LoginValidation {

	LoginDb loginDb = new LoginDb();
	JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();

//	Validate the username and password and generate the JWT Token
	@Override
	public ValidateLoginObj validateLogin(LoginObj loginObj) throws Exception {
		try {

			ValidateLoginObj validateLogin = new ValidateLoginObj();
			for (LoginObj loginDet : loginDb.getLoginDetails()) {
				if (loginDet.getUsername().equals(loginObj.getUsername())
						&& loginDet.getPassword().equals(loginObj.getPassword())) {
					validateLogin.setValidate(true);
					validateLogin.setUsername(loginObj.getUsername());
					validateLogin.setSessionId(generateSessionId(loginObj.getUsername()));
					String token = createJwt(validateLogin);
					validateLogin.setJwtToken(token);
					return validateLogin;

				}
			}
			validateLogin.setValidate(false);
			return validateLogin;
		} catch (Exception e) {
			throw e;
		}
	}

	public String createJwt(ValidateLoginObj validateLogin) {
		try {
			// Generate JWT after successful login
			String token = JwtTokenUtil.generateToken(validateLogin);
			return token;
		} catch (Exception e) {
			return "Could not create JWT";
		}
	}

//	Generate a sessionId and store it in sessionId table
	public String generateSessionId(String username) {
		int MAX_LENGTH = 10;
		SecureRandom random = new SecureRandom();
		StringBuilder sessionId = new StringBuilder(MAX_LENGTH);

		for (int i = 0; i < MAX_LENGTH; i++) {
			int digit = random.nextInt(10); // Generates a random digit (0-9)
			sessionId.append(digit);
		}
		try {
			loginDb.insertSession(username, sessionId.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return sessionId.toString();
	}
}
