// app/vendor/[businessId]/page.tsx
// import { getBusinessById } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";

export default async function PublicVendorPage({
  params,
}: {
  params: { id: string };
}) {
  // const business = await getBusinessById(params.id);
  const services = await getServicesByBusiness(params.id);

  return (
    <VendorPublicPage
      businessName="Test"
      description="Test Description"
      logoUrl="/nex.svg"
      services={services}
    />
  );
}
