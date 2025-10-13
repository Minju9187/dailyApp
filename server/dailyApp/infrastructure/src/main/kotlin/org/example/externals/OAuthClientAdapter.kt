package org.example.externals

import org.example.auth.model.Auth
import org.example.auth.port.OAuthClient
import org.example.config.auth.OAuthProviderProps
import org.example.externals.dto.GetOAuthTokenInfoResponseDto
import org.example.externals.dto.GetOAuthUserInfoResponseDto
import org.example.externals.http.HttpClient
import org.example.vo.OAuthTokenInfo
import org.example.vo.OAuthUserInfo
import java.net.URI

class OAuthClientAdapter(
    private val oathProviderPropsList: MutableList<OAuthProviderProps>
): OAuthClient {
    private val httpClient = HttpClient();
    override fun getLoginUrl(provider: String): URI {
        val props = findProps(provider) ?: throw Exception("")
        return props.loginUri
    }

    override fun authenticate(provider: String, code: String): Auth {
        val props = findProps(provider) ?: throw Exception("")
        val tokenInfo = requestTokenInfo(props, code)
        val userInfo = requestUserInfo(props, tokenInfo.accessToken)

        return Auth(id = userInfo.id, email = userInfo.email, username = userInfo.username)
    }

    private fun requestTokenInfo(props: OAuthProviderProps, code: String): OAuthTokenInfo {
        val tokenUrl = props.createTokenUri(code).toString()
        val response = httpClient.get<GetOAuthTokenInfoResponseDto>(tokenUrl)

        if(response == null || !response.error.isNullOrEmpty()){
            throw Exception()
        }

        return OAuthTokenInfo(
            accessToken = response.accessToken!!,
            refreshToken = response.refreshToken,
            tokenType = response.tokenType,
            expiresIn = response.expiresIn
        )
    }

    private fun requestUserInfo(props: OAuthProviderProps, accessToken: String): OAuthUserInfo {
        val url = props.meUri.toString()
        val headers = mutableMapOf("Authorization" to "Bearer $accessToken")
        val response = httpClient.get<GetOAuthUserInfoResponseDto>(url, headers) ?: throw Exception()

        return OAuthUserInfo(
            id = response.id!!,
            email = response.email!!,
            username = response.username!!
        )
    }

    private fun findProps(provider: String): OAuthProviderProps? {
        return oathProviderPropsList.find {
            it.providerName === provider
        }
    }
}