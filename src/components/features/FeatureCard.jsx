import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 rounded-xl border bg-white hover:shadow-md transition">
      {icon && <div className="mb-4 text-2xl">{icon}</div>}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export default FeatureCard;
