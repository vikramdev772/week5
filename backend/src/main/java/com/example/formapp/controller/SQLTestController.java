package com.example.formapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class SQLTestController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test-db")
    public String testDatabase(Model model) {
        try {
            // Test database connection
            Connection connection = dataSource.getConnection();
            DatabaseMetaData metaData = connection.getMetaData();
            
            System.out.println("=== DATABASE CONNECTION TEST ===");
            System.out.println("Database Product Name: " + metaData.getDatabaseProductName());
            System.out.println("Database Product Version: " + metaData.getDatabaseProductVersion());
            System.out.println("Database URL: " + metaData.getURL());
            
            // Get table information
            List<String> tables = new ArrayList<>();
            ResultSet tablesResult = metaData.getTables(null, null, "%", new String[]{"TABLE"});
            while (tablesResult.next()) {
                String tableName = tablesResult.getString("TABLE_NAME");
                tables.add(tableName);
                System.out.println("Table found: " + tableName);
            }
            
            // Test query on form_data table
            List<Map<String, Object>> records = new ArrayList<>();
            try {
                records = jdbcTemplate.queryForList("SELECT * FROM form_data ORDER BY created_at DESC");
                System.out.println("Records in form_data table: " + records.size());
                
                // Print column names and first record
                if (!records.isEmpty()) {
                    Map<String, Object> firstRecord = records.get(0);
                    System.out.println("Columns in first record: " + String.join(", ", firstRecord.keySet()));
                    System.out.println("First record data: " + firstRecord);
                }
            } catch (Exception e) {
                System.err.println("Error querying form_data table: " + e.getMessage());
                // Try form_submissions table instead
                try {
                    records = jdbcTemplate.queryForList("SELECT * FROM form_submissions ORDER BY created_at DESC");
                    System.out.println("Records in form_submissions table: " + records.size());
                    if (!records.isEmpty()) {
                        Map<String, Object> firstRecord = records.get(0);
                        System.out.println("Columns in first record: " + String.join(", ", firstRecord.keySet()));
                        System.out.println("First record data: " + firstRecord);
                    }
                } catch (Exception e2) {
                    System.err.println("Error querying form_submissions table: " + e2.getMessage());
                }
            }
            
            connection.close();
            
            // Add data to model
            model.addAttribute("databaseInfo", Map.of(
                "productName", metaData.getDatabaseProductName(),
                "productVersion", metaData.getDatabaseProductVersion(),
                "url", metaData.getURL(),
                "tables", tables
            ));
            model.addAttribute("records", records);
            model.addAttribute("recordCount", records.size());
            
            return "sql-test";
            
        } catch (Exception e) {
            System.err.println("ERROR testing database: " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("error", "Error testing database: " + e.getMessage());
            return "sql-test";
        }
    }
}
