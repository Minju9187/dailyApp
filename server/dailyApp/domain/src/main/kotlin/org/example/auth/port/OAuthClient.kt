package org.example.auth.port

import java.net.URI

interface OAuthClient {
    fun getLoginUrl(provider: String): URI
}