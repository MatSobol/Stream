package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val role: String,
    val username: String,
    val email: String,
    val icon: String? = null,
    val description: String
)
