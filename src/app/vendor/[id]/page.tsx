// app/vendor/[businessId]/page.tsx
// import { getBusinessById } from "@/app/services/business";
import { getBusinessById, getBusinessByUser } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import { getWebsiteSettingsByBusiness } from "@/app/services/website";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";

export default async function PublicVendorPage({
  params,
}: {
  params: { id: string };
}) {
  const business = await getBusinessById(params.id);
  const services = await getServicesByBusiness(params.id);
  let description = "Welcome to our services—stay tuned for more details!";
  try {
    const settings = await getWebsiteSettingsByBusiness(params.id);
    // if tagline is defined and non‑empty, use it
    if (settings.tagline) {
      description = settings.tagline;
    }
  } catch (error: any) {
    // Only swallow a 404 (no settings yet), re‑throw other errors
    if (error.response?.status !== 404) {
      throw error;
    }
    // else leave `description` as the default above
  }

  return (
    <VendorPublicPage
      businessName={business.businessName}
      description={description}
      logoUrl={business.logo}
      services={services}
    />
  );
}
