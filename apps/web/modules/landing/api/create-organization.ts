import apiClient from "@/lib/axios"
import { Organization } from "../types"
export async function createOrganization(data: Organization) {
    return apiClient.post("/organization", data)
}