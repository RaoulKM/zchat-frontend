import React from "react";

interface WhyItemProps {
  title: string;
  description: string;
}

const WhyItem: React.FC<WhyItemProps> = ({ title, description }) => {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default WhyItem;
