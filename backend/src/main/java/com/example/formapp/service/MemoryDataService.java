package com.example.formapp.service;

import com.example.formapp.model.FormData;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class MemoryDataService {
    
    private final List<FormData> formDataList = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);
    private static boolean sampleDataInitialized = false;
    
    public MemoryDataService() {
        // Initialize with sample data only once
        if (!sampleDataInitialized) {
            initializeSampleData();
            sampleDataInitialized = true;
        }
    }
    
    private void initializeSampleData() {
        // Add sample data for testing
        FormData sample1 = new FormData();
        sample1.setId(idCounter.getAndIncrement());
        sample1.setName("John Doe");
        sample1.setRollNo("CS2021001");
        sample1.setBranch("Computer Science");
        sample1.setSection("A");
        sample1.setAbstractName("E-Learning Platform");
        sample1.setFrontendUrl("https://example.com/frontend");
        sample1.setBackendUrl("https://api.example.com");
        sample1.setGithubUrl("https://github.com/johndoe");
        sample1.setCreatedAt(LocalDateTime.now().minusDays(2));
        formDataList.add(sample1);
        
        FormData sample2 = new FormData();
        sample2.setId(idCounter.getAndIncrement());
        sample2.setName("Jane Smith");
        sample2.setRollNo("IT2022002");
        sample2.setBranch("Information Technology");
        sample2.setSection("B");
        sample2.setAbstractName("Task Management System");
        sample2.setFrontendUrl("https://taskapp.com");
        sample2.setBackendUrl("https://api.taskapp.com");
        sample2.setGithubUrl("https://github.com/janesmith");
        sample2.setCreatedAt(LocalDateTime.now().minusDays(1));
        formDataList.add(sample2);
        
        FormData sample3 = new FormData();
        sample3.setId(idCounter.getAndIncrement());
        sample3.setName("Mike Johnson");
        sample3.setRollNo("EC2023003");
        sample3.setBranch("Electronics");
        sample3.setSection("C");
        sample3.setAbstractName("IoT Smart Home");
        sample3.setFrontendUrl("https://smarthome.io");
        sample3.setBackendUrl("https://api.smarthome.io");
        sample3.setGithubUrl(null); // No GitHub URL
        sample3.setCreatedAt(LocalDateTime.now().minusHours(12));
        formDataList.add(sample3);
    }
    
    public FormData save(FormData formData) {
        if (formData.getId() == null) {
            formData.setId(idCounter.getAndIncrement());
            formData.setCreatedAt(LocalDateTime.now());
            formDataList.add(formData);
        } else {
            // Update existing
            formDataList.removeIf(data -> data.getId().equals(formData.getId()));
            formDataList.add(formData);
        }
        return formData;
    }
    
    public List<FormData> findAll() {
        return new ArrayList<>(formDataList);
    }
    
    public List<FormData> findAllOrderByCreatedAtDesc() {
        return new ArrayList<>(formDataList.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList());
    }
    
    public FormData findById(Long id) {
        return formDataList.stream()
                .filter(data -> data.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    
    public void deleteById(Long id) {
        formDataList.removeIf(data -> data.getId().equals(id));
    }
    
    public List<FormData> searchByKeyword(String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return new ArrayList<>(formDataList.stream()
                .filter(data -> 
                    data.getName().toLowerCase().contains(lowerKeyword) ||
                    data.getRollNo().toLowerCase().contains(lowerKeyword) ||
                    data.getBranch().toLowerCase().contains(lowerKeyword) ||
                    data.getSection().toLowerCase().contains(lowerKeyword) ||
                    data.getAbstractName().toLowerCase().contains(lowerKeyword))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList());
    }
    
    public long count() {
        return formDataList.size();
    }
}
