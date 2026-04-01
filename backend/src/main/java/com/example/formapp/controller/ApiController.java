package com.example.formapp.controller;

import com.example.formapp.model.FormData;
import com.example.formapp.repository.FormDataRepository;
import com.example.formapp.service.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:6060"})
public class ApiController {

    @Autowired
    private FormDataRepository formDataRepository;
    
    @Autowired
    private ExportService exportService;

    @PostMapping("/form")
    public ResponseEntity<Map<String, Object>> submitForm(@RequestBody FormData formData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (formData.getName() == null || formData.getName().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Name is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getRollNo() == null || formData.getRollNo().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Roll Number is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getBranch() == null || formData.getBranch().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Branch is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getSection() == null || formData.getSection().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Section is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getAbstractName() == null || formData.getAbstractName().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Abstract name is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getFrontendUrl() == null || formData.getFrontendUrl().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Frontend URL is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (formData.getBackendUrl() == null || formData.getBackendUrl().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Backend URL is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Save the form data to PostgreSQL database
            FormData savedData = formDataRepository.save(formData);
            
            response.put("success", true);
            response.put("message", "Form submitted successfully!");
            response.put("data", savedData);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error saving form: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData(
            @RequestParam(value = "search", required = false) String search) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<FormData> formDataList;
            
            if (search != null && !search.trim().isEmpty()) {
                formDataList = formDataRepository.searchByKeyword(search);
            } else {
                formDataList = formDataRepository.findByOrderByCreatedAtDesc();
            }
            
            // Debug: Log what we're returning
            System.out.println("=== API /dashboard DEBUG ===");
            System.out.println("Form data list size: " + formDataList.size());
            System.out.println("Form data list is empty: " + formDataList.isEmpty());
            
            if (!formDataList.isEmpty()) {
                FormData first = formDataList.get(0);
                System.out.println("First record - ID: " + first.getId());
                System.out.println("First record - Name: " + first.getName());
                System.out.println("First record - Abstract: " + first.getAbstractName());
            }
            
            response.put("success", true);
            response.put("data", formDataList);
            response.put("totalCount", formDataList.size());
            
            System.out.println("API Response - success: " + response.get("success"));
            System.out.println("API Response - data size: " + ((List<?>) response.get("data")).size());
            System.out.println("API Response - totalCount: " + response.get("totalCount"));
            System.out.println("=== API DEBUG END ===");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("ERROR in API /dashboard: " + e.getMessage());
            e.printStackTrace();
            
            response.put("success", false);
            response.put("message", "Error fetching data: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @DeleteMapping("/dashboard/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteFormData(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            FormData existingData = formDataRepository.findById(id).orElse(null);
            if (existingData == null) {
                response.put("success", false);
                response.put("message", "Entry not found");
                return ResponseEntity.notFound().build();
            }
            
            formDataRepository.deleteById(id);
            
            response.put("success", true);
            response.put("message", "Entry deleted successfully!");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting entry: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/export/excel")
    public ResponseEntity<ByteArrayResource> exportToExcel(
            @RequestParam(value = "search", required = false) String search) {
        
        try {
            List<FormData> formDataList;
            
            if (search != null && !search.trim().isEmpty()) {
                formDataList = formDataRepository.searchByKeyword(search);
            } else {
                formDataList = formDataRepository.findByOrderByCreatedAtDesc();
            }
            
            byte[] excelData = exportService.exportToExcel(formDataList);
            
            ByteArrayResource resource = new ByteArrayResource(excelData);
            
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=project_evaluations.xlsx")
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .contentLength(excelData.length)
                    .body(resource);
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<ByteArrayResource> exportToPdf(
            @RequestParam(value = "search", required = false) String search) {
        
        try {
            List<FormData> formDataList;
            
            if (search != null && !search.trim().isEmpty()) {
                formDataList = formDataRepository.searchByKeyword(search);
            } else {
                formDataList = formDataRepository.findByOrderByCreatedAtDesc();
            }
            
            byte[] pdfData = exportService.exportToPdf(formDataList);
            
            ByteArrayResource resource = new ByteArrayResource(pdfData);
            
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=student_projects_evaluation.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(pdfData.length)
                    .body(resource);
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
