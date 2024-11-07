# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

A/B Testing
------------------------
COLOR THEME:

tailwind.config.js {
  colors: {
    'text': '#080a0f',
    'background': '#f2f4f9',
    'primary': '#5d78ac',
    'secondary': '#c69fce',
    'accent': '#c083b3',
   },
   ...
}
main.css
@layer base {
  :root {
    --text: #050a0a;
    --background: #f8fcfc;
    --primary: #569eae;
    --secondary: #c7a2d2;
    --accent: #c280b1;
  }
  .dark {
    --text: #f5fafa;
    --background: #030707;
    --primary: #5199a9;
    --secondary: #522d5d;
    --accent: #7f3d6f;
  }
},

1.
colors: {
 'text': 'var(--text)',
 'background': 'var(--background)',
 'primary': 'var(--primary)',
 'secondary': 'var(--secondary)',
 'accent': 'var(--accent)',
},

@layer base {
  :root {
    --text: #050a0a;
    --background: #f8fcfc;
    --primary: #569eae;
    --secondary: #c7a2d2;
    --accent: #c280b1;
  }
  .dark {
    --text: #f5fafa;
    --background: #030707;
    --primary: #5199a9;
    --secondary: #522d5d;
    --accent: #7f3d6f;
  }
},


2.
colors: {
 'text': 'var(--text)',
 'background': 'var(--background)',
 'primary': 'var(--primary)',
 'secondary': 'var(--secondary)',
 'accent': 'var(--accent)',
},
@layer base {
  :root {
    --text: #091015;
    --background: #eef3f7;
    --primary: #2c4563;
    --secondary: #c983c7;
    --accent: #aa4b76;
  }
  .dark {
    --text: #eaf1f6;
    --background: #080d11;
    --primary: #9cb5d3;
    --secondary: #7c367a;
    --accent: #b45580;
  }
},

You have to feed keychain the _cert outputted by vite.

openssl genrsa -out key.pem 2048
openssl req -new -sha256 -key key.pem -out csr.csr (E for common name, same on on vite config for ssl name) dont forget to restart chrome after importing key
openssl req -x509 -sha256 -days 90 -key key.pem -in csr.csr -out certificate.pem
openssl req -in csr.csr -text -noout 
