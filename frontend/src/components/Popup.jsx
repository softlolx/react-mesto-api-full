import { useEffect } from "react";

export function Popup({ name, children, isOpen, onClose }) {
  const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  function closePopupByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  // отменяет скролл при нажатии на пробел при открытом попапе
  const preventSpaceScrolling = (evt) => {
    if (evt.key === " " && evt.target === document.body) {
      evt.preventDefault();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      document.addEventListener("click", closePopupByOverlay);
      document.addEventListener("keydown", preventSpaceScrolling);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.removeEventListener("click", closePopupByOverlay);
      document.removeEventListener("keydown", preventSpaceScrolling);
    };
  });

  return (
    <div
      className={`popup popup_content_${name} ${isOpen && "popup_opened"}`}
      id="profile-edit-popup"
      onClick={closePopupByOverlay}
    >
      {children}
    </div>
  );
}
