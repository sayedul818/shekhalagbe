
import React from "react";

interface LoadingIndicatorProps {
  height?: string;
}

const LoadingIndicator = ({ height = "h-64" }: LoadingIndicatorProps) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
};

export default LoadingIndicator;
