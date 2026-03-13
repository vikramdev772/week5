package com.app.application.controller;

import com.app.application.entity.Entry;
import com.app.application.repository.EntryRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    private final EntryRepository entryRepository;

    public MainController(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    @GetMapping("/form")
    public String showForm(Model model) {
        model.addAttribute("entry", new Entry());
        return "form";
    }

    @PostMapping("/form")
    public String submitForm(@ModelAttribute Entry entry) {
        entryRepository.save(entry);
        return "redirect:/dashboard";
    }

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        model.addAttribute("entries", entryRepository.findAll());
        return "dashboard";
    }
}