# `uikitly-react` Components

`uikitly-react` is a TypeScript library that provides two customizable react components inspired by GitHub's contribution tracker and status tracking chart. 
Both components support light and dark themes out of the box, allowing you to easily adapt them to your design preferences.

The goal of this library is to help developers save working hours by reusing ready-to-use, flexible table-based components.

> Developed by [Sebastian Marat Urdanegui Bisalaya](https://sebastianurdanegui.vercel.app/)

![uikitly-react-light](https://res.cloudinary.com/drzumfcdp/image/upload/v1757027513/projects/Captura_de_pantalla_2025-09-04_a_la_s_6.09.21_p._m._kwjeue.png)

![uikitly-react-dark](https://res.cloudinary.com/drzumfcdp/image/upload/v1757027513/projects/Captura_de_pantalla_2025-09-04_a_la_s_6.10.09_p._m._byvxnn.png)

## Installing

Using npm:
```bash
npm install uikitly-react
```

Using pnpm:
```bash
pnpm add uikitly-react
```

## Components

### Usage - Habit Tracking

**Component properties**

| Prop           | Required | Type             | Description |
| -------------- | :------: | :--------------: | ----------- |
| bgColor        | ❌       | `string`         | Background color of cells that have no activity. <br> Default: `bg-[#EFF2F5] dark:bg-[#151B23]`. |
| className      | ❌       | `string`         | Additional CSS classes |
| colors         | ❌       | `ColorRank[]`    | Array of objects used to fill the background of each cell based on its activity. <br> By default, this array uses colors from the GitHub contribution tracker. |
| data           | ✅       | `StatsList[]`    | Array of objects that contains the user data based on activity (`value`) of each day (`date`). |
| legendLabelMax | ❌       | `string`         | Legend name of **minimum** value. <br> Default: `'Less'`. |
| legendLabelMin | ❌       | `string`         | Legend name of **maximum** value. <br> Default: `'More'`. |
| months         | ❌       | `string[]`       | Array of strings with the months. <br> Length: exactly 12. |
| onCellClick    | ❌       | `(data: { date: string; value: number; }) => void` | Callback function when a cell is clicked |
| textColor      | ❌       | `string`         | Default: `text-[#1f2328] dark:text-[#f0f6fc]` |
| tooltipLabel   | ❌       | `string`         | Detail tasks of each day. <br> Default: `'tasks on'`. |
| weekDays       | ❌       | `string[]`       | Array of strings with the days of the week. <br> Length: exactly 7. |


Types:
| Type | Description |
| --- | --- |
| ColorRank | { min: number; max: number; color: string; } |
| StatsList | { date: string; value: number; } |


#### Example

Using React with TypeScript:

```tsx

```

### Usage - Status Tracking

**Component properties**

| Prop             | Required | Type                   | Description |
| ---------------- | :------: | :--------------------: | ----------- |
| bgRankEmpty      | ❌       | `string`               | Background color of rectangle without data in light theme. <br> Default: `#EFF2F5`. |
| bgRankEmptyDark  | ❌       | `string`               | Background color of rectangle without data in dark theme. <br> Default: `#151B23`. |
| bgSpacer         | ❌       | `string`               | Background color of spacer. <br> Default: `bg-[#2a2a2a] dark:bg-[#aaaaaa]`. |
| className        | ❌       | `string`               | Additional CSS classes |
| data             | ✅       | `TooltipStatus[]`      | Array of objects that contains the activity of your product or service. |
| fill             | ❌       | `Record<string, string>` | Object used to fill the background of each rectangle based on its level. <br> The level types are `'zero'`, `'low'`, `'high'`, `null`. <br> By default, if the level type is `null`, the color is `bgRankEmpty` in light theme and `bgRankEmptyDark` in dark mode. |
| fromDateLabel    | ❌       | `string`               | Indicates the legend based on length of the period of time that the user is analyzing. <br> Default: `'days ago'`. |
| status           | ✅       | `string`               | Indicator of the latest status of the analytic chart. |
| textColor        | ❌       | `string`               | Default: `text-[#1f2328] dark:text-[#f0f6fc]` |
| titleComponent   | ✅       | `string`               | Main title of the analytic chart. |
| toDateLabel      | ❌       | `string`               | Default: `'Today'`. |
| tooltipContentMark | ✅     | `string`               | Description of the main metric of that chart. |
| uptimeLabel      | ❌       | `string`               | Default: `'uptime'`. |


Types:
| Type | Description |
| --- | --- |
| TooltipStatus | { date: string; mainTitle: string \| null; content: string; level: 'zero' \| 'low' \| 'high' \| null; } |


#### Example

Using React with TypeScript:

```tsx

```

## Contributing

We welcome contributions from the community! 🎉  
If you’d like to improve this project, follow these steps:

1. **Fork** this repository and clone your fork:

```bash
git clone https://github.com/your-username/uikitly-react.git
cd uikitly-react
pnpm install
```

2. **Create a new branch for your feature or fix:**

```bash
git switch -c my-new-feature
```

3. **Make your changes and commit them with a clear, descriptive message:**

```bash
git add .
git commit -m "feat: add new feature to improve X"
```

4. **Push your branch to your fork:**

```bash
git push origin my-new-feature
```

5. **Open a Pull Request to the main branch of this repository.**

Please include a description of your changes and why they are useful.

### License

MIT