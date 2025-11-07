package com.example.Jeevaraj.controller;

import com.example.Jeevaraj.entity.*;
import com.example.Jeevaraj.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    @Autowired
    private AuditLogRepository auditRepo;

    @GetMapping("/logs")
    public List<AuditLog> getAllLogs() {
        return auditRepo.findAll();
    }
}
