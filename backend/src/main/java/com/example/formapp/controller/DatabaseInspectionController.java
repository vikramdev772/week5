package com.example.formapp.controller;

import com.example.formapp.model.FormData;
import com.example.formapp.repository.FormDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class DatabaseInspectionController {

    @Autowired
    private FormDataRepository formDataRepository;

    @GetMapping("/inspect-db")
    public String inspectDatabase(Model model) {
        try {
            // Get all records
            List<FormData> allRecords = formDataRepository.findAll();
            
            System.out.println("=== DATABASE INSPECTION ===");
            System.out.println("Total records in database: " + allRecords.size());
            
            // Print details of each record
            for (int i = 0; i < allRecords.size(); i++) {
                FormData data = allRecords.get(i);
                System.out.println("Record " + (i + 1) + ":");
                System.out.println("  ID: " + data.getId());
                System.out.println("  Name: " + data.getName());
                System.out.println("  Abstract Name: " + data.getAbstractName());
                System.out.println("  Frontend URL: " + data.getFrontendUrl());
                System.out.println("  Backend URL: " + data.getBackendUrl());
                System.out.println("  Created At: " + data.getCreatedAt());
                System.out.println("  ---");
            }
            
            // Add data to model for display
            model.addAttribute("allRecords", allRecords);
            model.addAttribute("totalRecords", allRecords.size());
            
            return "database-inspection";
            
        } catch (Exception e) {
            System.err.println("ERROR inspecting database: " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("error", "Error inspecting database: " + e.getMessage());
            return "database-inspection";
        }
    }
}
