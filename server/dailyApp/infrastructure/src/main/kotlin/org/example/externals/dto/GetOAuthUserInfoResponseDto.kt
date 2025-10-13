package org.example.externals.dto

data class GetOAuthUserInfoResponseDto(
    val resultCode: String? = null,
    val message: String? = null,
    val response: Response? = null
){
    val id: String? get() = response?.id
    val email: String? get() = response?.email
    val username: String? get() = response?.nickname

    data class Response(
        val id: String? = null,
        val nickname: String? = null,
        val email: String? = null
    )
}
