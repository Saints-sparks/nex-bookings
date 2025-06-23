import { getBusinessById } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import { getWebsiteSettingsByBusiness } from "@/app/services/website";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PublicVendorPage({ params }: Props) {
  const { id } = await params;

  const business = await getBusinessById(id);
  const services = await getServicesByBusiness(id);
  let description = "Welcome to our services—stay tuned for more details!";
  let instagramLink = "";
  let facebookLink = "";

  try {
    const settings = await getWebsiteSettingsByBusiness(id);
    // if tagline is defined and non‑empty, use it
    if (settings.tagline) {
      description = settings.tagline;
      instagramLink = settings.instagramLink || "";
      facebookLink = settings.facebookLink || "";
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
      instagramLink={instagramLink}
      facebookLink={facebookLink}
    />
  );
}
