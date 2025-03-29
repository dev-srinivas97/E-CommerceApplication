package portfolio.ecommerce.application;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import portfolio.ecommerce.Login.Login;

@ApplicationPath("/eComm")
public class eCommerceApplication extends Application{
	Set<Object> singletons = new HashSet<>();

	public eCommerceApplication(){
		System.out.println("adsd");
		this.singletons.add(new Login());
	}

	public Set<Object> getSingletons() {
		return singletons;
	}
}
