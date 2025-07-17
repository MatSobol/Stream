package com.example

import kotlinx.coroutines.*
import kotlinx.serialization.Serializable
import java.sql.Connection
import java.sql.Statement

@Serializable
data class User(
    val role: String,
    val username: String,
    val email: String,
    val icon: String? = null,
    val description: String? = null
)

class UserService(private val connection: Connection) {
    companion object {
        private const val SELECT_USER_BY_ID = "SELECT role, username, email, icon, description FROM users WHERE id = ?"
        private const val INSERT_USER =
            "INSERT INTO users (role, username, email, icon, description) VALUES (?, ?, ?, ?, ?)"
        private const val UPDATE_USER =
            "UPDATE users SET role = ?, username = ?, email = ?, icon = ?, description = ? WHERE id = ?"
        private const val DELETE_USER = "DELETE FROM users WHERE id = ?"
    }

    suspend fun create(user: User): Int = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(INSERT_USER, Statement.RETURN_GENERATED_KEYS)
        statement.setString(1, user.role)
        statement.setString(2, user.username)
        statement.setString(3, user.email)
        statement.setString(4, user.icon)
        statement.setString(5, user.description)
        statement.executeUpdate()

        val generatedKeys = statement.generatedKeys
        if (generatedKeys.next()) {
            return@withContext generatedKeys.getInt(1)
        } else {
            throw Exception("Unable to retrieve the id of the newly inserted user")
        }
    }

    suspend fun read(id: Int): User = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(SELECT_USER_BY_ID)
        statement.setInt(1, id)
        val resultSet = statement.executeQuery()

        if (resultSet.next()) {
            val role = resultSet.getString("role")
            val username = resultSet.getString("username")
            val email = resultSet.getString("email")
            val icon = resultSet.getString("icon")
            val description = resultSet.getString("description")
            return@withContext User(role, username, email, icon, description)
        } else {
            throw Exception("User not found")
        }
    }

    suspend fun update(id: Int, user: User) = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(UPDATE_USER)
        statement.setString(1, user.role)
        statement.setString(2, user.username)
        statement.setString(3, user.email)
        statement.setString(4, user.icon)
        statement.setString(5, user.description)
        statement.setInt(6, id)
        statement.executeUpdate()
    }

    suspend fun delete(id: Int) = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(DELETE_USER)
        statement.setInt(1, id)
        statement.executeUpdate()
    }
}
