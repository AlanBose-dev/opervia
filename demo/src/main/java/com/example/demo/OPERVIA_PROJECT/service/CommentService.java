package com.example.demo.OPERVIA_PROJECT.service;

import org.springframework.stereotype.Service;

import com.example.demo.OPERVIA_PROJECT.dto.CommentResponse;
import com.example.demo.OPERVIA_PROJECT.entity.Comment;
import com.example.demo.OPERVIA_PROJECT.entity.Request;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import org.springframework.security.core.Authentication;
import java.time.LocalDateTime;
import com.example.demo.OPERVIA_PROJECT.repository.CommentRepository;
import com.example.demo.OPERVIA_PROJECT.repository.RequestRepository;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;

@Service
public class CommentService {
	private final CommentRepository commentRepository;
	private final RequestRepository requestRepository;
	private final UserRepository userRepository;
	
	public CommentService(
	        CommentRepository commentRepository,
	        RequestRepository requestRepository,
	        UserRepository userRepository) {

	    this.commentRepository = commentRepository;
	    this.requestRepository = requestRepository;
	    this.userRepository = userRepository;
	}

	public CommentRepository getCommentRepository() {
		return commentRepository;
	}

	public RequestRepository getRequestRepository() {
		return requestRepository;
	}

	public UserRepository getUserRepository() {
		return userRepository;
	}
	
	public CommentResponse addComment(Long requestId, String content,
	        Authentication authentication) {

	    String email = authentication.getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Request request = requestRepository.findById(requestId)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    // User can comment only on requests from their organization
	    if (!request.getOrganization().getId()
	            .equals(user.getOrganization().getId())) {

	        throw new RuntimeException("Access denied");
	    }

	    Comment comment = new Comment();

	    comment.setRequest(request);
	    comment.setUser(user);
	    comment.setContent(content);
	    comment.setCreatedAt(LocalDateTime.now());

	    Comment savedComment = commentRepository.save(comment);

	    return new CommentResponse(
	            savedComment.getId(),
	            savedComment.getRequest().getId(),
	            savedComment.getUser().getId(),
	            savedComment.getUser().getUsername(),
	            savedComment.getContent(),
	            savedComment.getCreatedAt()
	    );
	}

}