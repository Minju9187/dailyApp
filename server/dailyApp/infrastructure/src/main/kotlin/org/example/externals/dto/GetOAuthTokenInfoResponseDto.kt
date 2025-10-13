package org.example.externals.dto

data class GetOAuthTokenInfoResponseDto(
    val accessToken: String?,
    val refreshToken: String?,
    val tokenType: String?,
    val expiresIn: Int?,
    val error: String?,
    val errorDescription: String?
)