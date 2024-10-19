const Tooltip = ({ content, position, visible }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 10,
      }}>
      {content}
    </div>
  );
};

export default Tooltip;
