package com.example.formapp.repository;

import com.example.formapp.model.FormData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FormDataRepository extends JpaRepository<FormData, Long> {
    
    List<FormData> findByOrderByCreatedAtDesc();
    
    @Query("SELECT f FROM FormData f WHERE " +
           "LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.rollNo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.branch) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.section) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.abstractName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.frontendUrl) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.backendUrl) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.githubUrl) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY f.createdAt DESC")
    List<FormData> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT f FROM FormData f WHERE f.createdAt >= :since ORDER BY f.createdAt DESC")
    List<FormData> findRecentEntries(@Param("since") LocalDateTime since);
}
