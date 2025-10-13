package org.example.externals.http

import org.springframework.http.HttpHeaders
import org.springframework.web.reactive.function.client.WebClient

class HttpClient {
    private val _client = WebClient.builder().build()
    val client: WebClient
        get() = _client

    inline fun <reified T> get(url: String): T? = get<T>(url, mutableMapOf())
    inline fun <reified T> get(url: String, headers: Map<String, String>): T? {
        return client.get()
            .uri(url)
            .headers { header: HttpHeaders ->
                headers.forEach { (headerName: String, headerValue: String) ->
                    header.add(
                        headerName, headerValue
                    )
                }
            }
            .retrieve()
            .bodyToMono(T::class.java)
            .block()
    }
}