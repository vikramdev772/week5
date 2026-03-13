package com.example.formapp.service;

import com.example.formapp.model.FormData;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExportService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private PDFExportService pdfExportService;

    public byte[] exportToExcel(List<FormData> formDataList) throws IOException {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Create sheet
            Sheet sheet = workbook.createSheet("Student Projects Evaluation");

            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Name", "Abstract Name", "Frontend URL", "Backend URL", "Created At"};
            
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Create data rows
            CellStyle dateStyle = workbook.createCellStyle();
            CreationHelper createHelper = workbook.getCreationHelper();
            dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-mm-dd hh:mm:ss"));
            
            // Create URL style for better formatting
            CellStyle urlStyle = workbook.createCellStyle();
            Font urlFont = workbook.createFont();
            urlFont.setColor(IndexedColors.BLUE.getIndex());
            urlFont.setUnderline(Font.U_SINGLE);
            urlStyle.setFont(urlFont);

            int rowNum = 1;
            for (FormData data : formDataList) {
                Row row = sheet.createRow(rowNum++);
                
                // ID
                row.createCell(0).setCellValue(data.getId());
                
                // Name
                row.createCell(1).setCellValue(data.getName() != null ? data.getName() : "N/A");
                
                // Abstract Name
                row.createCell(2).setCellValue(data.getAbstractName() != null ? data.getAbstractName() : "N/A");
                
                // Frontend URL
                Cell frontendUrlCell = row.createCell(3);
                frontendUrlCell.setCellValue(data.getFrontendUrl() != null ? data.getFrontendUrl() : "N/A");
                frontendUrlCell.setCellStyle(urlStyle);
                
                // Backend URL
                Cell backendUrlCell = row.createCell(4);
                backendUrlCell.setCellValue(data.getBackendUrl() != null ? data.getBackendUrl() : "N/A");
                backendUrlCell.setCellStyle(urlStyle);
                
                // Created At
                if (data.getCreatedAt() != null) {
                    Cell dateCell = row.createCell(5);
                    dateCell.setCellValue(data.getCreatedAt().format(DATE_FORMATTER));
                    dateCell.setCellStyle(dateStyle);
                } else {
                    row.createCell(5).setCellValue("N/A");
                }
            }

            // Auto-size columns with minimum width
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
                // Set minimum width for better readability
                if (sheet.getColumnWidth(i) < 3000) {
                    sheet.setColumnWidth(i, 3000);
                }
                // Set larger width for URL columns
                if (i == 3 || i == 4) { // Frontend, Backend URLs
                    sheet.setColumnWidth(i, 6000);
                }
            }

            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    public byte[] exportToPdf(List<FormData> formDataList) throws Exception {
        try {
            return pdfExportService.generatePDFReport(formDataList);
        } catch (Exception e) {
            throw new Exception("PDF export failed: " + e.getMessage(), e);
        }
    }
}
