import { Service } from "@/app/services/service";
import DisplayCard from "./DisplayCard";

export default function DisplayGrid({ services }: { services: Service[] }) {
  return (
    <section className="justify-center items-center mx-auto">
      <h2 className="text-center text-[22px] md:text-[28px] lg:text-[30px] font-bold mb-6 text-[#6C35A7]">
        Services Offered
      </h2>
      <div className="grid gap-6 grid-cols-1 [@media(min-width:500px)_and_(max-width:700px)]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <DisplayCard key={svc.id} service={svc} />
        ))}
      </div>
    </section>
  );
}
