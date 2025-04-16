import DisplayCard from "./DisplayCard";

export default function DisplayGrid() {
  const dummyServices = Array(6).fill(null);

  return (
    <section className="justify-center items-center mx-auto">
      <div className="grid gap-6 grid-cols-1 [@media(min-width:500px)_and_(max-width:700px)]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {dummyServices.map((_, index) => (
          <DisplayCard key={index} />
        ))}
      </div>
    </section>
  );
}
