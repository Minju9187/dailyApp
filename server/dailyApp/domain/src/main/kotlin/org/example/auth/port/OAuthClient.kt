package org.example.auth.port

import org.example.auth.model.Auth
import java.net.URI

interface OAuthClient {
    fun getLoginUrl(provider: String): URI
    fun authenticate(provider: String, code: String): Auth

}