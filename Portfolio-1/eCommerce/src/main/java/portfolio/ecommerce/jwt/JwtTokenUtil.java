package portfolio.ecommerce.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import portfolio.ecommerce.Login.JwtObj;
import portfolio.ecommerce.Login.ValidateLoginObj;

import java.security.Key;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JwtTokenUtil {


    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    ObjectMapper mapper = new ObjectMapper();

    // Generate a JWT Token
    public static String generateToken(ValidateLoginObj validateLogin) {
        // Set expiration time (e.g., 30 minutes)
        long expirationTimeMillis = 30 * 60 * 1000; // 30 minutes
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTimeMillis);

        // Generate the JWT
        return Jwts.builder()
                .claim("userInfo", validateLogin) // User data
                .setIssuedAt(now) // Issue time
                .setExpiration(expiryDate) // Expiration time
                .signWith(key) // Sign with the secret key
                .compact(); // Build the JWT
    }

    // Extract data from the JWT
    public JwtObj getJwtObj(HttpServletRequest request) {
        JwtObj jwtObj = new JwtObj();
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header");
            }

            String jwt = authHeader.substring("Bearer ".length());

            // Parse the token and extract claims
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key) // Provide the same secret key
                    .build()
                    .parseClaimsJws(jwt) // Parse the token
                    .getBody();

            if (!claims.containsKey("userInfo")) {
                throw new RuntimeException("Missing userInfo claim in JWT");
            }

            ValidateLoginObj validateLogin = mapper.convertValue(claims.get("userInfo"), ValidateLoginObj.class);
            System.out.println("validateLoginObj: " + validateLogin.toString());

            jwtObj.setSessionId(validateLogin.getSessionId());
            jwtObj.setUsername(validateLogin.getUsername());
            return jwtObj;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
