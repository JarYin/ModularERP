import apiClient from "@/lib/axios";

export const selectOrganization = async () => {
  const response = await apiClient.post("/organization/get-by-id");
  return response.data;
};

export const fetchUserOrganizations = async () => {
  const response = await apiClient.post("/organization/get-by-organization");
  return response.data;
}