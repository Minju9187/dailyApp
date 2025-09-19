pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.5.0"
}

rootProject.name = "dailyApp"
include("api")
include("infrastructure")
include("application")
include("domain")
include("common")
include("contracts")
