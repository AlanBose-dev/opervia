package com.example.demo.OPERVIA_PROJECT.repository.specification;

import com.example.demo.OPERVIA_PROJECT.dto.RequestSearchRequest;
import com.example.demo.OPERVIA_PROJECT.entity.Request;

import org.springframework.data.jpa.domain.Specification;

public class RequestSpecification {

    public static Specification<Request> search(
            Long organizationId,
            Long userId,
            RequestSearchRequest filter) {

        return (root, query, criteriaBuilder) -> {

            var predicates = criteriaBuilder.conjunction();

            // Organization isolation
            predicates = criteriaBuilder.and(
                    predicates,
                    criteriaBuilder.equal(
                            root.get("organization").get("id"),
                            organizationId
                    )
            );

            // User isolation
            predicates = criteriaBuilder.and(
                    predicates,
                    criteriaBuilder.equal(
                            root.get("createdBy").get("id"),
                            userId
                    )
            );

            // Keyword search
            if (filter.getKeyword() != null
                    && !filter.getKeyword().isBlank()) {

                String keyword =
                        "%" + filter.getKeyword().toLowerCase() + "%";

                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.or(
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(
                                                root.get("title")
                                        ),
                                        keyword
                                ),
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(
                                                root.get("description")
                                        ),
                                        keyword
                                )
                        )
                );
            }

            // Category filter
            if (filter.getCategoryId() != null) {

                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                root.get("category").get("id"),
                                filter.getCategoryId()
                        )
                );
            }

            // Status filter
            if (filter.getStatus() != null
                    && !filter.getStatus().isBlank()) {

                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                root.get("status"),
                                filter.getStatus()
                        )
                );
            }

            // Priority filter
            if (filter.getPriority() != null
                    && !filter.getPriority().isBlank()) {

                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                root.get("priority"),
                                filter.getPriority()
                        )
                );
            }

            return predicates;
        };
    }
}