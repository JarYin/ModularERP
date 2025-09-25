import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const organizationProfileSchema = z.object(({
    companyName: z.string().nonempty("Company Name is required!"),
    contactEmail: z.string().email("invalid email address."),
    industry: z.string().nonempty("Industry is required!"),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    website: z.string().optional(),
    address: z.string().min(1, "address is required!"),
    description: z.string().optional()
}));

export type OrganizationProfileForm = z.infer<typeof organizationProfileSchema>;