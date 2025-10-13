package com.example.dailyApp.controller.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.example.auth.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI
import javax.naming.AuthenticationException

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

    @GetMapping("/oauth/callback/{provider}")
    @Throws(AuthenticationException::class)
    fun oAuthLoginCallback(
        @PathVariable("provider") provider: String,
        @RequestParam(name = "code") code: String,
        @RequestParam(name = "state") state: String?,
        request: HttpServletRequest?,
        response: HttpServletResponse?
    ): ResponseEntity<*> {
        val user = authService.oauthLogin(provider, code)
        return ResponseEntity.ok("")
    }
}