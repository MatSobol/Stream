package com.example.dto

data class UsersGetDTO(
    val id: Long,
    val role: String,
    val username: String,
    val email: String,
    val icon: String? = null,
    val description: String
)
