package com.example.dailyApp.configuration

import org.example.auth.port.OAuthClient
import org.example.config.auth.OAuthProviderProps
import org.example.external.OAuthClientAdaptor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AuthConfig(

    @Value("\${spring.oauth2.client.registration.naver.client-id}")
    private val clientId: String,

    @Value("\${spring.oauth2.client.registration.naver.client-secret}")
    private val clientSecret: String,

    @Value("\${spring.oauth2.client.registration.naver.redirect-uri}")
    private val redirectUri: String,

    @Value("\${spring.oauth2.client.provider.naver.login-url}")
    private val loginUrl: String,

    @Value("\${spring.oauth2.client.provider.naver.token-url}")
    private val tokenUrl: String,

    @Value("\${spring.oauth2.client.provider.naver.me-url}")
    private val meUrl: String,
) {
    @Bean
    fun naverOAuthConfig(): OAuthProviderProps{
        return OAuthProviderProps(
            clientId = clientId,
            clientSecret = clientSecret,
            redirectUri = redirectUri,
            loginUrl = loginUrl,
            tokenUrl = tokenUrl,
            meUrl = meUrl,
            providerName = "naver",
        )
    }

    @Bean
    fun oauthClient(naverOAuthProviderProps: OAuthProviderProps): OAuthClient {
        return OAuthClientAdaptor(oathProviderPropsList = mutableListOf(naverOAuthProviderProps))
    }
}