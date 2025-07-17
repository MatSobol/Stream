package com.example.repository

import io.ktor.server.application.Application
import io.ktor.server.application.log
import java.sql.Connection
import java.sql.DriverManager

class PostgresConnection : Conn {
    override fun connect(app: Application): Connection {
        Class.forName("org.postgresql.Driver")

        val config = app.environment.config
        val url = config.property("postgres.url").getString()
        val user = config.property("postgres.user").getString()
        val password = config.property("postgres.password").getString()

        app.log.info("Connecting to PostgreSQL at $url")
        return DriverManager.getConnection(url, user, password)
    }
}