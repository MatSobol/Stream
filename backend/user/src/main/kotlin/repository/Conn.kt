package com.example.repository

import io.ktor.server.application.Application
import java.sql.Connection

interface Conn {
    fun connect(app: Application) : Connection;
}