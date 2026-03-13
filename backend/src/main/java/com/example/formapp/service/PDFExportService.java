package com.example.formapp.service;

import com.example.formapp.model.FormData;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PDFExportService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public byte[] generatePDFReport(List<FormData> formDataList) throws Exception {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            // Create document
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Add title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.DARK_GRAY);
            Paragraph title = new Paragraph("Student Projects Evaluation Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Add generation info
            Font infoFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY);
            Paragraph info = new Paragraph(
                "Generated on: " + java.time.LocalDateTime.now().format(DATE_FORMATTER) + 
                " | Total Records: " + (formDataList != null ? formDataList.size() : 0) + 
                " | Database: PostgreSQL (NeonDB)", infoFont);
            info.setAlignment(Element.ALIGN_CENTER);
            info.setSpacingAfter(30);
            document.add(info);

            // Create table
            PdfPTable table = new PdfPTable(6); // 6 columns
            table.setWidthPercentage(100);
            table.setSpacingBefore(20f);
            table.setSpacingAfter(20f);

            // Set column widths
            float[] columnWidths = {0.5f, 1.5f, 2.0f, 2.0f, 2.0f, 1.2f};
            table.setWidths(columnWidths);

            // Add table headers
            addTableHeader(table);
            
            // Add data rows
            if (formDataList != null && !formDataList.isEmpty()) {
                for (FormData data : formDataList) {
                    addTableRow(table, data);
                }
            } else {
                PdfPCell noDataCell = new PdfPCell(new Phrase("No data found", FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.RED)));
                noDataCell.setColspan(6);
                noDataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                noDataCell.setPadding(20);
                table.addCell(noDataCell);
            }

            document.add(table);

            // Add footer
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.GRAY);
            Paragraph footer = new Paragraph(
                "Report generated successfully. All data extracted from PostgreSQL database.", footerFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            footer.setSpacingBefore(30);
            document.add(footer);

            document.close();
            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new Exception("Failed to generate PDF report: " + e.getMessage(), e);
        }
    }

    private void addTableHeader(PdfPTable table) {
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.WHITE);
        BaseColor headerColor = new BaseColor(63, 81, 181); // Material Blue

        String[] headers = {"ID", "Name", "Abstract Name", "Frontend URL", "Backend URL", "Created At"};

        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(headerColor);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(8);
            cell.setBorderColor(BaseColor.WHITE);
            table.addCell(cell);
        }
    }

    private void addTableRow(PdfPTable table, FormData data) {
        Font dataFont = FontFactory.getFont(FontFactory.HELVETICA, 8, BaseColor.DARK_GRAY);
        Font urlFont = FontFactory.getFont(FontFactory.HELVETICA, 7, BaseColor.BLUE);
        urlFont.setStyle(Font.UNDERLINE);

        // ID
        PdfPCell idCell = new PdfPCell(new Phrase(String.valueOf(data.getId()), dataFont));
        idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        idCell.setPadding(5);
        table.addCell(idCell);

        // Name
        PdfPCell nameCell = new PdfPCell(new Phrase(data.getName() != null ? data.getName() : "N/A", dataFont));
        nameCell.setPadding(5);
        table.addCell(nameCell);

        // Abstract Name
        PdfPCell abstractCell = new PdfPCell(new Phrase(data.getAbstractName() != null ? data.getAbstractName() : "N/A", dataFont));
        abstractCell.setPadding(5);
        table.addCell(abstractCell);

        // Frontend URL
        PdfPCell frontendUrlCell = new PdfPCell(new Phrase(data.getFrontendUrl() != null ? data.getFrontendUrl() : "N/A", urlFont));
        frontendUrlCell.setPadding(5);
        table.addCell(frontendUrlCell);

        // Backend URL
        PdfPCell backendUrlCell = new PdfPCell(new Phrase(data.getBackendUrl() != null ? data.getBackendUrl() : "N/A", urlFont));
        backendUrlCell.setPadding(5);
        table.addCell(backendUrlCell);

        // Created At
        PdfPCell createdAtCell = new PdfPCell(new Phrase(
            data.getCreatedAt() != null ? data.getCreatedAt().format(DATE_FORMATTER) : "N/A", dataFont));
        createdAtCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        createdAtCell.setPadding(5);
        table.addCell(createdAtCell);
    }
}
