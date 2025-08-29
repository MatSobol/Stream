package com.example.routes

import com.example.dto.ProfileRequestDTO
import com.example.model.User
import com.example.plugins.local
import com.example.repository.UserRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.getOrFail
import org.koin.ktor.ext.inject

fun Route.userRoutes() {
    val userRepository by inject<UserRepository>()
    route(path = "/profile") {
        put("{id}") {
            val id = call.parameters.getOrFail<Long>("id")
            val profileRequest = call.receive<ProfileRequestDTO>()

            try {
                userRepository.updateProfile(id, profileRequest)
                call.respond(HttpStatusCode.NoContent)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.NotFound, e.message ?: "User not found")
            }
        }
    }
    route("/users") {
        get("{id}") {
            val id = call.parameters.getOrFail<Long>("id")

            try {
                val user = userRepository.read(id)
                call.respond(user)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.NotFound, e.message ?: "User not found")
            }
        }
        delete("{id}") {
            val id = call.parameters.getOrFail<Long>("id")

            try {
                userRepository.delete(id)
                call.respond(HttpStatusCode.NoContent)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Could not delete user")
            }
        }
        local {
            get() {
                try {
                    val user = userRepository.read()
                    call.respond(user)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, e.message ?: "Problem with database")
                }
            }
            post {
                val user = call.receive<User>()
                try {
                    val id = userRepository.create(user)
                    call.respond(HttpStatusCode.Created, id)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, e.message ?: "Unknown error")
                }
            }
        }
    }
}
