import React, { FC } from "react";
import { Button } from "../ui/button";
import { Small } from "../ui/typography";
import { LucideIcon } from "lucide-react-native";

const ShadButton: FC<props> = ({
  icon,
  title,
  variant,
  onPress,
  iconClassName,
  size = 16,
}) => {
  const Icon = icon;
  return (
    <Button className="flex-row gap-2 " variant={variant} onPress={onPress}>
      <Icon className={iconClassName} size={size} />
      <Small>{title}</Small>
    </Button>
  );
};

export default ShadButton;
interface props {
  icon: LucideIcon;
  title?: string;
  variant: any;
  onPress: () => void;
  size: number;
  iconClassName: string;
}
