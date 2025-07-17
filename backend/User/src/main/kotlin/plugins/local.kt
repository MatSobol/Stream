package com.example.plugins

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.createRouteScopedPlugin
import io.ktor.server.plugins.origin
import io.ktor.server.response.respondText
import io.ktor.server.routing.Route
import io.ktor.server.routing.application

fun Route.local(build: Route.() -> Unit): Route {
    val route = createChild(Selector())
    val key = application.environment.config.property("ktor.security.local.secret-key").getString()
    val localOnlyPlugin = createRouteScopedPlugin("LocalOnlyPlugin") {
        onCall { call ->
            if (call.request.origin.remoteHost != "localhost" || call.request.headers["Key"] != key) {
                call.respondText("Access denied", status = HttpStatusCode.Forbidden)
            }
        }
    }
    route.install(localOnlyPlugin)
    route.build()
    return route
}
