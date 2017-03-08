# Pre Charts

## Installation

```
npm install --save pre-charts
```

## AreaChart

![alt tag](./area.png)

```js
let data = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 9800, protected: 2290},
    ...
];

let meta = [
    {dataKey: "public", name: "Public", unit: "piece"},
    {dataKey: "private", name: "Private", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];
...

<AreaChart data={data} width={400} height={250} meta={meta}/>

```

## BarChart

![alt tag](./bar.png)

```js
let data = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 9800, protected: 2290},
    ...
];

let meta = [
    {dataKey: "public", name: "Public", unit: "piece"},
    {dataKey: "private", name: "Private", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];
...

<BarChart data={data} width={400} height={250} meta={meta}/>

```

## LineChart

![alt tag](./line.png)

```js
let data = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 9800, protected: 2290},
    ...
];

let meta = [
    {dataKey: "public", name: "Public", unit: "piece"},
    {dataKey: "private", name: "Private", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];
...

<LineChart data={data} width={400} height={250} meta={meta}/>

```


## ScatterChart

![alt tag](./scatter.png)


```js
const dataA = [
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200},
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200}
];

const dataB = [
    {x: 200, y: 260, z: 240},
    {x: 240, y: 290, z: 220},
    {x: 190, y: 290, z: 250},
    {x: 198, y: 250, z: 210},
    {x: 180, y: 280, z: 260},
    {x: 210, y: 220, z: 230}];

const data = [
    {name: "A", data: dataA},
    {name: "B", data: dataB}
];

let meta = [
    {dataKey: "x", unit: "cm", name: "X"},
    {dataKey: "y", unit: "cm", name: "Y"},
    {dataKey: "z", unit: "cm", name: "Z"}
];

...

<ScatterChart data={data} width={400} height={250} meta={meta}/>

```


## PieChart

![alt tag](./pie.png)

```js

let data = [
    {
        value: 1500,
        label: "A",
        key: "0",
        unit: "ms"
    },
    {
        value: 2500,
        label: "B",
        key: "1",
        unit: "ms"
    },
    {
        value: 3000,
        label: "C",
        key: "3",
        unit: "ms"
    }
];

...

<PieChart size={200} data={data}/>

```

### Quick Start

#### 1. Get the latest version
You can start by cloning the latest version of pre-charts.

#### 2. Run `npm install`
This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. How to start project in Development Mode

This will start the development server and serve site application.

```shell
$ npm start
```
  
Open Browser and enter `http://localhost:3000` (default) 

### How to Build for Production

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```

### How to Build for Site

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run site
```
