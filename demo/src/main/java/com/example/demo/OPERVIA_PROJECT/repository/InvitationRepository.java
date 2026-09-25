package com.example.demo.OPERVIA_PROJECT.repository;

import com.example.demo.OPERVIA_PROJECT.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    Optional<Invitation> findByToken(String token);
}