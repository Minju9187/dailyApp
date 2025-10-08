package org.example.external

import org.example.auth.port.OAuthClient
import org.example.config.auth.OAuthProviderProps
import java.net.URI

class OAuthClientAdaptor(
    private val oathProviderPropsList: MutableList<OAuthProviderProps>
): OAuthClient {
    override fun getLoginUrl(provider: String): URI {
        val props = findProps(provider) ?: throw Exception("")
        return props.getLoginUrl()
    }

    private fun findProps(provider: String): OAuthProviderProps? {
        return oathProviderPropsList.find {
            it.providerName === provider
        }
    }
}