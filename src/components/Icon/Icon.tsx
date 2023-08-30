import React from "react";

interface IIconProps {
  name: IconNames;
  className?: string;
}

export type IconNames =
  | "add"
  | "add_circle"
  | "android"
  | "arrow_drop_up"
  | "arrow_drop_down"
  | "arrow_downward"
  | "close"
  | "check"
  | "desktop_windows"
  | "download"
  | "edit"
  | "error"
  | "email"
  | "image"
  | "ios"
  | "ios_share"
  | "info"
  | "location_on"
  | "perm_device_information_icon"
  | "phone_android"
  | "sell"
  | "south"
  | "warning"
  | "web";

export const Icon = ({ name, className, ...rest }: IIconProps) => {
  const iconLookup = {
    ios: "apple",
    web: "desktop_windows",
  };

  const nameToLower = name.toLowerCase();

  return (
    <span className={`icon-override ${className}`} {...rest}>
      {iconLookup[nameToLower] || nameToLower}
    </span>
  );
};
