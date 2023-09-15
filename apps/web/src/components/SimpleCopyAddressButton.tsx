import type { FC } from "react";
import React from "react";

export interface SimpleCopyAddressButtonProps {
  onCopy: () => Promise<void>;
  pending?: boolean;
  className?: string;
  address: string;
}

export const SimpleCopyAddressButton: FC<SimpleCopyAddressButtonProps> = ({
  onCopy,
  pending,
  className,
  address
}) => {
  return (
    <button
      className={className}
      disabled={pending}
      onClick={onCopy}
      type="button"
    >
      {address}
    </button>
  );
};
