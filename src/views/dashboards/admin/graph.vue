<template>
  <div class="graph-container" ref="container">
    <div style="position: relative;">
      <canvas
        ref="canvas"
        :height="canvasHeight"
        style="border: 1px solid #ccc; inline-size: 100%;"
        @mousemove="handleMouseMove"
        @mouseleave="hideTooltip"
      ></canvas>
      <div
        v-if="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
        class="graph-tooltip"
      >
        {{ tooltip.label }}: {{ tooltip.value }}
      </div>
    </div>

    <div class="graph-types-wrapper">
      <button @click="scrollLeft" class="scroll-btn">‹</button>

      <div class="graph-types" ref="cardContainer">
        <div
          v-for="type in graphTypes"
          :key="type.value"
          class="graph-type-token"
          :class="{ active: selectedType === type.value }"
          @click="selectGraphType(type.value)"
        >
          <div class="token-content">
            <div class="token-label">
              <div class="token-title">{{ type.label }}</div>
              <div class="token-value">{{ getFirstValue() }}</div>
            </div>

            <div class="token-graph">
              <canvas
                :ref="el => tinyCanvases[type.value] = el"
                width="80"
                height="40"
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      <button @click="scrollRight" class="scroll-btn">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
const props = defineProps<{
  todayVisitor: number;
  allVisitor: number;
  todayRegistered: number;
  allRegistered: number;
  height?: number;
}>();
const container = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const cardContainer = ref<HTMLDivElement | null>(null);

const canvasHeight = 300;

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  label: '',
  value: '',
});

const selectedType = ref('bar');

const labels = ["Today Visitor", "All Visitor", "Today Registered", "All Registered"];
const values = [120, 5200, 30, 3000];
// use watch to assign props value to values
watch(() => [props.todayVisitor, props.allVisitor, props.todayRegistered, props.allRegistered], () => {
  values[0] = props.todayVisitor;
  values[1] = props.allVisitor;
  values[2] = props.todayRegistered;
  values[3] = props.allRegistered;
  drawGraph();
})
const resizeCanvas = () => {
  if (canvas.value && container.value) {
    canvas.value.width = container.value.clientWidth;
    drawGraph();
  }
};

const drawGraph = () => {
  if (!canvas.value) return;
  const c = canvas.value;
  const context = c.getContext("2d");
  if (!context) return;
  ctx.value = context;

  context.clearRect(0, 0, c.width, c.height);

  switch (selectedType.value) {
    case "line":
      drawLineChart(context);
      break;
    case "bar":
      drawBarChart(context);
      break;
    case "pie":
      drawPieChart(context);
      break;
  }
};


const drawLineChart = (ctx: CanvasRenderingContext2D) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const step = (width - margin * 2) / (values.length - 1);
  const maxValue = Math.max(...values);

  ctx.beginPath();
  ctx.strokeStyle = "#3498db";
  ctx.lineWidth = 2;

  values.forEach((value, index) => {
    const x = margin + index * step;
    const y = height - (value / maxValue) * (height - margin * 2) - margin;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  values.forEach((value, index) => {
    const x = margin + index * step;
    const y = height - (value / maxValue) * (height - margin * 2) - margin;

    // Draw points
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();

    // Draw value above point
    ctx.fillStyle = "#666";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(value.toString(), x, y - 10);

    // Draw label below point
    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.fillText(labels[index], x, height - margin + 15);
  });
};

const drawBarChart = (ctx: CanvasRenderingContext2D) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const barWidth = (width - margin * 2) / values.length;
  const maxValue = Math.max(...values);

  values.forEach((value, index) => {
    const x = margin + index * barWidth;
    const barHeight = (value / maxValue) * (height - margin * 2);

    // Draw bar
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(x, height - barHeight - margin, barWidth * 0.6, barHeight);

    // Draw label under bar
    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";

    const labelX = x + (barWidth * 0.6) / 2;
    const labelY = height - margin + 15;

    ctx.fillText(labels[index], labelX, labelY);

    // Draw value above bar
    ctx.fillStyle = "#666";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(value.toString(), labelX, height - barHeight - margin - 10);
  });
};


const drawPieChart = (ctx: CanvasRenderingContext2D) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 4;
  const total = values.reduce((acc, val) => acc + val, 0);

  let startAngle = 0;
  values.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    // Draw pie slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = `hsl(${(index / values.length) * 360}, 70%, 60%)`;
    ctx.fill();

    // Draw labels outside slice
    const midAngle = startAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(midAngle) * (radius + 30);
    const labelY = centerY + Math.sin(midAngle) * (radius + 30);

    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[index], labelX, labelY);

    // Draw value under label
    ctx.fillStyle = "#666";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(value.toString(), labelX, labelY + 15);

    startAngle += sliceAngle;
  });
};


