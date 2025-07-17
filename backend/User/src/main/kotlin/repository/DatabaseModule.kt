package com.example.repository

import io.ktor.server.application.*
import org.koin.dsl.module
import java.sql.Connection

fun databaseModule(app: Application) = module {
    single<Connection>(createdAtStart = true) {
        PostgresConnection().run { connect(app) }
    }
    single { UserRepository(get()) }
}
