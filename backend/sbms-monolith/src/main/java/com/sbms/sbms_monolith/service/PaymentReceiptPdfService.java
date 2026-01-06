package com.sbms.sbms_monolith.service;


import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.sbms.sbms_monolith.model.PaymentTransaction;
import com.sbms.sbms_monolith.model.Registration;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.time.format.DateTimeFormatter;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PaymentReceiptPdfService {

    public byte[] generateReceipt(PaymentTransaction tx) {

        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("SMART BOARDING MANAGEMENT SYSTEM"));
            document.add(new Paragraph("Payment Receipt"));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Transaction Ref: " + tx.getTransactionRef()));
            document.add(new Paragraph("Amount: LKR " + tx.getAmount()));
            document.add(new Paragraph("Payment Method: " + tx.getMethod()));
            document.add(new Paragraph("Status: " + tx.getStatus()));
            document.add(new Paragraph("Date: " + tx.getCreatedAt()));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Thank you for your payment."));

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate receipt PDF", e);
        }
    }

    public byte[] generateRegistrationReceipt(Registration reg) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);

            document.open();

            // 1. ADD LOGO
            try {
                // Looks for logo.png in src/main/resources/
                URL logoUrl = getClass().getResource("/logo.png");
                if (logoUrl != null) {
                    Image logo = Image.getInstance(logoUrl);
                    logo.scaleToFit(120, 60); // Resize width/height
                    logo.setAlignment(Element.ALIGN_CENTER);
                    document.add(logo);
                    document.add(new Paragraph("\n")); // Space after logo
                }
            } catch (Exception e) {
                System.err.println("Warning: Logo not found or could not be loaded.");
            }

            // Fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);
            Font amountFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);

            // 2. Header Text
            Paragraph title = new Paragraph("OFFICIAL KEY MONEY RECEIPT", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Paragraph subtitle = new Paragraph("Smart Boarding Management System", normalFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            document.add(subtitle);
            document.add(new Paragraph("\n"));

            // 3. Transaction Details
            PdfPTable txnTable = new PdfPTable(2);
            txnTable.setWidthPercentage(100);
            txnTable.setSpacingAfter(10f);

            addSimpleRow(txnTable, "Receipt No:", "REC-" + reg.getId(), headerFont, normalFont);
            addSimpleRow(txnTable, "Date:", reg.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")), headerFont, normalFont);
            addSimpleRow(txnTable, "Transaction Ref:", reg.getPaymentTransactionRef(), headerFont, normalFont);
            addSimpleRow(txnTable, "Payment Method:", "Online Card Payment", headerFont, normalFont);

            document.add(txnTable);
            document.add(new Paragraph("---------------------------------------------------------------------------------------"));

            // 4. Student & Boarding Info
            document.add(new Paragraph("Property & Tenant Details\n", headerFont));

            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setSpacingBefore(5f);

            addSimpleRow(infoTable, "Property Name:", reg.getBoarding().getTitle(), headerFont, normalFont);
            addSimpleRow(infoTable, "Owner Name:", reg.getBoarding().getOwner().getFullName(), headerFont, normalFont);
            addSimpleRow(infoTable, "Student Name:", reg.getStudent().getFullName(), headerFont, normalFont);
            addSimpleRow(infoTable, "Student Phone:", reg.getStudent().getPhone(), headerFont, normalFont);

            document.add(infoTable);
            document.add(new Paragraph("\n"));

            // 5. Agreement Details (From Form)
            document.add(new Paragraph("Rental Agreement Details\n", headerFont));

            PdfPTable agreeTable = new PdfPTable(2);
            agreeTable.setWidthPercentage(100);
            agreeTable.setSpacingBefore(5f);

            addRows(agreeTable, "Move-in Date", reg.getMoveInDate() != null ? reg.getMoveInDate().toString() : "N/A");
            addRows(agreeTable, "Agreement Period", reg.getContractDuration());
            addRows(agreeTable, "Emergency Contact", reg.getEmergencyContactName() + "\n" + reg.getEmergencyContactPhone());
            addRows(agreeTable, "Special Notes", reg.getSpecialRequirements() == null || reg.getSpecialRequirements().isEmpty() ? "None" : reg.getSpecialRequirements());

            document.add(agreeTable);

            // 6. Total Amount
            document.add(new Paragraph("\n"));
            PdfPTable amountTable = new PdfPTable(1);
            amountTable.setWidthPercentage(100);

            PdfPCell amountCell = new PdfPCell(new Phrase("TOTAL PAID: LKR " + reg.getBoarding().getKeyMoney(), amountFont));
            amountCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            amountCell.setBorder(Rectangle.NO_BORDER);
            amountCell.setPaddingTop(10f);
            amountTable.addCell(amountCell);

            document.add(amountTable);

            // 7. Footer
            document.add(new Paragraph("\n\n"));
            Paragraph footer = new Paragraph("This is a computer-generated receipt and requires no physical signature.\nWelcome to your new home!", FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 8, BaseColor.GRAY));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error creating Registration PDF", e);
        }
    }

    private void addRows(PdfPTable table, String header, String value) {
        PdfPCell headerCell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10)));
        headerCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        headerCell.setPadding(5f);

        PdfPCell valueCell = new PdfPCell(new Phrase(value, FontFactory.getFont(FontFactory.HELVETICA, 10)));
        valueCell.setPadding(5f);

        table.addCell(headerCell);
        table.addCell(valueCell);
    }

    private void addSimpleRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, labelFont));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPaddingBottom(5f);

        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPaddingBottom(5f);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

}
