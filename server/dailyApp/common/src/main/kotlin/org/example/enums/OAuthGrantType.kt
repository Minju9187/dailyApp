package org.example.enums

enum class OAuthGrantType(val grantType: String) {
    AUTHORIZATION_CODE("authorization_code"),
    REFRESH_TOKEN("refresh_token"),
    DELETE("delete");

    // 자바 호환: 기존 getGrantType() 호출 유지 가능
    fun getGrantType(): String = grantType
}