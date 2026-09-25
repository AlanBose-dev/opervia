package com.example.demo.OPERVIA_PROJECT.service;

import com.example.demo.OPERVIA_PROJECT.dto.RequestSearchRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestSearchResponse;
import com.example.demo.OPERVIA_PROJECT.repository.specification.RequestSpecification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryChangeRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryChangeResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestDashboardResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestResponse;
import com.example.demo.OPERVIA_PROJECT.entity.Request;
import com.example.demo.OPERVIA_PROJECT.entity.RequestCategory;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.RequestCategoryRepository;
import com.example.demo.OPERVIA_PROJECT.repository.RequestRepository;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.util.RequestStatus;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final RequestCategoryRepository requestCategoryRepository;
    private final AuditHistoryService auditHistoryService;

    public RequestService(
            RequestRepository requestRepository,
            UserRepository userRepository,
            RequestCategoryRepository requestCategoryRepository,
            AuditHistoryService auditHistoryService) {

        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.requestCategoryRepository = requestCategoryRepository;
        this.auditHistoryService = auditHistoryService;
    }

    public RequestResponse createRequest(
            Request request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequestCategory category = requestCategoryRepository
                .findById(request.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Make sure category belongs to user's organization
        if (!category.getOrganization().getId()
                .equals(user.getOrganization().getId())) {

            throw new RuntimeException("Invalid category");
        }

        request.setCategory(category);

        // Set requester automatically
        request.setCreatedBy(user);

        // Set organization automatically
        request.setOrganization(user.getOrganization());

        // Default status
        request.setStatus("OPEN");

        LocalDateTime now = LocalDateTime.now();

        request.setCreatedAt(now);
        request.setUpdatedAt(now);

        Request savedRequest = requestRepository.save(request);

        return new RequestResponse(
                savedRequest.getId(),
                savedRequest.getTitle(),
                savedRequest.getDescription(),
                savedRequest.getCategory().getId(),
                savedRequest.getCategory().getName(),
                savedRequest.getPriority(),
                savedRequest.getStatus(),
                savedRequest.getCreatedBy().getId(),
                savedRequest.getCreatedBy().getUsername(),
                savedRequest.getOrganization().getId(),

                savedRequest.getCreatedBy().getDepartment() != null
                        ? savedRequest.getCreatedBy().getDepartment().getId()
                        : null,

                savedRequest.getCreatedBy().getDepartment() != null
                        ? savedRequest.getCreatedBy().getDepartment().getName()
                        : null,

                savedRequest.getCreatedAt(),
                savedRequest.getUpdatedAt()
        );
    }

    public List<RequestResponse> getRequestsForUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = user.getOrganization().getId();
        Long userId = user.getId();

        List<Request> requests =
                requestRepository.findByOrganizationIdAndCreatedById(
                        organizationId,
                        userId
                );

        return requests.stream()
                .map(request -> new RequestResponse(
                        request.getId(),
                        request.getTitle(),
                        request.getDescription(),
                        request.getCategory().getId(),
                        request.getCategory().getName(),
                        request.getPriority(),
                        request.getStatus(),
                        request.getCreatedBy().getId(),
                        request.getCreatedBy().getUsername(),
                        request.getOrganization().getId(),

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getId()
                                : null,

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getName()
                                : null,

                        request.getCreatedAt(),
                        request.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }

    public RequestResponse updateRequestStatus(
            Long requestId,
            RequestStatus newStatus,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // User can only access requests from their organization
        if (!request.getOrganization().getId()
                .equals(user.getOrganization().getId())) {

            throw new RuntimeException("Access denied");
        }

        // User can modify only their own request
        if (!request.getCreatedBy().getId().equals(user.getId())
                && !"ADMIN".equals(user.getRole())) {

            throw new RuntimeException("Access denied");
        }

        RequestStatus currentStatus =
                RequestStatus.valueOf(request.getStatus());

        boolean validTransition = false;

        if (currentStatus == RequestStatus.OPEN
                && newStatus == RequestStatus.IN_PROGRESS) {

            validTransition = true;

        } else if (currentStatus == RequestStatus.IN_PROGRESS
                && newStatus == RequestStatus.RESOLVED) {

            validTransition = true;

        } else if (currentStatus == RequestStatus.RESOLVED
                && newStatus == RequestStatus.CLOSED) {

            validTransition = true;

        } else if (currentStatus == RequestStatus.RESOLVED
                && newStatus == RequestStatus.REOPENED) {

            validTransition = true;

        } else if (currentStatus == RequestStatus.REOPENED
                && newStatus == RequestStatus.IN_PROGRESS) {

            validTransition = true;
        }

        if (!validTransition) {
            throw new RuntimeException(
                    "Invalid status transition: "
                            + currentStatus
                            + " -> "
                            + newStatus
            );
        }

        String oldStatus = request.getStatus();

        request.setStatus(newStatus.name());
        request.setUpdatedAt(LocalDateTime.now());

        Request savedRequest = requestRepository.save(request);

        auditHistoryService.saveHistory(
                savedRequest.getId(),
                "STATUS_CHANGE",
                oldStatus,
                savedRequest.getStatus(),
                authentication
        );

        return new RequestResponse(
                savedRequest.getId(),
                savedRequest.getTitle(),
                savedRequest.getDescription(),
                savedRequest.getCategory().getId(),
                savedRequest.getCategory().getName(),
                savedRequest.getPriority(),
                savedRequest.getStatus(),
                savedRequest.getCreatedBy().getId(),
                savedRequest.getCreatedBy().getUsername(),
                savedRequest.getOrganization().getId(),

                savedRequest.getCreatedBy().getDepartment() != null
                        ? savedRequest.getCreatedBy().getDepartment().getId()
                        : null,

                savedRequest.getCreatedBy().getDepartment() != null
                        ? savedRequest.getCreatedBy().getDepartment().getName()
                        : null,

                savedRequest.getCreatedAt(),
                savedRequest.getUpdatedAt()
        );
    }

    public RequestCategoryChangeResponse updateRequestCategory(
            Long requestId,
            RequestCategoryChangeRequest categoryChangeRequest,
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

        // User can modify only their own request
        if (!request.getCreatedBy().getId().equals(user.getId())
                && !"ADMIN".equals(user.getRole())) {

            throw new RuntimeException("Access denied");
        }

        RequestCategory oldCategory = request.getCategory();

        RequestCategory newCategory = requestCategoryRepository
                .findById(categoryChangeRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // New category must belong to the same organization
        if (!newCategory.getOrganization().getId()
                .equals(user.getOrganization().getId())) {

            throw new RuntimeException("Invalid category");
        }

        // Don't allow changing to the same category
        if (oldCategory.getId().equals(newCategory.getId())) {

            throw new RuntimeException("Category is already assigned");
        }

        request.setCategory(newCategory);
        request.setUpdatedAt(LocalDateTime.now());

        Request savedRequest = requestRepository.save(request);

        // Record category change in audit history
        auditHistoryService.saveHistory(
                savedRequest.getId(),
                "CATEGORY_CHANGE",
                oldCategory.getName(),
                newCategory.getName(),
                authentication
        );

        return new RequestCategoryChangeResponse(
                savedRequest.getId(),
                oldCategory.getName(),
                newCategory.getName(),
                savedRequest.getUpdatedAt()
        );
    }

    public RequestSearchResponse searchRequests(
            RequestSearchRequest filter,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getSize()
        );

        Page<Request> requestPage = requestRepository.findAll(
                RequestSpecification.search(
                        user.getOrganization().getId(),
                        user.getId(),
                        filter
                ),
                pageable
        );

        List<RequestResponse> requests = requestPage.getContent()
                .stream()
                .map(request -> new RequestResponse(
                        request.getId(),
                        request.getTitle(),
                        request.getDescription(),
                        request.getCategory().getId(),
                        request.getCategory().getName(),
                        request.getPriority(),
                        request.getStatus(),
                        request.getCreatedBy().getId(),
                        request.getCreatedBy().getUsername(),
                        request.getOrganization().getId(),

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getId()
                                : null,

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getName()
                                : null,

                        request.getCreatedAt(),
                        request.getUpdatedAt()
                ))
                .toList();

        return new RequestSearchResponse(
                requests,
                requestPage.getNumber(),
                requestPage.getSize(),
                requestPage.getTotalElements(),
                requestPage.getTotalPages()
        );
    }

    public List<RequestResponse> getRequestsForAdmin(
            Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("Access denied");
        }

        Long organizationId = admin.getOrganization().getId();

        List<Request> requests =
                requestRepository.findByOrganizationId(organizationId);

        return requests.stream()
                .map(request -> new RequestResponse(
                        request.getId(),
                        request.getTitle(),
                        request.getDescription(),
                        request.getCategory().getId(),
                        request.getCategory().getName(),
                        request.getPriority(),
                        request.getStatus(),
                        request.getCreatedBy().getId(),
                        request.getCreatedBy().getUsername(),
                        request.getOrganization().getId(),

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getId()
                                : null,

                        request.getCreatedBy().getDepartment() != null
                                ? request.getCreatedBy().getDepartment().getName()
                                : null,

                        request.getCreatedAt(),
                        request.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }

    public RequestDashboardResponse getDashboard(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = user.getOrganization().getId();
        Long userId = user.getId();

        long totalRequests =
                requestRepository.countByOrganizationIdAndCreatedById(
                        organizationId,
                        userId
                );

        long openRequests =
                requestRepository.countByOrganizationIdAndCreatedByIdAndStatus(
                        organizationId,
                        userId,
                        "OPEN"
                );

        long inProgressRequests =
                requestRepository.countByOrganizationIdAndCreatedByIdAndStatus(
                        organizationId,
                        userId,
                        "IN_PROGRESS"
                );

        long resolvedRequests =
                requestRepository.countByOrganizationIdAndCreatedByIdAndStatus(
                        organizationId,
                        userId,
                        "RESOLVED"
                );

        long closedRequests =
                requestRepository.countByOrganizationIdAndCreatedByIdAndStatus(
                        organizationId,
                        userId,
                        "CLOSED"
                );

        long reopenedRequests =
                requestRepository.countByOrganizationIdAndCreatedByIdAndStatus(
                        organizationId,
                        userId,
                        "REOPENED"
                );

        return new RequestDashboardResponse(
                totalRequests,
                openRequests,
                inProgressRequests,
                resolvedRequests,
                closedRequests,
                reopenedRequests
        );
    }

    public RequestResponse getRequestById(
            Long requestId,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Organization isolation
        if (!request.getOrganization().getId()
                .equals(user.getOrganization().getId())) {

            throw new RuntimeException("Access denied");
        }

        // User can view only their own request
        if (!request.getCreatedBy().getId()
                .equals(user.getId())) {

            throw new RuntimeException("Access denied");
        }

        return new RequestResponse(
                request.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getCategory().getId(),
                request.getCategory().getName(),
                request.getPriority(),
                request.getStatus(),
                request.getCreatedBy().getId(),
                request.getCreatedBy().getUsername(),
                request.getOrganization().getId(),

                request.getCreatedBy().getDepartment() != null
                        ? request.getCreatedBy().getDepartment().getId()
                        : null,

                request.getCreatedBy().getDepartment() != null
                        ? request.getCreatedBy().getDepartment().getName()
                        : null,

                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }

    public List<RequestCategory> getCategoriesForUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = user.getOrganization().getId();

        return requestCategoryRepository
                .findByOrganizationIdAndActiveTrue(organizationId);
    }
}