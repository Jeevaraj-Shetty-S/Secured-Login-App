package com.example.Jeevaraj.service;

import com.example.Jeevaraj.entity.*;
import com.example.Jeevaraj.repository.*;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuditLogRepository auditRepo;

    public AuthService(AuthenticationManager authManager, JwtService jwtService,
                       UserRepository userRepo, PasswordEncoder encoder, AuditLogRepository auditRepo) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.auditRepo = auditRepo;
    }

    public String login(String username, String password) {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getLockUntil() != null && user.getLockUntil().isAfter(Instant.now())) {
            throw new RuntimeException("Account locked. Try later.");
        }

        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            user.setFailedAttempts(0);
            user.setLockUntil(null);
            userRepo.save(user);
            auditRepo.save(new AuditLog(){{
                setUsername(username);
                setAction("LOGIN");
            }});
            return jwtService.generateToken(username);
        } catch (BadCredentialsException e) {
            user.setFailedAttempts(user.getFailedAttempts() + 1);
            if (user.getFailedAttempts() >= 3) {
                user.setLockUntil(Instant.now().plusSeconds(300));
                auditRepo.save(new AuditLog(){{
                    setUsername(username);
                    setAction("LOCKED");
                }});
            }
            userRepo.save(user);
            throw e;
        }
    }

    public void logout(String username) {
        auditRepo.save(new AuditLog(){{
            setUsername(username);
            setAction("LOGOUT");
        }});
    }
}
