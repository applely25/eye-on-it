export function initEyeOnIt(): void {
  let isFocused = false;

  // 움직이는 point, 마우스 움직이는 영역, input, textarea
  const points: NodeListOf<Element> = document.querySelectorAll(".eye-point");
  const containers: NodeListOf<Element> =
    document.querySelectorAll(".eye-container");
  const inputs: NodeListOf<Element> = document.querySelectorAll(".eye-input");
  const textareas: NodeListOf<Element> =
    document.querySelectorAll(".eye-textarea");

  points.forEach((point) => {
    const pointParent = point.parentElement;
    if (!pointParent) return;
    pointParent.classList.add("eye-pointParent");
    point.classList.add("eye-point");
  });

  // 이벤트 추가
  containers.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      if (!isFocused || el.classList.contains("always"))
        mouseCalc(e as MouseEvent);
    });
  });

  inputs.forEach((el) => {
    el.addEventListener("input", (e) => {
      inputCalc(el as HTMLElement, e);
    });
    el.addEventListener("focus", () => {
      isFocused = true;
    });
    el.addEventListener("blur", () => {
      isFocused = false;
    });
  });

  textareas.forEach((el) => {
    el.addEventListener("input", (e) => {
      textareaCalc(el as HTMLElement, e as InputEvent);
    });
    el.addEventListener("focus", () => {
      isFocused = true;
    });
    el.addEventListener("blur", () => {
      isFocused = false;
    });
  });

  // point를 움직이는 함수, 부모 기준으로 동그란 모양까지만 움직임
  const movePoints = ({ x, y }: { x: number; y: number }) => {
    points.forEach((point) => {
      const pointParent = point.parentElement;
      if (!pointParent) return;
      const eyeRect = pointParent.getBoundingClientRect();
      const eyeX = eyeRect.left + eyeRect.width / 2;
      const eyeY = eyeRect.top + eyeRect.height / 2;

      const deltaX = x - eyeX;
      const deltaY = y - eyeY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistanceX =
        eyeRect.width / 2 - (point as HTMLElement).offsetWidth / 2;
      const maxDistanceY =
        eyeRect.height / 2 - (point as HTMLElement).offsetHeight / 2;

      const moveX = (deltaX / distance) * Math.min(distance, maxDistanceX);
      const moveY = (deltaY / distance) * Math.min(distance, maxDistanceY);

      (
        point as HTMLElement
      ).style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  };

  // text 크기 확인을 위한 el들
  const layoutTrash = document.createElement("div");
  layoutTrash.className = "eye-layoutTrash";
  document.body.appendChild(layoutTrash);

  const inputSpan = document.createElement("span");
  inputSpan.className = "eye-hidden eye-inputSpan";

  const textareaDiv = document.createElement("div");
  textareaDiv.className = "eye-hidden eye-textareaDiv";

  layoutTrash.appendChild(inputSpan);
  layoutTrash.appendChild(textareaDiv);

  // input text 크기 확인
  const getTextWidth = (text: string, input: HTMLElement) => {
    const style = window.getComputedStyle(input);
    inputSpan.style.font = style.font;
    inputSpan.style.letterSpacing = style.letterSpacing;
    inputSpan.style.fontSize = style.fontSize;
    inputSpan.style.fontFamily = style.fontFamily;
    inputSpan.style.fontWeight = style.fontWeight;
    inputSpan.style.maxWidth = `calc(calc(${style.width} - ${style.paddingLeft}) - ${style.paddingRight})`;
    inputSpan.textContent = text || " ";

    const width = inputSpan.offsetWidth;

    return { width };
  };

  // textarea text 크기 확인
  const getTextareaSize = (text: string, textarea: HTMLElement) => {
    const style = window.getComputedStyle(textarea);

    textareaDiv.style.font = style.font;
    textareaDiv.style.letterSpacing = style.letterSpacing;
    textareaDiv.style.fontSize = style.fontSize;
    textareaDiv.style.fontFamily = style.fontFamily;
    textareaDiv.style.fontWeight = style.fontWeight;
    textareaDiv.style.lineHeight = style.lineHeight;
    textareaDiv.style.maxWidth = `calc(calc(${style.width} - ${style.paddingLeft}) - ${style.paddingRight})`;
    textareaDiv.style.maxHeight = `calc(calc(${style.height} - ${style.paddingTop}) - ${style.paddingBottom})`;

    textareaDiv.textContent = text || " ";

    const width = textareaDiv.offsetWidth;
    const height = textareaDiv.offsetHeight;

    return { width, height };
  };

  // 마우스 위치 계산
  let animationFrameId: number | null = null;

  const mouseCalc = (e: MouseEvent) => {
    if (animationFrameId) return;
    animationFrameId = requestAnimationFrame(() => {
      movePoints({
        x: e.clientX,
        y: e.clientY,
      });
      animationFrameId = null;
    });
  };

  // input 입력되고 있는 위치 계산
  const inputCalc = (el: HTMLElement, e: Event) => {
    const style = window.getComputedStyle(el);
    const elRect = el.getBoundingClientRect();
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const { width } = getTextWidth((e.target as HTMLInputElement).value, el);

    movePoints({
      x: elRect.left + paddingLeft + width,
      y:
        elRect.top +
        (elRect.height - paddingTop - paddingBottom) / 2 +
        paddingTop,
    });
  };

  // textarea 입력되고 있는 위치 계산
  const textareaCalc = (el: HTMLElement, e: Event) => {
    const style = window.getComputedStyle(el);
    const elRect = el.getBoundingClientRect();
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingTop = parseFloat(style.paddingTop);
    const { width, height } = getTextareaSize(
      (e.target as HTMLInputElement).value,
      el
    );

    movePoints({
      x: elRect.left + paddingLeft + width,
      y: elRect.top + paddingTop + height,
    });
  };
}

const eyeOnIt = {
  initEyeOnIt: initEyeOnIt,
};

export default eyeOnIt;
