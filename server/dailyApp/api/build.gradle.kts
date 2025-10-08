plugins {
    id("java")

    id("org.springframework.boot")
    id("io.spring.dependency-management")
    kotlin("plugin.spring")
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation(project(":infrastructure"))
    implementation(project(":application"))

    compileOnly(project(":domain"))
}

tasks.test {
    useJUnitPlatform()
}
tasks.bootJar { enabled = true }
tasks.jar { enabled = false }