package com.app.application.entity;

import jakarta.persistence.*;

@Entity
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNo;
    private String name;
    private String abstractText;
    private String frontendIp;
    private String backendIp;
    private String githubUrl;

    // Getters & Setters
    public Long getId() { return id; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAbstractText() { return abstractText; }
    public void setAbstractText(String abstractText) { this.abstractText = abstractText; }

    public String getFrontendIp() { return frontendIp; }
    public void setFrontendIp(String frontendIp) { this.frontendIp = frontendIp; }

    public String getBackendIp() { return backendIp; }
    public void setBackendIp(String backendIp) { this.backendIp = backendIp; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
}