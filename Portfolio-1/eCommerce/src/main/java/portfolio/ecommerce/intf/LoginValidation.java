package portfolio.ecommerce.intf;

import portfolio.ecommerce.Login.LoginObj;
import portfolio.ecommerce.Login.ValidateLoginObj;

public interface LoginValidation {
	public ValidateLoginObj validateLogin(LoginObj loginObj) throws Exception;
	public  String generateSessionId(String loginObj);
}
