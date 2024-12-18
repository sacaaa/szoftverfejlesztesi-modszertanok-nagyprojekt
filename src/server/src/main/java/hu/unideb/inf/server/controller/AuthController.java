package hu.unideb.inf.server.controller;

import hu.unideb.inf.server.model.base.User;
import hu.unideb.inf.server.repository.UserRepository;
import hu.unideb.inf.server.service.impl.JwtService;
import hu.unideb.inf.server.service.impl.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        try {
            UserDetails userDetails = userService.loadUserByUsername(username);
            Optional<User> user = userRepository.findByEmail(username);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }

            if (!userService.authenticate(username, password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }

            Map<String, Object> extraClaims = Map.of(
                    "studentId", user.get().getId()
            );

            return ResponseEntity.ok(Map.of(
                    "token", jwtService.generateToken(extraClaims, userDetails),
                    "refreshToken", jwtService.generateRefreshToken(userDetails)
            ));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("User cannot be null.");
        }

        try {
            userService.register(user);
            return ResponseEntity.ok("User registered successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        try {
            // Extract username from refresh token
            String username = jwtService.extractUsername(refreshToken);

            // Load user details
            UserDetails userDetails = userService.loadUserByUsername(username);
            Optional<User> user = userRepository.findByEmail(username);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }

            // Validate the refresh token
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                // Generate a new access token
                Map<String, Object> extraClaims = Map.of(
                        "studentId", user.get().getId()
                );
                String newAccessToken = jwtService.generateToken(extraClaims, userDetails);

                // Return the new access token
                return ResponseEntity.ok(Map.of(
                        "token", newAccessToken
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Refresh token has expired"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid request"));
        }

    }

}
