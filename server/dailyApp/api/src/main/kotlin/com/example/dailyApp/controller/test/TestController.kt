package com.example.dailyApp.controller.test

import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/test")
class TestController {

    @GetMapping("hello-world")
    fun helloWorld(): ResponseEntity<String> {
        return ResponseEntity("hello world", HttpStatus.OK)
    }
}