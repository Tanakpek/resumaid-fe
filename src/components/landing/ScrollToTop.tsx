import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="tw-fixed bottom-4 tw-right-4 tw-opacity-90 tw-shadow-md"
          size="icon"
        >
          <ArrowUpToLine className="tw-h-4 tw-w-4" />
        </Button>
      )}
    </>
  );
};