const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const step = (width - margin * 2) / (values.length - (selectedType.value === 'line' ? 1 : 0));
  const maxValue = Math.max(...values);

  let found = false;

  if (selectedType.value === "line") {
    values.forEach((value, index) => {
      const cx = margin + index * step;
      const cy = height - (value / maxValue) * (height - margin * 2) - margin;
      if (Math.abs(x - cx) < 10 && Math.abs(y - cy) < 10) {
        tooltip.value = {
          visible: true,
          x: cx + 10,
          y: cy - 10,
          label: labels[index],
          value: value.toString(),
        };
        found = true;
      }
    });
  } else if (selectedType.value === "bar") {
    const barWidth = (width - margin * 2) / values.length;
    values.forEach((value, index) => {
      const bx = margin + index * barWidth;
      const bh = (value / maxValue) * (height - margin * 2);
      if (x >= bx && x <= bx + barWidth * 0.6 &&
          y >= height - bh - margin &&
          y <= height - margin) {
        tooltip.value = {
          visible: true,
          x: bx + barWidth * 0.3,
          y: height - bh - margin - 10,
          label: labels[index],
          value: value.toString(),
        };
        found = true;
      }
    });
  } else if (selectedType.value === "pie") {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= radius) {
      const total = values.reduce((acc, val) => acc + val, 0);
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle += 2 * Math.PI;

      let startAngle = 0;
      for (let i = 0; i < values.length; i++) {
        const sliceAngle = (values[i] / total) * 2 * Math.PI;
        if (angle >= startAngle && angle <= startAngle + sliceAngle) {
          tooltip.value = {
            visible: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 10,
            label: labels[i],
            value: values[i].toString(),
          };
          found = true;
          break;
        }
        startAngle += sliceAngle;
      }
    }
  }

  if (!found) {
    tooltip.value.visible = false;
  }
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};

const selectGraphType = (type: string) => {
  selectedType.value = type;
  nextTick(() => {
    drawGraph();
  });
};

const scrollLeft = () => {
  if (cardContainer.value) {
    cardContainer.value.scrollLeft -= 100;
  }
};

const scrollRight = () => {
  if (cardContainer.value) {
    cardContainer.value.scrollLeft += 100;
  }
};

const tinyCanvases = ref<Record<string, HTMLCanvasElement | null>>({});

const graphTypes = [
  { label: "Line", value: "line" },
  { label: "Bar", value: "bar" },
  // { label: "Pie", value: "pie" },
];

const getFirstValue = () => {
  return values[0];
};

const drawTinyGraph = () => {
  for (const [type, canvas] of Object.entries(tinyCanvases.value)) {
    if (!canvas) continue;

    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (type) {
      case 'line':
        drawTinyLine(ctx, canvas);
        break;
      case 'bar':
        drawTinyBar(ctx, canvas);
        break;
      case 'pie':
        drawTinyPie(ctx, canvas);
        break;
    }
  }
};

const drawTinyLine = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const w = canvas.width;
  const h = canvas.height;
  ctx.beginPath();
  ctx.strokeStyle = "#2980b9";
  ctx.lineWidth = 2;
  values.forEach((value, index) => {
    const x = (index + 1) * (w / (values.length + 1));
    const y = h - (value / Math.max(...values)) * h;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
};

const drawTinyBar = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const w = canvas.width;
  const h = canvas.height;
  const barWidth = w / (values.length * 2);
  ctx.fillStyle = "#27ae60";
  values.forEach((value, index) => {
    const x = index * (barWidth * 2) + barWidth;
    const barHeight = (value / Math.max(...values)) * h;
    ctx.fillRect(x, h - barHeight, barWidth, barHeight);
  });
};

const drawTinyPie = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 3;
  let start = 0;
  const total = values.reduce((a, b) => a + b, 0);
  values.forEach((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = `hsl(${i * 90}, 70%, 60%)`;
    ctx.fill();
    start += slice;
  });
};

onMounted(() => {
  resizeCanvas();
  drawTinyGraph();
  window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
});

watch(tinyCanvases, () => {
  nextTick(() => {
    drawTinyGraph();
  });
});
</script>
<style scoped>
.graph-container {
  inline-size: 100%;
}

.graph-tooltip {
  position: absolute;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 12px;
  padding-block: 4px;
  padding-inline: 8px;
  pointer-events: none;
  transform: translate(-50%, -100%);
}

.graph-types-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-block-start: 10px;
}

.graph-types {
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.graph-types::-webkit-scrollbar {
  display: none;
}

.graph-type-card {
  flex: 0 0 auto;
  border-radius: 8px;
  background: #f0f0f0;
  cursor: pointer;
  margin-block: 0;
  margin-inline: 4px;
  padding-block: 8px;
  padding-inline: 16px;
  user-select: none;
  white-space: nowrap;
}

.graph-type-card.active {
  background: #3498db;
  color: #fff;
}

.scroll-btn {
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 24px;
  user-select: none;
}

.graph-types-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-block-start: 10px;
}

.graph-types {
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
  padding-block: 10px;
  padding-inline: 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.graph-types::-webkit-scrollbar {
  display: none;
}

.graph-type-token {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  background: #f8f8f8;
  block-size: 60px;
  box-shadow: 0 1px 3px rgba(0,0,0,20%);
  cursor: pointer;
  inline-size: 140px;
  margin-block: 0;
  margin-inline: 8px;
}

.graph-type-token.active {
  background: #3498db;
  color: white;
}

.token-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
}

.token-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.token-title {
  font-size: 12px;
  font-weight: bold;
}

.token-value {
  color: #666;
  font-size: 14px;
}

.token-graph {
  block-size: 40px;
  inline-size: 80px;
}

</style>
