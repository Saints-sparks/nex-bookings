// app/vendor/[businessId]/edit/page.tsx
// import { getBusinessById, updateBusinessById } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import {
  getWebsiteSettingsByBusiness,
  WebsiteSettings,
} from "@/app/services/website";
import VendorEdit from "@/components/vendor/VendorEditPage";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";
import { AxiosError } from "axios";

export default async function VendorEditPage({
  params,
}: {
  params: { id: string };
}) {
  const DEFAULT_SETTINGS: WebsiteSettings = {
    businessId: params.id,
    id: "", // no settings yet, so no ID
    header: "Enter Header Here",
    tagline:
      "Enter details about your business here, A paragraph is best suited",
    facebookLink: "#",
    instagramLink: "#",
  };
  const services = await getServicesByBusiness(params.id);
  let settings: WebsiteSettings = DEFAULT_SETTINGS;

  try {
    const fetched = await getWebsiteSettingsByBusiness(params.id);
    // If you get back a valid object, merge it over the defaults
    settings = { ...DEFAULT_SETTINGS, ...fetched };
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      // keep DEFAULT_SETTINGS
    } else {
      // rethrow on other errors
      throw err;
    }
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <VendorEdit settings={settings} services={services} />
    </div>
  );
}
