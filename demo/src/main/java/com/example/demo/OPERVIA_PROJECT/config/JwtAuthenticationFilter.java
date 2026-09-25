package com.example.demo.OPERVIA_PROJECT.config;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.util.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    public JwtAuthenticationFilter(
            JwtUtil jwtUtil,
            UserRepository userRepository) {

        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            jakarta.servlet.http.HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response,
            jakarta.servlet.FilterChain filterChain)
            throws jakarta.servlet.ServletException, java.io.IOException {

    	String authHeader = request.getHeader("Authorization");

    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    	    filterChain.doFilter(request, response);
    	    return;
    	}

    	String jwt = authHeader.substring(7);

    	try {
    		String email = jwtUtil.extractEmail(jwt);

    		User user = userRepository.findByEmail(email)
    		        .orElseThrow(() -> new RuntimeException("User not found"));
    		System.out.println("EMAIL: " + user.getEmail());
    		System.out.println("ROLE: " + user.getRole());

    		UsernamePasswordAuthenticationToken authentication =
    		        new UsernamePasswordAuthenticationToken(
    		                email,
    		                null,
    		                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
    		        );

    		SecurityContextHolder.getContext()
    		        .setAuthentication(authentication);
    	} catch (Exception e) {
    	    SecurityContextHolder.clearContext();
    	}
    	

    	filterChain.doFilter(request, response);
     
    }
}