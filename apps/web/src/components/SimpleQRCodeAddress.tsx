import type { FC } from "react";
import React from "react";

export interface SimpleQRCodeAddressProps {
  address: string;
}

export const SimpleQRCodeAddress: FC<SimpleQRCodeAddressProps> = ({
  address,
}) => {
  return <>SimpleQRCodeAddress {address}</>;
};
