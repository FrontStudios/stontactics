import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Stage, Layer, Line, Text, Arrow, Shape } from "react-konva";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import Map from "./Map";
import Button from "../button/Button";
import MapsController from "../mapsController/MapsController";
import StrategyController from "../strategyController/StrategyController";
import DrawImage from "./DrawImage";

import { setMatchPart } from "../../store/matchPartsSlice/matchPartsSlice";

import pencil from "../../img/icons/pencil.svg";
import eraser from "../../img/icons/eraser.svg";
import dialog from "../../img/icons/Subtract-7.svg";
import image from "../../img/icons/Union-3.svg";
import video from "../../img/icons/Subtract-8.svg";
import warning from "../../img/icons/warning-fill.svg";
import shield from "../../img/icons/shield.svg";
import bomb from "../../img/icons/Union-4.svg";
import location from "../../img/icons/Subtract-9.svg";
import scope from "../../img/icons/Union-5.svg";
import star from "../../img/icons/Star 3.svg";
import flag from "../../img/icons/Union-6.svg";
import clock from "../../img/icons/clock-fill.svg";
import fullScreen from "../../img/icons/Union-2.svg";
import back from "../../img/icons/Vector (Stroke)-1.svg";
import forward from "../../img/icons/Vector (Stroke).svg";
import trash from "../../img/icons/Subtract-5.svg";
import axis from "../../img/icons/Vector-3.svg";
import folder from "../../img/icons/Subtract-4.svg";
import brushOne from "../../img/icons/burshOne.svg";
import brushTwo from "../../img/icons/BrushTwo.svg";
import brushThree from "../../img/icons/BrushThree.svg";
import brushFour from "../../img/icons/brushFour.svg";
import brushFive from "../../img/icons/brushFive.svg";
import brushSix from "../../img/icons/brushSix.svg";

import personOneYellow from "../../img/icons/person_1_yellow.svg";
import personTwoYellow from "../../img/icons/person_2_yellow.svg";
import personThreeYellow from "../../img/icons/person_3_yellow.svg";
import personFourYellow from "../../img/icons/person_4_yellow.svg";
import personFiveYellow from "../../img/icons/person_5_yellow.svg";

import flashbang from "../../img/icons/flash.svg";
import smoke from "../../img/icons/smoke.svg";
import grenade from "../../img/icons/grenade.svg";
import molotov from "../../img/icons/Subtract-10.svg";

import smokeMap from "../../img/icons/smoke_map.svg";
import grenadeMap from "../../img/icons/grenade_map.svg";
import molotovMap from "../../img/icons/molotov_map.svg";

import personOneBlue from "../../img/icons/person_1_blue.svg";
import personTwoBlue from "../../img/icons/person_2_blue.svg";
import personThreeBlue from "../../img/icons/person_3_blue.svg";
import personFourBlue from "../../img/icons/person_4_blue.svg";
import personFiveBlue from "../../img/icons/person_5_blue.svg";

import styles from "./canvas.module.scss";
import buttonStyles from "../button/button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import DrawText from "./DrawText";
import { Html } from "react-konva-utils";

const elementImages = {
  warning: warning,
  bomb: bomb,
  location: location,
  star: star,
  flag: flag,
  flashbang: flashbang,
  smoke: smokeMap,
  grenade: grenadeMap,
  molotov: molotovMap,
};

