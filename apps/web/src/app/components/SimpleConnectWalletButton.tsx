import type { FC } from "react";
import React from "react";

export interface SimpleConnectWalletButtonProps {
  onConnect: () => void;
  pending?: boolean;
  className?: string;
  text: string;
}

export const SimpleConnectWalletButton: FC<SimpleConnectWalletButtonProps> = ({
  onConnect,
  pending,
  className,
  text
}) => {
  return (
    <button
      className={className}
      disabled={pending}
      onClick={onConnect}
      type="button"

    >
      {text}
    </button>
  );
};
