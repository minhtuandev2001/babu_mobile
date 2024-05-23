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

npm install react-native-linear-gradient --save
```

### icon

```
"@expo/vector-icons": "^12.0.0",
```

#### Home page

![home](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505250/wlxwwcfwtbgpa9tnt0pz.png)

#### Search

![search](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505376/pyy3fzoxeq4jn14egw56.png)

#### Follow page

![follow](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505457/ih1k9tkig3u5dg2riw3h.png)

#### Profile page

![profile](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505508/j6llpgk0durvxipjghiu.png)

#### Chat page

![chat](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505577/oo8gdlhyxlf0ydfwukpb.png)

#### Create group chat

![group](https://res.cloudinary.com/minhtuandev1/image/upload/v1716505649/x6fnlnnzb7sgcn5n1tsa.png)
