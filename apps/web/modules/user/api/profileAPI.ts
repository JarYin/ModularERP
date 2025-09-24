import apiClient from "@/lib/axios"

export default {
    getProfile() {
        return apiClient.get("/profile")
    }
}