package com.example.routes

import io.ktor.server.application.Application
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.routing

fun Application.configureRouting() {
    routing {
        userRoutes()
        get("/") {
            call.respondText("Hello World!")
        }
    }
}