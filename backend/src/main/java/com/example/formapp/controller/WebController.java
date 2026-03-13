package com.example.formapp.controller;

import com.example.formapp.model.FormData;
import com.example.formapp.repository.FormDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WebController {

    @Autowired
    private FormDataRepository formDataRepository;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/form")
    public String showForm(Model model) {
        model.addAttribute("formData", new FormData());
        model.addAttribute("title", "Projects Evaluation Form");
        return "form";
    }

    @PostMapping("/form")
    public String submitForm(@ModelAttribute FormData formData, RedirectAttributes redirectAttributes) {
        
        try {
            // Validate required fields
            if (formData.getName() == null || formData.getName().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Name is required");
                return "redirect:/form";
            }
            if (formData.getRollNo() == null || formData.getRollNo().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Roll Number is required");
                return "redirect:/form";
            }
            if (formData.getBranch() == null || formData.getBranch().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Branch is required");
                return "redirect:/form";
            }
            if (formData.getSection() == null || formData.getSection().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Section is required");
                return "redirect:/form";
            }
            if (formData.getAbstractName() == null || formData.getAbstractName().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Abstract name is required");
                return "redirect:/form";
            }
            if (formData.getFrontendUrl() == null || formData.getFrontendUrl().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Frontend URL is required");
                return "redirect:/form";
            }
            if (formData.getBackendUrl() == null || formData.getBackendUrl().trim().isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Backend URL is required");
                return "redirect:/form";
            }

            // Save the form data to PostgreSQL database
            formDataRepository.save(formData);
            
            redirectAttributes.addFlashAttribute("success", "Form submitted successfully! Your project has been saved to the database. <a href='/dashboard'>View Dashboard</a>");
            return "redirect:/form";
            
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error saving form: " + e.getMessage());
            return "redirect:/form";
        }
    }

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        try {
            List<FormData> submissions = formDataRepository.findAll();
            
            // DEBUG OUTPUT
            System.out.println("==== DATABASE DEBUG ====");
            System.out.println("List size: " + submissions.size());
            System.out.println("List isEmpty: " + submissions.isEmpty());
            System.out.println("List class: " + submissions.getClass().getName());
            System.out.println("List is null: " + (submissions == null));
            
            if(!submissions.isEmpty()) {
                FormData first = submissions.get(0);
                System.out.println("First record - ID: " + first.getId());
                System.out.println("First record - Name: " + first.getName());
                System.out.println("First record - Abstract: " + first.getAbstractName());
                System.out.println("First record - Roll No: " + first.getRollNo());
                System.out.println("First record - Branch: " + first.getBranch());
                System.out.println("First record - Section: " + first.getSection());
            } else {
                System.out.println("LIST IS EMPTY - This explains the empty table!");
            }
            
            // Add to model
            model.addAttribute("submissions", submissions);
            model.addAttribute("totalProjects", submissions.size());
            
            // Additional debug - verify model attributes
            System.out.println("==== MODEL DEBUG ====");
            System.out.println("Added 'submissions' to model: " + (submissions != null));
            System.out.println("Added 'totalProjects' to model: " + submissions.size());
            
            System.out.println("==== DEBUG END ====");
            
            return "dashboard";
            
        } catch (Exception e) {
            System.err.println("ERROR in dashboard: " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("error", "Error loading dashboard: " + e.getMessage());
            model.addAttribute("submissions", new ArrayList<>());
            model.addAttribute("totalProjects", 0);
            return "dashboard";
        }
    }

    @PostMapping("/dashboard/delete/{id}")
    public String deleteEntry(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            FormData existingData = formDataRepository.findById(id).orElse(null);
            if (existingData == null) {
                redirectAttributes.addFlashAttribute("error", "Entry not found");
                return "redirect:/dashboard";
            }
            
            formDataRepository.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Entry deleted successfully!");
            
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error deleting entry: " + e.getMessage());
        }
        
        return "redirect:/dashboard";
    }
}
