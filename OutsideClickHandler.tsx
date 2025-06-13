import { useEffect, useRef, ReactNode, RefObject } from "react";

interface OutsideClickHandlerProps {
  children: ReactNode;
  onOutsideClick: () => void;
  exceptionRefs?: RefObject<HTMLElement>[];
  isActive?: boolean;
}

function OutsideClickHandler({
  children,
  onOutsideClick,
  exceptionRefs = [],
  isActive = true,
}: OutsideClickHandlerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    function handleClickOutside(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      const clickedOutsideExceptions = exceptionRefs.every(
        (exceptionRef) =>
          !exceptionRef.current ||
          !exceptionRef.current.contains(event.target as Node)
      );

      if (clickedOutsideExceptions) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onOutsideClick, exceptionRefs]);

  return <div ref={ref}>{children}</div>;
}

export default OutsideClickHandler;
