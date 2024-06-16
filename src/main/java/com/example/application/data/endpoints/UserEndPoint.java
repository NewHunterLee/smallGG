package com.example.application.data.endpoints;

import com.example.application.data.entity.User;
import com.example.application.data.service.UserService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@BrowserCallable
@AnonymousAllowed
@Endpoint
public class UserEndPoint {

    @Autowired
    private UserService userService;

    public User register(String userName, String password, String email) {
        return userService.registerUser(userName, password, email);
    }

    public User login(String userName, String password) {
        return userService.loginUser(userName, password);
    }

    public Optional<User> getUserByUsername(String userName) {
        return userService.findByUsername(userName);
    }

    public void logout() {
        userService.logoutUser();
    }

    public User getUserById(Long id) {
        return userService.getUserById(id);
    }
    public String getCurrentUser() {
        return userService.getCurrentUser();
    }
}
