package com.example.demo.OPERVIA_PROJECT.controller;

import com.example.demo.OPERVIA_PROJECT.dto.CommentResponse;
import com.example.demo.OPERVIA_PROJECT.service.CommentService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/requests")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{requestId}/comments")
    public CommentResponse addComment(
            @PathVariable Long requestId,
            @RequestParam String content,
            Authentication authentication) {

        return commentService.addComment(
                requestId, content, authentication);
    }
}