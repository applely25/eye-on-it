# eye-on-it

Watch the position of the last letter entered in the mouse or input window.

## Installation

### Install from NPM

We can install Swiper from NPM

```bash
$ npm install eye-on-it
```

When you use React

```js
// import eye-on-it JS
import { initEyeOnIt } from "eye-on-it";
// import eye-on-it styles
import "eye-on-it/style.css";

const App = () => {
  useEffect(() => {
    initEyeOnIt();
  }, []);
};
```

### Use eye-on-it from CDN

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/eye-on-it/dist/style.css"
/>
<script src="https://cdn.jsdelivr.net/npm/eye-on-it/dist/index.min.js"></script>
```

If you use ES module in the browser, there is a CDN version for that too,

```html
<script type="module">
  import { initEyeOnIt } from "https://cdn.jsdelivr.net/npm/eye-on-it/dist/index.mjs";

  initEyeOnIt();
</script>
```

### Download assets

If you want to use eye-on-it assets locally, you can directly download them from https://www.jsdelivr.com/package/npm/eye-on-it

## Add eye-on-it HTML Layout

Now, we need to add a basic eye-on-it layout to our app,

```html
<!-- The area that is followed by the mouse -->
<div class="eye-container">
  <!-- Parental area where eye-point moves -->
  <div>
    <!-- an element that follows -->
    <div class="eye-point">eye</div>
  </div>

  <!-- Eye-points look at the input -->
  <input class="eye-input" />
  <!-- The textarea the eye-points look at -->
  <textarea class="eye-textarea"></textarea>
</div>
```

## Example

But if I do this, I think it'll look weird and I don't understand.
So I prepared an example code.

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/82587113-a648-47ca-8385-23c1639c7b51" />

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eye On It Example</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/eye-on-it/dist/style.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/eye-on-it/dist/index.min.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body class="eye-container">
    <div>
      <div class="face">
        <div><div class="eye eye-point"></div></div>
        <div><div class="eye eye-point"></div></div>
      </div>

      <div class="input-wrapper">
        <input class="input eye-input" type="text" />
        <textarea class="textarea eye-textarea"></textarea>
      </div>
    </div>
    <textarea class="textarea long eye-textarea"></textarea>
  </body>
</html>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    margin-right: 40px;
  }
}

.face {
  margin: 0 auto;
  width: fit-content;
  display: flex;
  > div {
    width: 20px;
    height: 30px;
    border: 1px solid black;
    & + div {
      margin-left: 10px;
    }
  }
}

.eye {
  width: 8px;
  height: 12px;
  background-color: black;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input,
.textarea {
  width: 20vw;
  min-width: 300px;
  height: 24px;
  margin-top: 20px;
}
.textarea {
  height: 50px;
}
.textarea.long {
  height: 300px;
}
```
