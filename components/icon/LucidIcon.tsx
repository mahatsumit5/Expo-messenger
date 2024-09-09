import { TouchableOpacity } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";
type props = {
  onPress?: () => void;
  icon: LucideIcon;
  size?: number;
  className?: string;
};
const LucidIcon = ({ onPress, icon, ...rest }: props) => {
  const Icon = icon;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon {...rest} />
    </TouchableOpacity>
  );
};

export default LucidIcon;
