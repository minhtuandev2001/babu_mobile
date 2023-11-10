### cài đặt một số thư viện cần thiết

```
cẩn thận phiên bản
npm install nativewind
npm install tailwindcss@3.3.2 --save-dev
```

#### file tailwind.config.js

```
module.exports = {
  content: [],
  content: ["./App.{js,jsx,ts,tsx}", "./screen/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./firebase/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graycustom: "#D9D9D9",
        orangecustom: "#FF6838",
        violetcustom: "#5B0888",
        darkbg: "#292841",
      },
    },
  },
  plugins: [],
};
```

#### file babel.config.js

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### navigation

```
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/stack

<!-- qua ve -->
npm install @react-navigation/native-stack
<!-- tab bar duoi -->
npm install @react-navigation/bottom-tabs
<!-- kéo qua kéo lại -->
npm install react-native-pager-view

npm install react-native-gesture-handler
```
