import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface AutoCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  autoplayInterval?: number;
  className?: string;
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({
  images,
  autoplayInterval = 5000,
  className,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      scrollNext();
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [emblaApi, scrollNext, autoplayInterval]);

  return (
    <div className={cn("overflow-hidden h-full", className)} ref={emblaRef}>
      <div className="flex h-full">
        {images.map((image, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {index === 0 ? "Welcome to Depot Pulse Hub" : "Depot Pulse Hub"}
                </h2>
                <p className="text-lg opacity-90">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;