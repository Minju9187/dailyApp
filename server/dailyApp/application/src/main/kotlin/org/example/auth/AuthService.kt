package org.example.auth

import org.example.auth.port.OAuthClient
import org.springframework.stereotype.Service
import java.net.URI

@Service
class AuthService(
    private val oathClient: OAuthClient
) {
    fun getOAuthLoginUrl(provider: String): URI {
        return oathClient.getLoginUrl(provider)
    }

    fun oauthLogin(provider: String, code: String){
        val auth = oathClient.authenticate(provider, code)
        // todo save session
    }
}