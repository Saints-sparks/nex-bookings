// components/vendor/VendorReviewsModal.tsx
"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Review } from "@/app/services/business";

interface VendorReviewsModalProps {
  trigger: React.ReactNode;
  reviews: Review[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostReview?: (review: {
    name: string;
    rating: number;
    comment: string;
  }) => void;
}

function Star({
  filled,
  onClick,
  interactive = false,
}: {
  filled: boolean;
  onClick?: () => void;
  interactive?: boolean;
}) {
  return (
    <svg
      width={24}
      height={24}
      fill={filled ? "#FFB049" : "#D9D9D9"}
      viewBox="0 0 20 20"
      className={`inline-block ${
        interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""
      }`}
      onClick={onClick}
    >
      <polygon points="10,1 12.5,7.5 19,7.5 13.5,12 15.5,18.5 10,14.5 4.5,18.5 6.5,12 1,7.5 7.5,7.5" />
    </svg>
  );
}

const VendorReviewsModal: FC<VendorReviewsModalProps> = ({
  trigger,
  reviews,
  open,
  onOpenChange,
  onPostReview,
}) => {
  const [showPostReview, setShowPostReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const isEmpty = !reviews || reviews.length === 0;

  const handlePostReview = () => {
    if (reviewForm.name && reviewForm.rating > 0 && reviewForm.comment) {
      onPostReview?.(reviewForm);
      setReviewForm({ name: "", rating: 0, comment: "" });
      setShowPostReview(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  if (showPostReview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="p-0 sm:max-w-[500px] max-w-screen sm:w-[500px] rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle asChild>
            <span className="sr-only">Post Review</span>
          </DialogTitle>
          <div className="flex flex-col p-8 bg-white rounded-3xl">
            <h2 className="text-[22px] text-[#212121] font-bold mb-6">
              Post Review
            </h2>

            {/* Rating Selection */}
            <div className="mb-6">
              <p className="text-center text-[16px] font-medium text-[#212121] mb-4">
                Select Vendor Ratings
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    filled={i <= reviewForm.rating}
                    onClick={() => handleStarClick(i)}
                    interactive={true}
                  />
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="text-[#807E7E] font-medium block mb-2">
                Enter Full Name
              </label>
              <Input
                placeholder="James Tyler"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="p-4 rounded-xl border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 bg-[#F6F6F6]"
              />
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="text-[#807E7E] font-medium block mb-2">
                Enter Review Here
              </label>
              <textarea
                placeholder="Enter your review here..."
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-xl border-transparent focus:outline-none focus:ring-0 focus:border-[#6C35A7] bg-[#F6F6F6] min-h-[120px] resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handlePostReview}
                className="flex-1 bg-[#6C35A7] hover:bg-purple-700 py-6 text-[16px] font-medium rounded-full"
              >
                Post Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[1040px] max-w-screen rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <span className="sr-only">Vendor Reviews</span>
        </DialogTitle>
        <div className="flex flex-col p-8 bg-white rounded-3xl">
          <h2 className="text-[22px] text-[#212121] font-bold mb-6">
            Vendor Reviews
          </h2>

          {isEmpty ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-black text-center text-[18px] font-medium mb-8 max-w-[487px]">
                Vendor has not received any review yet, Click Button below to
                get started
              </p>
              <Button
                onClick={() => setShowPostReview(true)}
                className="bg-[#6C35A7] hover:bg-purple-700 rounded-full px-12 py-3 text-[18px] font-medium"
              >
                Post Review
              </Button>
            </div>
          ) : (
            /* Reviews Grid */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review: Review) => (
                  <div key={review.id} className="bg-[#FFEAD0] rounded-3xl p-6">
                    {/* Stars */}
                    <div className="mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} filled={i <= review.rating} />
                      ))}
                    </div>

                    {/* Review Text */}
                    <div className="text-black font-medium text-[14px] leading-[22px] mb-4">
                      {review.comment}
                    </div>

                    {/* Author Name */}
                    <div className="font-bold text-[#6C35A7] text-[16px]">
                      {review.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Review Button */}
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setShowPostReview(true)}
                  className="bg-[#6C35A7] hover:bg-purple-700 rounded-full px-8 py-3 text-[16px] font-medium"
                >
                  Post Review
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorReviewsModal;
