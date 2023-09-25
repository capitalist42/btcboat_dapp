import type { FC } from "react";
import React from "react";

export interface OpenTransferModalButtonProps {
  onClick: () => Promise<void>;
  pending?: boolean;
  className?: string;
  text: string;
}

export const TransferButtonButton: FC<OpenTransferModalButtonProps> = ({
  onClick,
  pending,
  className,
  text
}) => {
  return (
    <button
      className={className}
      disabled={pending}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};
