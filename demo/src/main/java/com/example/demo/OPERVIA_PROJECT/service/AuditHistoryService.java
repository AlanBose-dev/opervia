package com.example.demo.OPERVIA_PROJECT.service;

import org.springframework.stereotype.Service;
import com.example.demo.OPERVIA_PROJECT.dto.AuditHistoryResponse;
import com.example.demo.OPERVIA_PROJECT.entity.AuditHistory;
import com.example.demo.OPERVIA_PROJECT.entity.Request;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import org.springframework.security.core.Authentication;
import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.OPERVIA_PROJECT.repository.AuditHistoryRepository;
import com.example.demo.OPERVIA_PROJECT.repository.RequestRepository;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;

@Service
public class AuditHistoryService {
	private final AuditHistoryRepository auditHistoryRepository;
	private final RequestRepository requestRepository;
	private final UserRepository userRepository;
	public AuditHistoryService(
	        AuditHistoryRepository auditHistoryRepository,
	        RequestRepository requestRepository,
	        UserRepository userRepository) {

	    this.auditHistoryRepository = auditHistoryRepository;
	    this.requestRepository = requestRepository;
	    this.userRepository = userRepository;
	}
	public AuditHistoryRepository getAuditHistoryRepository() {
		return auditHistoryRepository;
	}
	public RequestRepository getRequestRepository() {
		return requestRepository;
	}
	public UserRepository getUserRepository() {
		return userRepository;
	}
	public AuditHistoryResponse saveHistory(
	        Long requestId,
	        String action,
	        String oldValue,
	        String newValue,
	        Authentication authentication) {

	    String email = authentication.getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Request request = requestRepository.findById(requestId)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    // User must belong to the same organization as the request
	    if (!request.getOrganization().getId()
	            .equals(user.getOrganization().getId())) {

	        throw new RuntimeException("Access denied");
	    }

	    AuditHistory history = new AuditHistory();

	    history.setRequest(request);
	    history.setUser(user);
	    history.setAction(action);
	    history.setOldValue(oldValue);
	    history.setNewValue(newValue);
	    history.setCreatedAt(LocalDateTime.now());

	    AuditHistory savedHistory =
	            auditHistoryRepository.save(history);

	    return new AuditHistoryResponse(
	            savedHistory.getId(),
	            savedHistory.getRequest().getId(),
	            savedHistory.getUser().getId(),
	            savedHistory.getUser().getUsername(),
	            savedHistory.getAction(),
	            savedHistory.getOldValue(),
	            savedHistory.getNewValue(),
	            savedHistory.getCreatedAt()
	    );
	}
	public List<AuditHistoryResponse> getHistory(
	        Long requestId,
	        Authentication authentication) {

	    String email = authentication.getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Request request = requestRepository.findById(requestId)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    // Request must belong to user's organization
	    if (!request.getOrganization().getId()
	            .equals(user.getOrganization().getId())) {

	        throw new RuntimeException("Access denied");
	    }

	    List<AuditHistory> historyList =
	            auditHistoryRepository
	                    .findByRequestIdOrderByCreatedAtAsc(requestId);

	    return historyList.stream()
	            .map(history -> new AuditHistoryResponse(
	                    history.getId(),
	                    history.getRequest().getId(),
	                    history.getUser().getId(),
	                    history.getUser().getUsername(),
	                    history.getAction(),
	                    history.getOldValue(),
	                    history.getNewValue(),
	                    history.getCreatedAt()
	            ))
	            .toList();
	}
}