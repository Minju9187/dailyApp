package com.example.dailyApp.controller.auth

import org.example.auth.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService
) {
    @GetMapping("/oauth/{provider}")
    fun oauthLogin(@PathVariable provider: String): ResponseEntity<Void> {
        val loginUrl: URI = authService.getOAuthLoginUrl(provider)
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
            .location(loginUrl)
            .build()
    }
}