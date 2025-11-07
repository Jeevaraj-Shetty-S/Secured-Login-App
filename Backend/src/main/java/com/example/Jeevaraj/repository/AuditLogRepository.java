package com.example.Jeevaraj.repository;

import com.example.Jeevaraj.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> { }
