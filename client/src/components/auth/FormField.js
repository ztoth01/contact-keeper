import React from "react";
import { animated, useSpring } from "react-spring";

const FormField = ({
  filedName,
  onChange,
  onFileSelected,
  imageName,
  open
}) => {
  let type = "text";
  if (filedName === "password" || filedName === "password2") {
    type = "password";
  } else if (filedName === "profileImage") {
    type = "file";
  } else if (filedName === "email") {
    type = "email";
  }

  const fade = useSpring({
    to: {
      opacity: open ? "1" : "0",
      transform: open ? "translateY(0px)" : "translateY(30px)"
    },
    from: { transform: "translateY(30px)" }
  });

  return (
    <div className="form-group">
      {filedName === "profileImage" ? (
        <animated.div style={fade}>
          <input
            className="custom-file-input"
            type={type}
            name={filedName}
            value={filedName.value}
            onChange={onFileSelected}
          />
          <label htmlFor={filedName} className="custom-file-label">
            {imageName.charAt(0).toUpperCase() + imageName.slice(1)}
          </label>
        </animated.div>
      ) : (
        <animated.div style={fade}>
          <input
            type={type}
            name={filedName}
            value={filedName.value}
            onChange={onChange}
          />
          <label htmlFor={filedName}>
            {filedName.charAt(0).toUpperCase() + filedName.slice(1)}
          </label>
        </animated.div>
      )}
    </div>
  );
};

export default FormField;
