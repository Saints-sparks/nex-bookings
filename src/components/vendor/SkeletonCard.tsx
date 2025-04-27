// components/vendor/SkeletonCard.tsx
export default function SkeletonCard() {
    return (
      <div className="rounded-xl overflow-hidden w-[300px] bg-white shadow animate-pulse">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200" />
        {/* Text skeleton */}
        <div className="px-4 py-3 bg-[#F2F2F2] space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }
  