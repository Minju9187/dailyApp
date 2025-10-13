package org.example.config.auth

import org.example.enums.OAuthGrantType
import org.springframework.web.util.UriComponentsBuilder
import java.net.URI

class OAuthProviderProps(
    private val clientId: String,
    private val clientSecret: String,
    private val redirectUri: String,
    private val loginUrl: String,
    private val tokenUrl: String,
    private val meUrl: String,
    val providerName: String
) {
    private val DEFAULT_STATE: String = "some_state"
    private var grantType: OAuthGrantType = OAuthGrantType.AUTHORIZATION_CODE
    private var state: String = DEFAULT_STATE

    val loginUri: URI
        get() = UriComponentsBuilder.newInstance()
            .uri(URI.create(loginUrl))
            .queryParam("response_type", "code")
            .queryParam("client_id", clientId)
            .queryParam("redirect_uri", redirectUri)
            .queryParam("state", state)
            .build()
            .toUri()

    val meUri: URI
        get() = URI.create(meUrl)

    fun createTokenUri(code: String?): URI {
        return UriComponentsBuilder.newInstance()
            .uri(URI.create(tokenUrl))
            .queryParam("grant_type", grantType.getGrantType())
            .queryParam("client_id", clientId)
            .queryParam("client_secret", clientSecret)
            .queryParam("code", code)
            .queryParam("state", state)
            .build()
            .toUri()
    }
}