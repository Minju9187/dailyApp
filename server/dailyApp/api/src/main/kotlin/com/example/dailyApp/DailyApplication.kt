package com.example.dailyApp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.example"])
class DailyApplication {
}

fun main(args: Array<String>) {
    runApplication<DailyApplication>(*args)
}
