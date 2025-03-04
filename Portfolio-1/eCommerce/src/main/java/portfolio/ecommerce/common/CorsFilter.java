package portfolio.ecommerce.common;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CorsFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// Initialization logic if required
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpServletRequest httpRequest = (HttpServletRequest) request;

		// Set CORS headers
		httpResponse.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
		httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
		httpResponse.setHeader("Access-Control-Expose-Headers", "Location");
		httpResponse.setHeader("Access-Control-Allow-Credentials", "true");

		// If it's a preflight request, return immediately
		if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
			httpResponse.setStatus(HttpServletResponse.SC_OK);
			System.out.println("Preflight request handled.");
			return;
		}

		String authHeader = httpRequest.getHeader("Authorization");

		String ValidateLogin = "/eCommerce/eComm/Login/validate";
		if (httpRequest.getRequestURI().equalsIgnoreCase(ValidateLogin)) {
			System.out.println("validated-JWT not required");
			httpResponse.setStatus(HttpServletResponse.SC_ACCEPTED);
		} else if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			System.out.println("not validated, required JWT");
			httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		} else {
			httpResponse.setStatus(HttpServletResponse.SC_ACCEPTED);
		}


		// Proceed with the next filter or target resource
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		// Cleanup logic if required
	}
}