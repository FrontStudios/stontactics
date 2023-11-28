import { useRef, useState } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";

const DrawText = ({
  element,
  i,
  isDragable,
  elements,
  setElements,
  handleObjectDragEnd,
}) => {
  const textRef = useRef(null);
  const trRef = useRef(null);

  const [transformedSize, setTransformedSize] = useState({
    width: null,
    height: null,
  });

  const handleSelect = () => {
    trRef.current.nodes([textRef.current]);
    trRef.current.getLayer().batchDraw();
  };

  const handleTransformEnd = () => {
    // Get the transformed size after the transformation ends
    const transformedNode = trRef.current.nodes()[0];
    if (transformedNode && transformedNode.className === "Group") {
      const width = transformedNode.width();
      const height = transformedNode.height();

      setTransformedSize({ width, height });
    }
  };

  return (
    <>
      <Rect
        width={transformedSize.width + 50}
        height={transformedSize.height + 20}
        x={element.x - 25}
        y={element.y - 10}
        fill="#456468"
      />
      <Text
        onClick={handleSelect}
        ref={textRef}
        key={i}
        id={element.id}
        text={element.text}
        draggable={isDragable}
        fill={element.fill}
        x={element.x}
        y={element.y}
        width={transformedSize.width}
        height={transformedSize.height}
        fontFamily="sans-serif"
        fontSize={element.fontSize}
        perfectDrawEnabled={false}
        onDragEnd={(e) => handleObjectDragEnd(element.id, e)}
        onDblClick={() => {
          const newTexts = [...elements];
          const index = newTexts.findIndex((item) => item.id === element.id);
          const newValue = window.prompt(
            "Enter new text value",
            element.initialText
          );
          if (newValue !== null) {
            newTexts[index] = {
              ...newTexts[index],
              text: newValue,
            };
            setElements(newTexts); // Update the state with the new texts array
          }
        }}
      />
      <Transformer
        onTransform={(e) => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          setTransformedSize({
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
        ref={trRef}
        // boundBoxFunc={(oldBox, newBox) => newBox}
      />
    </>
  );
};

export default DrawText;
