import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className = "" }) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
    />
  );
};
