package com.example.repository

import com.example.dto.ProfileRequestDTO
import com.example.dto.UsersGetDTO
import com.example.model.User
import kotlinx.coroutines.*
import java.sql.Connection
import java.sql.Statement

class UserRepository(private val connection: Connection) {
    companion object {
        private const val SELECT_ALL = "SELECT id, role, username, email, icon, description FROM users"
        private const val SELECT_USER_BY_ID = "SELECT role, username, email, icon, description FROM users WHERE id = ?"
        private const val INSERT_USER =
            "INSERT INTO users (role, username, email, icon, description) VALUES (?, ?, ?, ?, ?)"
        private const val UPDATE_USER =
            "UPDATE users SET role = ?, username = ?, email = ?, icon = ?, description = ? WHERE id = ?"
        private const val UPDATE_PROFILE =
            "UPDATE users SET username = ?, email = ?, description = ? WHERE id = ?"
        private const val DELETE_USER = "DELETE FROM users WHERE id = ?"
    }

    suspend fun create(user: User): Long = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(INSERT_USER, Statement.RETURN_GENERATED_KEYS)
        statement.setString(1, user.role)
        statement.setString(2, user.username)
        statement.setString(3, user.email)
        statement.setString(4, user.icon)
        statement.setString(5, user.description)
        statement.executeUpdate()

        val generatedKeys = statement.generatedKeys
        if (generatedKeys.next()) {
            return@withContext generatedKeys.getLong(1)
        } else {
            throw Exception("Unable to retrieve the id of the newly inserted user")
        }
    }

    suspend fun read(): List<UsersGetDTO> = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(SELECT_ALL)
        val resultSet = statement.executeQuery()

        val users = mutableListOf<UsersGetDTO>()

        while (resultSet.next()) {
            val id = resultSet.getLong("id")
            val role = resultSet.getString("role")
            val username = resultSet.getString("username")
            val email = resultSet.getString("email")
            val icon = resultSet.getString("icon")
            val description = resultSet.getString("description")

            users.add(UsersGetDTO(id, role, username, email, icon, description))
        }

        return@withContext users
    }

    suspend fun read(id: Long): User = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(SELECT_USER_BY_ID)
        statement.setLong(1, id)
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

    suspend fun update(id: Long, user: User) = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(UPDATE_USER)
        statement.setString(1, user.role)
        statement.setString(2, user.username)
        statement.setString(3, user.email)
        statement.setString(4, user.icon)
        statement.setString(5, user.description)
        statement.setLong(6, id)
        statement.executeUpdate()
    }

    suspend fun updateProfile(id: Long, profileRequest: ProfileRequestDTO) = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(UPDATE_PROFILE)
        statement.setString(1, profileRequest.username)
        statement.setString(2, profileRequest.email)
        statement.setString(3, profileRequest.description)
        statement.setLong(4, id)
        statement.executeUpdate()
    }

    suspend fun delete(id: Long) = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(DELETE_USER)
        statement.setLong(1, id)
        statement.executeUpdate()
    }
}
