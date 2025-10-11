import apiClient from "@/lib/axios";
import { OrganizationProfileForm } from "../validation";

export const selectOrganization = async () => {
  const response = await apiClient.post("/organization/get-by-id");
  return response.data;
};

export const fetchUserOrganizations = async () => {
  const response = await apiClient.post("/organization/get-by-organization");
  return response.data;
}

export const updateOrganization = async (data: Partial<OrganizationProfileForm>) => {
  const response = await apiClient.post("/organization/update", data);
  return response.data;
}