package com.example.demo.OPERVIA_PROJECT.service;

import java.util.List;
import com.example.demo.OPERVIA_PROJECT.dto.UserResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.OPERVIA_PROJECT.repository.DepartmentRepository;
import com.example.demo.OPERVIA_PROJECT.entity.Department;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.util.JwtUtil;
import com.example.demo.OPERVIA_PROJECT.dto.UserProfileResponse;
@Service
public class UserService {
	private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            DepartmentRepository departmentRepository) {

this.userRepository = userRepository;
this.passwordEncoder = passwordEncoder;
this.jwtUtil = jwtUtil;
this.departmentRepository = departmentRepository;
}
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());

        user.setPasswordHash(hashedPassword);

        return userRepository.save(user);
    }
    public String loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return token;
    }
    public List<UserResponse> getUsersForAdmin(Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = admin.getOrganization().getId();

        List<User> users = userRepository.findByOrganizationId(organizationId);

        return users.stream()
        		.map(user -> new UserResponse(
        		        user.getId(),
        		        user.getUsername(),
        		        user.getEmail(),
        		        user.getContact(),
        		        user.getRole(),
        		        user.getStatus(),

        		        user.getDepartment() != null
        		                ? user.getDepartment().getId()
        		                : null,

        		        user.getDepartment() != null
        		                ? user.getDepartment().getName()
        		                : null
        		))                .toList();
    }
    public UserProfileResponse getUserProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = null;
        if (user.getOrganization() != null) {
            organizationId = user.getOrganization().getId();
        }

        Long departmentId = null;
        String departmentName = null;

        if (user.getDepartment() != null) {
            departmentId = user.getDepartment().getId();
            departmentName = user.getDepartment().getName();
        }

        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getContact(),
                user.getRole(),
                user.getStatus(),
                organizationId,
                departmentId,
                departmentName
        );
    }
    public UserProfileResponse updateUserStatus(Long userId, Boolean status,
            Authentication authentication){

String adminEmail = authentication.getName();

User admin = userRepository.findByEmail(adminEmail)
.orElseThrow(() -> new RuntimeException("Admin not found"));

User user = userRepository.findById(userId)
.orElseThrow(() -> new RuntimeException("User not found"));

// Make sure admin can modify only users in the same organization
if (!user.getOrganization().getId()
.equals(admin.getOrganization().getId())) {
throw new RuntimeException("Access denied");
}

user.setStatus(status);

User savedUser = userRepository.save(user);

return new UserProfileResponse(
        savedUser.getId(),
        savedUser.getUsername(),
        savedUser.getEmail(),
        savedUser.getContact(),
        savedUser.getRole(),
        savedUser.getStatus(),
        savedUser.getOrganization().getId(),
        savedUser.getDepartment() != null
                ? savedUser.getDepartment().getId()
                : null,
        savedUser.getDepartment() != null
                ? savedUser.getDepartment().getName()
                : null
);
}
    public User assignDepartment1(Long userId, Long departmentId,
            Authentication authentication) {

String adminEmail = authentication.getName();

User admin = userRepository.findByEmail(adminEmail)
.orElseThrow(() -> new RuntimeException("Admin not found"));

User user = userRepository.findById(userId)
.orElseThrow(() -> new RuntimeException("User not found"));

// User must belong to the admin's organization
if (!user.getOrganization().getId()
.equals(admin.getOrganization().getId())) {
throw new RuntimeException("Access denied");
}


if (user.getDepartment() != null &&
!user.getDepartment().getOrganization().getId()
.equals(admin.getOrganization().getId())) {
throw new RuntimeException("Invalid department");
}

return userRepository.save(user);
}
    public UserProfileResponse assignDepartment(Long userId, Long departmentId,
            Authentication authentication) {

String adminEmail = authentication.getName();

User admin = userRepository.findByEmail(adminEmail)
.orElseThrow(() -> new RuntimeException("Admin not found"));

User user = userRepository.findById(userId)
.orElseThrow(() -> new RuntimeException("User not found"));

// Check user belongs to admin's organization
if (!user.getOrganization().getId()
.equals(admin.getOrganization().getId())) {
throw new RuntimeException("Access denied");
}

Department department = departmentRepository.findById(departmentId)
.orElseThrow(() -> new RuntimeException("Department not found"));

// Check department belongs to admin's organization
if (!department.getOrganization().getId()
.equals(admin.getOrganization().getId())) {
throw new RuntimeException("Invalid department");
}

user.setDepartment(department);

User savedUser = userRepository.save(user);

return new UserProfileResponse(
        savedUser.getId(),
        savedUser.getUsername(),
        savedUser.getEmail(),
        savedUser.getContact(),
        savedUser.getRole(),
        savedUser.getStatus(),
        savedUser.getOrganization().getId(),
        savedUser.getDepartment() != null
                ? savedUser.getDepartment().getId()
                : null,
        savedUser.getDepartment() != null
                ? savedUser.getDepartment().getName()
                : null
);}
}