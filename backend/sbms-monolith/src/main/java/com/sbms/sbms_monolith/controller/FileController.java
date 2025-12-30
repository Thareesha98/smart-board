package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private S3Service s3Service;

    
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        String url = s3Service.uploadFile(file);
        return ResponseEntity.ok(url);
    }

   
    @PostMapping("/upload/{folder}")
    public ResponseEntity<String> uploadToFolder(
            @RequestParam("file") MultipartFile file,
            @PathVariable String folder
    ) {
        String url = s3Service.uploadFile(file, folder + "/");
        return ResponseEntity.ok(url);
    }

   
    @PostMapping("/upload-multiple/{folder}")
    public ResponseEntity<List<String>> uploadMultiple(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable String folder
    ) {
        List<String> urls = s3Service.uploadFiles(files, folder + "/");
        return ResponseEntity.ok(urls);
    }

   
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String fileUrl) {
        s3Service.deleteFile(fileUrl);
        return ResponseEntity.ok("File deleted successfully");
    }
}
