package org.example.vo

data class OAuthTokenInfo(
    val accessToken: String,
    val refreshToken: String?,
    val tokenType: String?,
    val expiresIn: Int?,
) {

}