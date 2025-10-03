import {
  getBusinessById,
  getBusinessBySlug,
  Review,
} from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import { getWebsiteSettingsByBusiness } from "@/app/services/website";
import { getReviewsByBusinessId } from "@/app/services/business";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const business = await getBusinessBySlug(slug);
    const settings = await getWebsiteSettingsByBusiness(business.id);
    const tagline =
      settings?.tagline?.trim() || "Book services with this vendor";

    return {
      title: `${business.businessName} | osisopro`,
      description: tagline,
      openGraph: {
        title: `${business.businessName} | osisopro`,
        description: tagline,
        images: business.logo ? [{ url: business.logo }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${business.businessName} | osisopro`,
        description: tagline,
        images: business.logo ? [business.logo] : [],
      },
      icons: {
        icon: business.logo || "/fav.png",
      },
    };
  } catch (error) {
    return {
      title: "Vendor | osisopro",
      description: "Book services with this vendor",
      icons: {
        icon: "/fav.png",
      },
    };
  }
}

export default async function PublicVendorPage({ params }: Props) {
  const { slug } = await params;

  const business = await getBusinessBySlug(slug);
  const services = await getServicesByBusiness(business.id);
  let reviews: Review[] = [];
  let description = "Welcome to our services—stay tuned for more details!";
  let instagramLink = "";
  let facebookLink = "";

  try {
    reviews = await getReviewsByBusinessId(business.id);
  } catch (error) {
    console.log("No reviews found or error fetching reviews");
  }

  try {
    const settings = await getWebsiteSettingsByBusiness(business.id);
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
      phoneNumber={business.phoneNumber}
      workingHours={business.workingHours}
      reviews={reviews}
      businessSlug={slug}
    />
  );
}
