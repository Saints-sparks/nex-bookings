// app/vendor/[businessId]/edit/page.tsx
// import { getBusinessById, updateBusinessById } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";
import VendorEdit from "@/components/vendor/VendorEditPage";
import VendorPublicPage from "@/components/vendor/VendorPublicPage";

export default async function VendorEditPage({
  params,
}: {
  params: { id: string };
}) {
  //   const business = await getBusinessById(params.id);
  const services = await getServicesByBusiness(params.id);

  // you could wrap these in a form or React state
  // to let the vendor change name/logo/description.
  // On submit, call updateBusinessById(params.id, { … })

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left pane: form to edit header/logo/desc */}

      {/* Right pane: real‑time preview */}

      <VendorEdit services={services} />
    </div>
  );
}
