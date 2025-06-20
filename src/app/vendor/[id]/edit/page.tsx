import { AxiosError } from "axios";

import { getServicesByBusiness } from "@/app/services/service";
import {
  getWebsiteSettingsByBusiness,
  WebsiteSettings,
} from "@/app/services/website";
import VendorEdit from "@/components/vendor/VendorEditPage";

type Props = {
  params: Promise<{ id: string }>;
};

function withDefault(userVal: string | undefined, defaultVal: string) {
  return userVal?.trim() ? userVal : defaultVal;
}

export default async function VendorEditPage({ params }: Props) {
  const { id } = await params;

  const DEFAULT_SETTINGS: WebsiteSettings = {
    businessId: id,
    id: "", // no settings yet, so no ID
    header: "Enter Header Here",
    tagline:
      "Enter details about your business here, A paragraph is best suited",
    facebookLink: "#",
    instagramLink: "#",
  };

  // 1️⃣ Fetch services
  const services = await getServicesByBusiness(id);

  // 2️⃣ Try to fetch existing settings (404 → null)
  let fetched: WebsiteSettings | null = null;
  try {
    fetched = await getWebsiteSettingsByBusiness(id);
  } catch (err: any) {
    if (!(err instanceof AxiosError && err.response?.status === 404)) {
      throw err;
    }
  }

  // 3️⃣ Merge defaults + fetched, but heal any empty strings
  const settings: WebsiteSettings = {
    // base defaults
    ...DEFAULT_SETTINGS,
    // override with whatever keys exist on fetched
    ...(fetched || {}),
    // explicitly restore default for any blank fields
    header: withDefault(fetched?.header, DEFAULT_SETTINGS.header),
    tagline: withDefault(fetched?.tagline, DEFAULT_SETTINGS.tagline),
    facebookLink: withDefault(
      fetched?.facebookLink,
      DEFAULT_SETTINGS.facebookLink
    ),
    instagramLink: withDefault(
      fetched?.instagramLink,
      DEFAULT_SETTINGS.instagramLink
    ),
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <VendorEdit settings={settings} services={services} />
    </div>
  );
}
