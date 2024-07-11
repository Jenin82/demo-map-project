import React from "react";

type InputWithIconProps = {
  iconSrc: string;
  altText: string;
  placeholder: string;
  borderColorFocus: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithIcon = ({
  iconSrc,
  altText,
  placeholder,
  borderColorFocus,
  value,
  onChange,
}: InputWithIconProps) => {
  return (
    <div className="relative mb-3">
      <img
        className="absolute left-3 top-1/2 transform -translate-y-[40%] w-5 h-5"
        src={iconSrc}
        alt={altText}
      />
      <input
        type="text"
        className="w-full border-2 border-[#131418F5] focus:outline-none rounded-full bg-[#2B2C2FCC] pl-10 pr-6 py-3 placeholder-[#888]"
        style={{
          borderColor: value ? borderColorFocus : "#131418F5",
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.target.style.borderColor = borderColorFocus;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = value ? borderColorFocus : "#131418F5";
        }}
      />
    </div>
  );
};

export default InputWithIcon;
