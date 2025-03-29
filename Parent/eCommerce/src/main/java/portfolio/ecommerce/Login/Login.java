package portfolio.ecommerce.Login;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import portfolio.ecommerce.common.Status;
import portfolio.ecommerce.db.LoginDb;
import portfolio.ecommerce.intf.LoginValidate;
import portfolio.ecommerce.jwt.JwtTokenUtil;

@Path("/Login")
public class Login {

	@Context
	HttpServletResponse httpResponse;

	@Context
	HttpServletRequest request;

	Status status = new Status();

	@GET
	@Path("/getLogin")
	@Produces(MediaType.APPLICATION_JSON)
	public List<?> getLogin() {
		LoginDb login = new LoginDb();
		try {
			return login.getLoginDetails();

		} catch (Exception e) {
			return null;
		}

	}

	@POST
	@Path("/validate")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response validateLogin(LoginObj login) {
		LoginValidate loginValidation = new LoginValidate();
		ValidateLoginObj validateLogin = new ValidateLoginObj();

		if (login.getUsername().equals("") || login.getPassword().equals("")) {
			status.setError(HttpServletResponse.SC_FORBIDDEN);
			return Response.status(200).entity(status).build();
		}
		try {
			validateLogin = loginValidation.validateLogin(login);

		} catch (Exception e) {

		}
		return Response.status(200).entity(validateLogin).build();
	}

	@GET
	@Path("/jwtData")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJwtData() {
		JwtTokenUtil jwtTokenUtil=new JwtTokenUtil();
		try {
			JwtObj jwtObj=jwtTokenUtil.getJwtObj(request);
			System.out.println("inside jwtData");
			System.out.println(jwtObj.toString());
			return Response.status(200).entity(jwtObj).build();
		} catch (Exception e) {
			return null;
		}
	}

}
