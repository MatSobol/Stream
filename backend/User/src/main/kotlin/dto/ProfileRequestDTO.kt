package com.example.dto

import kotlinx.serialization.Serializable

@Serializable
data class ProfileRequest(
    val id: Long,
    val username: String,
    val email: String,
    val description: String? = null
)