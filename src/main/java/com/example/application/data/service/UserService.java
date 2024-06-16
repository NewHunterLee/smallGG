package com.example.application.data.service;

import com.example.application.data.entity.User;
import com.example.application.data.repository.UserRepository;
import com.vaadin.flow.server.VaadinRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService {

    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    private final UserRepository userRepository;
   

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        
    }

    public User registerUser(String userName, String password, String email) {
        logger.info("Registering user: " + userName);
        if (userRepository.findByUsername(userName).isPresent() || userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Username or email already exists");
        }

        User user = new User();
        user.setUsername(userName);
        user.setPassword(password);
        user.setEmail(email);
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User loginUser(String userName, String password) {
        logger.info("Logging in user: " + userName);
        Optional<User> userOptional = userRepository.findByUsername(userName);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (password.equals(user.getPassword())) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        userName,
                        password,
                        Collections.singletonList(() -> "ROLE_USER")
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return user;
            } else {
                throw new IllegalArgumentException("Invalid password");
            }
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found by name"+username));
    }
    public void logoutUser() {
        SecurityContextHolder.clearContext();
    }

    public String getCurrentUser() {
        return VaadinRequest.getCurrent().getUserPrincipal().getName();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User createUserIfNotExist(String username, String password, String email) {
        return userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setEmail(email);
            return userRepository.save(newUser);
        });
    }
}
