import DisplayCard from "./DisplayCard";

export default function DisplayGrid() {
  const dummyServices = Array(6).fill(null);

  return (
    <section>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {dummyServices.map((_, index) => (
          <DisplayCard key={index} />
        ))}
      </div>
    </section>
  );
}
