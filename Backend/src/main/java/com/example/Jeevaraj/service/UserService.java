package com.example.Jeevaraj.service;

import com.example.Jeevaraj.entity.User;
import com.example.Jeevaraj.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// add this import 👇
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.*;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        com.example.Jeevaraj.entity.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(
                        user.getRoles().stream()
                                .map(role -> "ROLE_" + role.getName())
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList())
                )
                .build();

    }

    public com.example.Jeevaraj.entity.User register(String username, String password) {
        com.example.Jeevaraj.entity.User user = new com.example.Jeevaraj.entity.User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }
}
