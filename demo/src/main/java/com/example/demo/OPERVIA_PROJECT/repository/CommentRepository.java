package com.example.demo.OPERVIA_PROJECT.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.OPERVIA_PROJECT.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}