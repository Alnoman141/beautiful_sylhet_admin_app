<template>
  <div class="graph-container">
    <div class="controls text-end">
      <label for="chartType">Select Chart Type:</label>
      <select class="border rounded text-center px-1 py-1 mx-1" id="chartType" v-model="selectedChart" @change="drawGraph">
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="scatter">Scatter Chart</option>
        <option value="histogram">Histogram</option>
        <option value="area">Area Chart</option>
        <option value="funnel">Funnel Chart</option>
        <option value="waterfall">Waterfall Chart</option>
        <option value="bubble">Bubble Chart</option>
      </select>
    </div>
    
    <canvas
      ref="canvas"
      :height="canvasHeight"
      style="  border: 1px solid #ccc; background-color: #f9f9f9; block-size: 100dvh;inline-size: 100%;"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  todayVisitor: number;
  allVisitor: number;
  todayRegistered: number;
  allRegistered: number;
  height?: number;
}>();

const selectedChart = ref("bar");
const canvas = ref<HTMLCanvasElement | null>(null);
const canvasHeight = ref(props.height || 300);

const dataset = ref([
  { label: "Visitor", value: props.todayVisitor },
  { label: " Visitors", value: props.allVisitor },
  { label: "Tourist", value: props.todayRegistered },
  { label: "Tourists", value: props.allRegistered },
]);

watch(
  () => [props.todayVisitor, props.allVisitor, props.todayRegistered, props.allRegistered],
  () => {
    dataset.value = [
      { label: "Visitor", value: props.todayVisitor },
      { label: "Visitors", value: props.allVisitor },
      { label: "Tourist", value: props.todayRegistered },
      { label: "Tourists", value: props.allRegistered },
    ];
    drawGraph();
  }
);

const drawGraph = () => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  switch (selectedChart.value) {
    case "bar":
      drawBarChart(ctx);
      break;
    case "line":
      drawLineChart(ctx);
      break;
    case "pie":
      drawPieChart(ctx);
      break;
    case "scatter":
      drawScatterChart(ctx);
      break;
    case "histogram":
      drawHistogramChart(ctx);
      break;
    case "area":
      drawAreaChart(ctx);
      break;
    case "funnel":
      drawFunnelChart(ctx);
      break;
    case "waterfall":
      drawWaterfallChart(ctx);
      break;
    case "bubble":
      drawBubbleChart(ctx);
      break;
  }
};

const drawBarChart = (ctx: CanvasRenderingContext2D) => {
  const barWidth = 30;
  const gap = 20;
  const baseY = canvas.value!.height - 30;
  const maxValue = Math.max(...dataset.value.map(d => d.value));

  dataset.value.forEach((data, index) => {
    const height = (data.value / maxValue) * (canvas.value!.height - 100);
    const x = gap + index * (barWidth + gap);

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(x, baseY - height, barWidth, height);

    ctx.fillStyle = "#000";
    ctx.fillText(data.label, x, baseY + 20);
  });
};

const drawLineChart = (ctx: CanvasRenderingContext2D) => {
  const baseY = canvas.value!.height - 30;
  const maxValue = Math.max(...dataset.value.map(d => d.value));
  const stepX = canvas.value!.width / (dataset.value.length + 1);

  ctx.beginPath();
  ctx.strokeStyle = "#2196f3";
  ctx.lineWidth = 2;
  dataset.value.forEach((data, index) => {
    const x = (index + 1) * stepX;
    const y = baseY - (data.value / maxValue) * (canvas.value!.height - 100);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    ctx.fillStyle = "#2196f3";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.stroke();
};

const drawPieChart = (ctx: CanvasRenderingContext2D) => {
  const total = dataset.value.reduce((acc, val) => acc + val.value, 0);
  let startAngle = 0;
  const centerX = canvas.value!.width / 2;
  const centerY = canvas.value!.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  dataset.value.forEach(data => {
    const sliceAngle = (data.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();

    ctx.fillStyle = randomColor();
    ctx.fill();
    startAngle += sliceAngle;
  });
};

const drawScatterChart = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#673ab7";
  dataset.value.forEach((data, index) => {
    const x = (index + 1) * 20;
    const y = canvas.value!.height - (data.value / 20) * canvas.value!.height;

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawHistogramChart = (ctx: CanvasRenderingContext2D) => {
  drawBarChart(ctx);
};

const drawAreaChart = (ctx: CanvasRenderingContext2D) => {
  const baseY = canvas.value!.height - 30;
  const maxValue = Math.max(...dataset.value.map(d => d.value));
  const stepX = canvas.value!.width / (dataset.value.length + 1);

  ctx.beginPath();
  ctx.moveTo(0, baseY);
  dataset.value.forEach((data, index) => {
    const x = (index + 1) * stepX;
    const y = baseY - (data.value / maxValue) * (canvas.value!.height - 100);
    ctx.lineTo(x, y);
  });
  ctx.lineTo(canvas.value!.width, baseY);
  ctx.closePath();

  ctx.fillStyle = "rgba(33,150,243,0.5)";
  ctx.fill();
};

const drawFunnelChart = (ctx: CanvasRenderingContext2D) => {
  const startWidth = canvas.value!.width * 0.8;
  const endWidth = canvas.value!.width * 0.3;
  const stepHeight = canvas.value!.height / dataset.value.length;

  dataset.value.forEach((data, index) => {
    const topWidth = startWidth - (startWidth - endWidth) * (index / dataset.value.length);
    const bottomWidth = startWidth - (startWidth - endWidth) * ((index + 1) / dataset.value.length);

    ctx.beginPath();
    ctx.moveTo((canvas.value!.width - topWidth) / 2, index * stepHeight);
    ctx.lineTo((canvas.value!.width + topWidth) / 2, index * stepHeight);
    ctx.lineTo((canvas.value!.width + bottomWidth) / 2, (index + 1) * stepHeight);
    ctx.lineTo((canvas.value!.width - bottomWidth) / 2, (index + 1) * stepHeight);
    ctx.closePath();

    ctx.fillStyle = randomColor();
    ctx.fill();
  });
};

const drawWaterfallChart = (ctx: CanvasRenderingContext2D) => {
  const barWidth = 60;
  const gap = 40;
  const baseY = canvas.value!.height - 30;
  let currentY = baseY;
  const maxValue = Math.max(...dataset.value.map(d => d.value));

  dataset.value.forEach((data, index) => {
    const height = (data.value / maxValue) * (canvas.value!.height - 100);
    const x = gap + index * (barWidth + gap);

    ctx.fillStyle = index % 2 === 0 ? "#4caf50" : "#f44336";
    ctx.fillRect(x, currentY - height, barWidth, height);

    currentY -= height / 2;
  });
};

const drawBubbleChart = (ctx: CanvasRenderingContext2D) => {
  dataset.value.forEach((data, index) => {
    const radius = (data.value / 100) * 50;
    const x = (index + 1) * 100;
    const y = canvas.value!.height / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = randomColor();
    ctx.fill();
  });
};

const randomColor = () => {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
};

onMounted(() => {
  drawGraph();
});
</script>

<style scoped>
.graph-container {
  inline-size: 100%;
}

.controls {
  margin-block-end: 10px;
}
</style>