const Canvas = () => {
  const dispatch = useDispatch();
  const parts = useSelector((state) => state.matches);

  const [part, setPart] = useState("firstPart");

  const [isFullScreen, setIsFullScreen] = useState(null);

  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([elements]);
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedTextId, setSelectedTextId] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);

  const [selectedMap, setSelectedMap] = useState("rust");

  const [shiftPressed, setShiftPressed] = useState(false);

  const [tool, setTool] = useState(null);

  const [arrowType, setArrowType] = useState(null);
  const [isDash, setIsDash] = useState(null);
  const [color, setColor] = useState(["hsl(0, 0%, 100%)", 0]);
  const [drawWidth, setDrawWidth] = useState(2);
  const [arrowBrightness, setArrowBrightness] = useState(50);

  const [isDragable, setIsDragable] = useState(false);
  const [colorsArray, setColorsArray] = useState([
    "hsl(0, 0%, 100%)",
    "hsl(0,0%, 50%)",
    "hsl(192,100%, 50%)",
    "hsl(209,100%, 50%)",
    "hsl(84,100%, 59%)",
    "hsl(60,100%, 50%)",
    "hsl(39,100%, 50%)",
    "hsl(0,100%, 50%)",
  ]);

  // const [scale, setScale] = useState(1);

  const isDrawing = useRef(null);
  const stageRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const removeBtnRef = useRef(null);

  useEffect(() => {
    setElements(history[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.key === "Shift") {
        setShiftPressed(true);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (!e.shiftKey && e.key === "Shift") {
        setShiftPressed(false);
      }
    });
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    });
    setElements(parts[part]);
  }, []);

  useEffect(() => {
    setElements(parts[part]);
  }, [part]);

  useEffect(() => {
    if (!!tool) {
      setIsDragable(false);
    }
  }, [tool]);

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedTextId(null);
    } else {
      return;
    }
    if (!tool) return;

    setIsDragable(false);
    isDrawing.current = true;
    let pos = e.target.getStage().getPointerPosition();

    if (tool === "pencil" || tool === "eraser") {
      setElements([
        ...elements,
        {
          tool,
          id: elements.length,
          name: tool,
          x: e.target.x(),
          y: e.target.y(),
          points: [pos.x, pos.y],
          strokeColor: color[0],
          drawWidth: drawWidth,
          arrowType: arrowType,
          dash: isDash,
          pointerLength: 15,
          pointerWidth: 20,
        },
      ]);
    } else if (tool === "text") {
      const newValue = window.prompt("Enter new text value");
      // setElements([
      //   ...elements,
      //   {
      //     tool,
      //     id: elements.length,
      //     name: tool,
      //     x: pos.x,
      //     y: pos.y,
      //     text: newValue,
      //     fill: "#e7e7e7",
      //     width: null,
      //     fontSize: 18,
      //   },
      // ]);
      // const newHistory = history.slice(0, currentStep + 1);
      // newHistory.push([
      //   ...elements,
      //   {
      //     tool,
      //     id: elements.length,
      //     name: tool,
      //     x: pos.x,
      //     y: pos.y,
      //     text: newValue,
      //     fill: "#e7e7e7",
      //     width: null,
      //     height: null,
      //     fontSize: 18,
      //   },
      // ]);
      // setHistory(newHistory);
      // setCurrentStep(newHistory.length - 1);
      // setTimeout(() => {
      //   setTool(null);
      //   isDrawing.current = false;
      // }, 100);
    } else if (tool === "arrow") {
      setElements([
        ...elements,
        {
          tool,
          id: elements.length,
          name: tool,
          isDash: isDash,
          arrowType: arrowType,
          points: {
            firstX: pos.x,
            firstY: pos.y,
          },
          color: color[0],
          pointerLength: 20,
          pointerWidth: 20,
          drawWidth: drawWidth,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !tool) return;
    const point = e.target.getStage().getPointerPosition();
    let lastLine = elements[elements.length - 1];
    if (tool === "pencil" || tool === "eraser") {
      if (!isDrawing.current) {
        return;
      }
      lastLine.points = lastLine?.points?.concat([point.x, point.y]);

      setElements(elements.concat());
    } else if (tool === "arrow") {
      lastLine.points = { ...lastLine.points, lastX: point.x, lastY: point.y };

      setElements(elements.concat());
    }
    elements.splice(elements.length - 1, 1, lastLine);
  };

  const handleMouseUp = () => {
    if (!tool) return;
    let newElements = elements.filter((el) => {
      if (el.points?.length < 4) {
        return;
      } else if (
        el.tool === "arrow" &&
        (!el.points.lastX || !el.points.lastY)
      ) {
        return;
      } else {
        return el;
      }
    });
    setElements(newElements);

    isDrawing.current = false;
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(elements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const dragElements = () => {
    setTool(null);
    setIsDragable(!isDragable);
  };

  const checkOverlap = (element) => {
    if (element) {
      const svgPathNodes = Array.from(document.querySelectorAll(".map-rect"));

      const wrapper = stageRef.current.container().getBoundingClientRect();
      const { width, height } = element.attrs;
      const wrapperTop = wrapper.top;
      const wrapperLeft = wrapper.left;
      const { x, y } = element.getClientRect();

      const isOnRect = svgPathNodes.filter((rect) => {
        const { top, left, right, bottom } = rect.getBoundingClientRect();
        const overlaps =
          x + wrapperLeft + width / 4 <= right &&
          x + wrapperLeft + width / 4 >= left &&
          y + wrapperTop + height / 2 <= bottom &&
          y + wrapperTop + height / 2 >= top;

        return overlaps;
      });
      return isOnRect.length !== 0;
    }
  };

  const handleObjectDragEnd = (id, e, name, playerLevel = null) => {
    const { clientX, clientY } = e.evt;
    const { top, bottom, left, right } =
      removeBtnRef.current.getBoundingClientRect();
    const isOverTrash =
      clientX <= right &&
      clientX >= left &&
      clientY <= bottom &&
      clientY >= top;

    var updatedElements;
    if (isOverTrash) {
      updatedElements = elements.filter((el) => {
        if (el.id === id) return;
        return el;
      });
    } else if (name === "player") {
      updatedElements = elements.map((el) =>
        el.id === id
          ? {
              ...el,
              x: e.target.x(),
              y: e.target.y(),
              level: playerLevel ? "up" : "down",
            }
          : el
      );
    } else if (name === "text") {
      updatedElements = elements.map((el) =>
        el.id === id
          ? {
              ...el,
              x: e.target.x(),
              y: e.target.y(),
              width: e.target.width(),
              height: e.target.height(),
              rotation: e.target.rotation(),
            }
          : el
      );
    } else {
      updatedElements = elements.map((el) =>
        el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el
      );
    }

    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(updatedElements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const setToolFunc = (toolName) => {
    if (tool === toolName) {
      setTool(null);
    } else if (toolName === "eraser") {
      setArrowType(null);
      setIsDash(null);
      setTool(toolName);
    } else {
      setTool(toolName);
    }
  };

  const setArrowBrightnessFunc = (e) => {
    setArrowBrightness(e.target.value);
    setColorsArray([
      `hsl(0, 0%, 100%)`,
      `hsl(0,0%, ${e.target.value}%)`,
      `hsl(192,100%, ${e.target.value}%)`,
      `hsl(209,100%, ${e.target.value}%)`,
      `hsl(84,100%, ${e.target.value}%)`,
      `hsl(60,100%, ${e.target.value}%)`,
      `hsl(39,100%, ${e.target.value}%)`,
      `hsl(0,100%, ${e.target.value}%)`,
    ]);
    if (!color.includes("hsl(0, 0%, 100%)")) {
      let [start, end] = color[0].split(" ");
      setColor([start + " " + e.target.value + "%)", color[1]]);
    }
  };

  const addElement = (elementName, playerAttrs) => {
    const newElements = [
      ...elements,
      {
        tool: "image",
        id: elements.length,
        level: "down",
        playerAttrs: playerAttrs,
        file: elementImages[elementName],
        name: elementName,
        x: stageRef.current.attrs.width / 2,
        y: stageRef.current.attrs.height / 2,
      },
    ];
    setElements(newElements);
    setIsDragable(true);
    setTool(null);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const addText = () => {
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push([
      ...elements,
      {
        tool: "text",
        id: elements.length,
        name: "text",
        x: 415,
        y: 285,
        text: textValue,
        fill: "#e7e7e7",
        width: null,
        height: null,
        fontSize: 18,
      },
    ]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setShowTextInput(false)
    setTextValue("")
  };

  const deleteAll = () => {
    // setElements([]);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push([]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const selectArrow = (type, isDashed) => {
    if (tool !== "arrow" || type !== arrowType || isDashed !== isDash) {
      setTool("arrow");
      setArrowType(type);
      setIsDash(isDashed);
    } else {
      setTool(null);
      setArrowType(null);
      setIsDash(null);
    }
  };

  const sceneFunc = (ctx, shape) => {
    const points = shape.getAttr("points");
    const dash = shape.getAttr("dash");
    ctx.beginPath();
    for (let i = 2; i < points.length; i += 2) {
      ctx.lineTo(points[i], points[i + 1]);
    }
    // ctx.moveTo(points[0], points[1]);
    // ctx.lineTo(points[2], points[3]);
    if (dash) {
      ctx.setLineDash(dash);
    }
    ctx.fillStrokeShape(shape);
    var PI2 = Math.PI * 2;
    var dx = points[points.length - 2] - points[points.length - 12];
    var dy = points[points.length - 1] - points[points.length - 11];
    var radians = (Math.atan2(dy, dx) + PI2) % PI2;
    var length = shape.getAttr("pointerLength");
    var width = shape.getAttr("pointerWidth");
    ctx.save();
    ctx.beginPath();
    ctx.translate(points[points.length - 2], points[points.length - 1]);
    ctx.rotate(radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, width / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, -width / 2);
    ctx.restore();
    ctx.fillStrokeShape(shape);
  };

  const selectMap = (mapName) => {
    if (selectedMap !== mapName) {
      setSelectedMap(mapName);
    }
  };

  const changePart = (partName) => {
    setPart(partName);
    dispatch(setMatchPart({ partName: part, partElements: elements }));
    setHistory([parts[partName]]);
    setCurrentStep(0);
  };

  const handleFullscreen = () => {
    const stage = canvasWrapperRef.current;

    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
        stage.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else {
      console.error("Fullscreen not supported by this browser");
    }
  };

  const getCanvasCapture = () => {
    const stage = stageRef.current.getStage();

    // Use toDataURL to get the image data URL
    const dataURL = stage.toDataURL({ pixelRatio: 4 });
    console.log(dataURL);
  };

  // const handleWheel = (e) => {
  //   e.evt.preventDefault();

  //   const stage = e.target.getStage();

  //   const oldScale = scale;
  //   const pointerPos = stage.getPointerPosition();
  //   const mousePointTo = {
  //     x: (pointerPos.x - stage.x()) / oldScale,
  //     y: (pointerPos.y - stage.y()) / oldScale,
  //   };

  //   const newScale = Math.min(
  //     Math.max(oldScale * (1 + (-e.evt.deltaY) / 1000), 0.2),
  //     2
  //   );

  //   setScale(newScale);

  //   const newPos = {
  //     x: pointerPos.x - mousePointTo.x * newScale,
  //     y: pointerPos.y - mousePointTo.y * newScale,
  //   };

  //   stage.position(newPos);
  //   stage.scale({ x: newScale, y: newScale });
  //   stage.batchDraw();
  // };

  return (
    <>
      <div className={styles.parent__canvas}>
        <div className={styles.parent}>
          <section className={styles.map__instruments}>
            <div className={styles.map__wrapper}>
              <Button
                ico={pencil}
                onClick={() => {
                  if (tool === "pencil") {
                    setTool(null);
                  } else {
                    setTool("pencil");
                  }
                }}
                secondClass={tool === "pencil" && "active"}
              />
              <Button
                ico={eraser}
                onClick={() => setToolFunc("eraser")}
                secondClass={tool === "eraser" && "active"}
              />
              <Button
                ico={dialog}
                onClick={() => setShowTextInput(prev => !prev)}
                secondClass={tool === "text" && "active"}
              />
              <Button ico={image} />
              <Button ico={video} />
              <Button ico={warning} onClick={() => addElement("warning")} />
              <Button ico={shield} />
              <Button
                ico={bomb}
                onClick={() => addElement("bomb")}
                secondClass={
                  elements.filter((el) => el.name === "bomb").length !== 0 &&
                  "disabled"
                }
              />
              <Button ico={location} onClick={() => addElement("location")} />
              <Button ico={scope} />
              <Button ico={star} onClick={() => addElement("star")} />
              <Button ico={flag} onClick={() => addElement("flag")} />
              <Button ico={clock} />
            </div>
          </section>
          <section
            ref={canvasWrapperRef}
            className={clsx(
              styles.canvas__wrapper,
              isDragable && styles.drag__element,
              (tool === "pencil" || tool === "arrow") && styles.pencil,
              tool === "eraser" && styles.eraser,
              !tool && styles.canvas__drag
            )}
          >
            {showTextInput && <div className={styles.text__input}>
              <div className={styles.text__input_container}>
                <input type="text" required placeholder="type.." value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <button onClick={addText}>Add</button>
              </div>
            </div>}
            <TransformWrapper
              disabled={tool || isDragable || !!selectedTextId}
              wheel={{ disabled: !shiftPressed }}
            >
              <TransformComponent
                disabled={tool || isDragable || !!selectedTextId}
              >
                <Map mapName={selectedMap} />
                <Stage
                  pixelRatio={window.devicePixelRatio}
                  ref={stageRef}
                  width={830}
                  height={570}
                  onMouseDown={handleMouseDown}
                  onMousemove={handleMouseMove}
                  onMouseup={handleMouseUp}
                  onMouseLeave={() => (isDrawing.current = false)}
                  // onWheel={handleWheel}
                >
                  <Layer antialias={true}>
                    {elements.map((element, i) => {
                      if (
                        element.tool === "pencil" ||
                        element.tool === "eraser"
                      ) {
                        const attrs = {
                          key: i,
                          id: String(element.id),
                          x: element.x,
                          y: element.y,
                          points: element.points,
                          stroke: element.strokeColor,
                          strokeWidth: element.tool === "eraser" ? 16 : element.drawWidth,
                          tension: 0.1,
                          lineCap: "round",
                          lineJoin: "round",
                          globalCompositeOperation:
                            element.tool === "eraser"
                              ? "destination-out"
                              : "source-over",
                          pointerAtEnding: true,
                          pointerLength: element.pointerLength,
                          pointerWidth: element.pointerWidth,
                        };

                        return element.arrowType === "pointer-stroke" ? (
                          <Shape
                            {...attrs}
                            sceneFunc={sceneFunc}
                            dash={element.dash ? [18, 10] : false}
                          />
                        ) : (
                          <Line
                            {...attrs}
                            perfectDrawEnabled={true}
                            dash={element.dash ? [7, 7] : false}
                          />
                        );
                      } else if (element.tool === "arrow") {
                        if (!element.points.lastX || !element.points.lastY) {
                          return;
                        }

                        const attrs = {
                          key: i,
                          id: element.id,
                          points: [
                            element.points.firstX,
                            element.points.firstY,
                            element.points.lastX,
                            element.points.lastY,
                          ],
                          fill: element.color,
                          stroke: element.color,
                          strokeWidth: element.drawWidth,
                          pointerLength: element.pointerLength,
                          pointerWidth: element.pointerWidth,
                          lineCap: "round",
                        };

                        return element.arrowType === "pointer-stroke" ? (
                          <Shape
                            {...attrs}
                            sceneFunc={sceneFunc}
                            dash={element.isDash ? [18, 10] : false}
                          />
                        ) : (
                          <Arrow
                            {...attrs}
                            pointerAtEnding={
                              !(element.arrowType === "no-pointer")
                            }
                            dash={element.isDash ? [7, 7] : false}
                          />
                        );
                      } else if (element.tool === "image") {
                        return (
                          <DrawImage
                            key={i}
                            id={element.id}
                            name={element.name}
                            level={element.level}
                            playerAttrs={element.playerAttrs}
                            x={element.x}
                            y={element.y}
                            file={element.file}
                            draggable={isDragable}
                            handleObjectDragEnd={handleObjectDragEnd}
                            onDragMove={(e) => checkOverlap(e)}
                          />
                        );
                      }
                    })}
                  </Layer>
                  <Layer antialias={true}>
                    {elements !== null &&
                      elements.map((element, i) => {
                        if (element.tool === "text") {
                          return (
                            <DrawText
                              element={element}
                              id={element.id}
                              i={i}
                              isDragable={isDragable}
                              elements={elements}
                              setElements={setElements}
                              handleObjectDragEnd={handleObjectDragEnd}
                              setSelectedTextId={(id) => {
                                if (tool) {
                                  return;
                                }
                                setSelectedTextId(id);
                              }}
                              selectedTextId={selectedTextId}
                            />
                          );
                        }
                      })}
                  </Layer>
                </Stage>
              </TransformComponent>
            </TransformWrapper>
          </section>
          <section className={styles.other__instruments}>
            <div className={styles.other__wrap}>
              <Button ico={fullScreen} onClick={handleFullscreen} />
              <Button
                ico={back}
                onClick={handleUndo}
                secondClass={currentStep === 0 && "disabled"}
              />
              <Button
                ico={forward}
                onClick={handleRedo}
                secondClass={currentStep === history.length - 1 && "disabled"}
              />
              {/* <Button
                ico={trash}
                onClick={deleteAll}
                secondClass={elements.length === 0 && "disabled"}
                ref={removeBtnRef}
              /> */}
              <button
                ref={removeBtnRef}
                className={clsx(
                  buttonStyles.setting__button,
                  buttonStyles[elements.length === 0 && "disabled"]
                )}
                onClick={deleteAll}
              >
                <img src={trash} alt="" />
              </button>
              <Button
                ico={axis}
                onClick={dragElements}
                secondClass={isDragable && "active"}
              />
              <Button ico={folder} onClick={getCanvasCapture} />
            </div>
          </section>
          <section className={styles.drawing__instruments}>
            <div className={styles.strategy__stages}>
              <p className={styles.stages__title}>этапы стратегии:</p>
              <div className={styles.stages}>
                <StrategyController
                  number="1"
                  active={part === "firstPart"}
                  onClick={() => changePart("firstPart")}
                />
                <StrategyController
                  number="2"
                  active={part === "secondPart"}
                  onClick={() => changePart("secondPart")}
                />
                <StrategyController
                  number="3"
                  active={part === "thirdPart"}
                  onClick={() => changePart("thirdPart")}
                />
                <StrategyController
                  number="4"
                  active={part === "fourthPart"}
                  onClick={() => changePart("fourthPart")}
                />
                <StrategyController
                  number="5"
                  active={part === "fifthPart"}
                  onClick={() => changePart("fifthPart")}
                />
                <StrategyController
                  number="6"
                  active={part === "sixthPart"}
                  onClick={() => changePart("sixthPart")}
                />
                <StrategyController
                  number="7"
                  active={part === "seventhPart"}
                  onClick={() => changePart("seventhPart")}
                />
                <StrategyController
                  number="8"
                  active={part === "eighthPart"}
                  onClick={() => changePart("eighthPart")}
                />
              </div>
            </div>
            <div className={styles.strategy__maps}>
              <p className={styles.map__title}>карта:</p>
              <div className={styles.maps}>
                <MapsController
                  map="rust"
                  mapName="rust"
                  secondClass={selectedMap === "rust" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="province"
                  mapName="province"
                  secondClass={selectedMap === "province" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="sandstone"
                  mapName="sandstone"
                  secondClass={selectedMap === "sandstone" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="sakura"
                  mapName="sakura"
                  secondClass={selectedMap === "sakura" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="dune"
                  mapName="dune"
                  secondClass={selectedMap === "dune" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="breeze"
                  mapName="breeze"
                  secondClass={selectedMap === "breeze" && "selected"}
                  selectMap={selectMap}
                />
                <MapsController
                  map="zone 9"
                  mapName="zone"
                  secondClass={selectedMap === "zone" && "selected"}
                  selectMap={selectMap}
                />
              </div>
            </div>
            <div className={styles.arrows}>
              <p className={styles.arrows__title}>настройка кисти:</p>
              <div className={styles.arrow__types}>
                <Button
                  ico={brushOne}
                  onClick={() => {
                    if (
                      tool === "pencil" &&
                      arrowType === "no-pointer" &&
                      !isDash
                    ) {
                      setTool(null);
                    } else {
                      setTool("pencil");
                      setArrowType("no-pointer");
                      setIsDash(false);
                    }
                  }}
                  secondClass={
                    tool === "pencil" &&
                    arrowType === "no-pointer" &&
                    !isDash &&
                    "active"
                  }
                />
                <Button
                  ico={brushTwo}
                  onClick={() => {
                    if (
                      tool === "pencil" &&
                      arrowType === "pointer-stroke" &&
                      !isDash
                    ) {
                      setTool(null);
                    } else {
                      setTool("pencil");
                      setArrowType("pointer-stroke");
                      setIsDash(false);
                    }
                  }}
                  secondClass={
                    tool === "pencil" &&
                    arrowType === "pointer-stroke" &&
                    !isDash &&
                    "active"
                  }
                />
                <Button
                  ico={brushThree}
                  onClick={() => {
                    if (
                      tool === "pencil" &&
                      arrowType === "no-pointer" &&
                      isDash
                    ) {
                      setTool(null);
                    } else {
                      setTool("pencil");
                      setArrowType("no-pointer");
                      setIsDash(true);
                    }
                  }}
                  secondClass={
                    tool === "pencil" &&
                    arrowType === "no-pointer" &&
                    isDash &&
                    "active"
                  }
                />
                <Button
                  ico={brushFour}
                  onClick={() => {
                    if (
                      tool === "pencil" &&
                      arrowType === "pointer-stroke" &&
                      isDash
                    ) {
                      setTool(null);
                    } else {
                      setTool("pencil");
                      setArrowType("pointer-stroke");
                      setIsDash(true);
                    }
                  }}
                  secondClass={
                    tool === "pencil" &&
                    arrowType === "pointer-stroke" &&
                    isDash &&
                    "active"
                  }
                />
                <Button
                  ico={brushFive}
                  onClick={() => selectArrow("pointer", false)}
                  secondClass={
                    tool === "arrow" &&
                    arrowType === "pointer" &&
                    !isDash &&
                    "active"
                  }
                />
                <Button
                  ico={brushSix}
                  onClick={() => selectArrow("pointer", true)}
                  secondClass={
                    tool === "arrow" &&
                    arrowType === "pointer" &&
                    isDash &&
                    "active"
                  }
                />
              </div>
              <div className={clsx(styles.arrow__settings, "flex-column")}>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={drawWidth}
                  onChange={(e) => setDrawWidth(Number(e.target.value))}
                />
                <input
                  min={20}
                  max={60}
                  type="range"
                  value={arrowBrightness}
                  onChange={setArrowBrightnessFunc}
                />
                <div className={styles.colors}>
                  {colorsArray.map((el, i) => {
                    return (
                      <div
                        style={{ background: el }}
                        key={i}
                        className={clsx(
                          styles.color,
                          color[1] === i && styles.active
                        )}
                        onClick={() => color !== el && setColor([el, i])}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className={styles.players__controlls}>
          <div className={styles.first__team}>
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 0 &&
                    el.playerAttrs.color === "yellow"
                ).length !== 0 && "disabled"
              )}
              ico={personOneYellow}
              onClick={() => addElement("player", { pos: 0, color: "yellow" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 1 &&
                    el.playerAttrs.color === "yellow"
                ).length !== 0 && "disabled"
              )}
              ico={personTwoYellow}
              onClick={() => addElement("player", { pos: 1, color: "yellow" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 2 &&
                    el.playerAttrs.color === "yellow"
                ).length !== 0 && "disabled"
              )}
              ico={personThreeYellow}
              onClick={() => addElement("player", { pos: 2, color: "yellow" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 3 &&
                    el.playerAttrs.color === "yellow"
                ).length !== 0 && "disabled"
              )}
              ico={personFourYellow}
              onClick={() => addElement("player", { pos: 3, color: "yellow" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 4 &&
                    el.playerAttrs.color === "yellow"
                ).length !== 0 && "disabled"
              )}
              ico={personFiveYellow}
              onClick={() => addElement("player", { pos: 4, color: "yellow" })}
            />
          </div>
          <div className={styles.grenades}>
            <Button
              secondClass={styles.player__button}
              ico={flashbang}
              onClick={() => addElement("flashbang")}
            />
            <Button
              secondClass={styles.player__button}
              ico={smoke}
              onClick={() => addElement("smoke")}
            />
            <Button
              secondClass={styles.player__button}
              ico={grenade}
              onClick={() => addElement("grenade")}
            />
            <Button
              secondClass={styles.player__button}
              ico={molotov}
              onClick={() => addElement("molotov")}
            />
          </div>
          <div className={styles.second__team}>
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 0 &&
                    el.playerAttrs.color === "blue"
                ).length !== 0 && "disabled"
              )}
              ico={personOneBlue}
              onClick={() => addElement("player", { pos: 0, color: "blue" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 1 &&
                    el.playerAttrs.color === "blue"
                ).length !== 0 && "disabled"
              )}
              ico={personTwoBlue}
              onClick={() => addElement("player", { pos: 1, color: "blue" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 2 &&
                    el.playerAttrs.color === "blue"
                ).length !== 0 && "disabled"
              )}
              ico={personThreeBlue}
              onClick={() => addElement("player", { pos: 2, color: "blue" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 3 &&
                    el.playerAttrs.color === "blue"
                ).length !== 0 && "disabled"
              )}
              ico={personFourBlue}
              onClick={() => addElement("player", { pos: 3, color: "blue" })}
            />
            <Button
              secondClass={clsx(
                elements.filter(
                  (el) =>
                    el.name === "player" &&
                    el.playerAttrs.pos === 4 &&
                    el.playerAttrs.color === "blue"
                ).length !== 0 && "disabled"
              )}
              ico={personFiveBlue}
              onClick={() => addElement("player", { pos: 4, color: "blue" })}
            />
          </div>
        </section>
      </div>
    </>
  );
};
export default Canvas;
