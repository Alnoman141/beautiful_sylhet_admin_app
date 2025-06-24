<template>
  <div class="graph-container" ref="container">
    <div style="position: relative;">
      <canvas
        ref="canvas"
        :height="canvasHeight"
        style="border: 1px solid #ccc; border-radius: 8px; inline-size: 100%;"
        @mousemove="handleMouseMove"
        @mouseleave="hideTooltip"
      ></canvas>
      <div
        v-if="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
        class="graph-tooltip"
      >
        {{ tooltip.label }}<br />
        This Year: {{ tooltip.thisYear }}<br />
        Last Year: {{ tooltip.lastYear }}
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
              <div class="token-value">{{ thisYearValues.reduce((a, b) => a + b, 0) }}</div>
            </div>
            <div class="token-graph">
              <canvas
                :ref="el => (tinyCanvases[type.value] = el)"
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  labels: string[];
  values: { thisYear: number[]; lastYear: number[] };
  height?: number;
}>();

const container = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const cardContainer = ref<HTMLDivElement | null>(null);
const tinyCanvases = ref<Record<string, HTMLCanvasElement | null>>({});
const canvasHeight = 300;
const selectedType = ref('bar');

const labels = computed(() => props.labels);
const thisYearValues = computed(() => props.values.thisYear);
const lastYearValues = computed(() => props.values.lastYear);

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  label: '',
  thisYear: '',
  lastYear: ''
});

watch(() => props.values, () => {
  drawGraph();
  drawTinyGraph();
});

const resizeCanvas = () => {
  if (canvas.value && container.value) {
    canvas.value.width = container.value.clientWidth;
    drawGraph();
  }
};

onMounted(() => {
  resizeCanvas();
  drawTinyGraph();
  window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
});

watch(tinyCanvases, () => nextTick(drawTinyGraph));

const drawGraph = () => {
  if (!canvas.value) return;
  const context = canvas.value.getContext("2d");
  if (!context) return;
  ctx.value = context;
  context.clearRect(0, 0, canvas.value.width, canvasHeight);

  switch (selectedType.value) {
    case "line": drawLineChart(context); break;
    case "bar": drawBarChart(context); break;
    case "area": drawAreaChart(context); break;
    case "pie": drawPieChart(context); break;
    case "donut": drawDonutChart(context); break;
  }
};

const drawLineChart = (ctx: CanvasRenderingContext2D) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const step = (width - margin * 2) / (thisYearValues.value.length - 1);
  const maxValue = Math.max(...thisYearValues.value, ...lastYearValues.value);

  // Last year
  ctx.beginPath();
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1.5;
  lastYearValues.value.forEach((v, i) => {
    const x = margin + i * step;
    const y = height - (v / maxValue) * (height - margin * 2) - margin;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // This year
  ctx.beginPath();
  ctx.strokeStyle = "#3498db";
  ctx.lineWidth = 2;
  thisYearValues.value.forEach((v, i) => {
    const x = margin + i * step;
    const y = height - (v / maxValue) * (height - margin * 2) - margin;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  thisYearValues.value.forEach((v, i) => {
    const x = margin + i * step;
    const y = height - (v / maxValue) * (height - margin * 2) - margin;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels.value[i], x, height - margin + 15);
  });
};

const drawBarChart = (ctx: CanvasRenderingContext2D) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const count = thisYearValues.value.length;
  const barWidth = (width - margin * 2) / count;
  const max = Math.max(...thisYearValues.value, ...lastYearValues.value);

  for (let i = 0; i < count; i++) {
    const x = margin + i * barWidth;

    const h1 = (lastYearValues.value[i] / max) * (height - margin * 2);
    ctx.fillStyle = "#bbb";
    ctx.fillRect(x, height - h1 - margin, barWidth * 0.3, h1);

    const h2 = (thisYearValues.value[i] / max) * (height - margin * 2);
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(x + barWidth * 0.35, height - h2 - margin, barWidth * 0.3, h2);

    const labelX = x + barWidth / 2;
    ctx.fillStyle = "#333";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels.value[i], labelX, height - margin + 15);
  }
};

const drawAreaChart = (ctx: CanvasRenderingContext2D) => {
  drawLineChart(ctx); // Reuse the same as line chart
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#3498db";
  fillArea(ctx, thisYearValues.value);
  ctx.fillStyle = "#ccc";
  fillArea(ctx, lastYearValues.value);
  ctx.globalAlpha = 1;
};

const fillArea = (ctx: CanvasRenderingContext2D, values: number[]) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const step = (width - margin * 2) / (values.length - 1);
  const max = Math.max(...thisYearValues.value, ...lastYearValues.value);

  ctx.beginPath();
  ctx.moveTo(margin, height - margin);
  values.forEach((v, i) => {
    const x = margin + i * step;
    const y = height - (v / max) * (height - margin * 2) - margin;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(margin + (values.length - 1) * step, height - margin);
  ctx.closePath();
  ctx.fill();
};

// const drawPieChart = (ctx: CanvasRenderingContext2D) => {
//   drawCircularChart(ctx, thisYearValues.value);
// };

// const drawDonutChart = (ctx: CanvasRenderingContext2D) => {
//   drawCircularChart(ctx, thisYearValues.value, true);
// };
const drawDonutChart = (ctx: CanvasRenderingContext2D) => {
  drawDualCircularChart(ctx, thisYearValues.value, lastYearValues.value, true);
};

const drawPieChart = (ctx: CanvasRenderingContext2D) => {
  drawDualCircularChart(ctx, thisYearValues.value, lastYearValues.value, false);
};

const drawDualCircularChart = (
  ctx: CanvasRenderingContext2D,
  outerVals: number[],
  innerVals: number[],
  donut: boolean = false
) => {
  const width = canvas.value!.width;
  const height = canvasHeight;
  const cx = width / 2;
  const cy = height / 2;
  const outerRadius = Math.min(width, height) / 2.5;
  const innerRadius = donut ? outerRadius / 1.7 : outerRadius / 2.2;

  const drawRing = (
    vals: number[],
    radius: number,
    thickness: number,
    baseHue: number = 0,
    desaturate = false
  ) => {
    const total = vals.reduce((a, b) => a + b, 0);
    let start = 0;
    vals.forEach((v, i) => {
      const angle = (v / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + angle);
      ctx.arc(cx, cy, radius - thickness, start + angle, start, true);
      ctx.closePath();
      ctx.fillStyle = desaturate
        ? `hsl(${(i * 90 + baseHue) % 360}, 10%, 80%)`
        : `hsl(${(i * 90 + baseHue) % 360}, 70%, 60%)`;
      ctx.fill();
      start += angle;
    });
  };

  // Draw outer: thisYear
  drawRing(outerVals, outerRadius, donut ? outerRadius / 3 : outerRadius, 0);

  // Draw inner: lastYear
  drawRing(innerVals, innerRadius, donut ? innerRadius / 2 : innerRadius, 180, true);
};


const drawTinyGraph = () => {
  for (const [type, canvas] of Object.entries(tinyCanvases.value)) {
    if (!canvas) continue;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const vals = thisYearValues.value;
    switch (type) {
      case 'line':
        ctx.beginPath();
        ctx.strokeStyle = "#2980b9";
        ctx.lineWidth = 1.5;
        vals.forEach((v, i) => {
          const x = (i + 1) * (w / (vals.length + 1));
          const y = h - (v / Math.max(...vals)) * h;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
        break;
      case 'bar':
        const barW = w / (vals.length * 2);
        ctx.fillStyle = "#27ae60";
        vals.forEach((v, i) => {
          const x = i * (barW * 2) + barW;
          const bh = (v / Math.max(...vals)) * h;
          ctx.fillRect(x, h - bh, barW, bh);
        });
        break;
      case 'area':
        const step = w / (vals.length - 1);
        ctx.beginPath();
        ctx.moveTo(0, h);
        vals.forEach((v, i) => {
          const x = i * step;
          const y = h - (v / Math.max(...vals)) * h;
          ctx.lineTo(x, y);
        });
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = "rgba(52, 152, 219, 0.4)";
        ctx.fill();
        break;
      case 'pie':
      case 'donut':
        const cx = w / 2;
        const cy = h / 2;
        const outer = Math.min(w, h) / 3;
        const inner = type === 'donut' ? outer / 2 : 0;
        const total = vals.reduce((a, b) => a + b, 0);
        let start = 0;
        vals.forEach((v, i) => {
          const slice = (v / total) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(cx, cy, outer, start, start + slice);
          if (type === 'donut') {
            ctx.arc(cx, cy, inner, start + slice, start, true);
          } else {
            ctx.lineTo(cx, cy);
          }
          ctx.closePath();
          ctx.fillStyle = `hsl(${i * 90}, 70%, 60%)`;
          ctx.fill();
          start += slice;
        });
        break;
    }
  }
};

// const handleMouseMove = (e: MouseEvent) => {
//   const rect = canvas.value!.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//   const width = canvas.value!.width;
//   const height = canvasHeight;
//   const margin = 50;
//   const step = (width - margin * 2) / (thisYearValues.value.length - 1);
//   const max = Math.max(...thisYearValues.value, ...lastYearValues.value);

//   // Line/Area hover
//   if (["line", "area"].includes(selectedType.value)) {
//     for (let i = 0; i < thisYearValues.value.length; i++) {
//       const cx = margin + i * step;
//       const cy = height - (thisYearValues.value[i] / max) * (height - margin * 2) - margin;
//       if (Math.abs(x - cx) < 10 && Math.abs(y - cy) < 10) {
//         tooltip.value = {
//           visible: true,
//           x: cx + 10,
//           y: cy - 10,
//           label: labels.value[i],
//           thisYear: thisYearValues.value[i].toString(),
//           lastYear: lastYearValues.value[i].toString()
//         };
//         return;
//       }
//     }
//   }

//   // Bar hover
//   if (selectedType.value === "bar") {
//     const count = thisYearValues.value.length;
//     const barWidth = (width - margin * 2) / count;
//     for (let i = 0; i < count; i++) {
//       const xStart = margin + i * barWidth;
//       const lastBar = {
//         x: xStart,
//         width: barWidth * 0.3,
//         height: (lastYearValues.value[i] / max) * (height - margin * 2),
//       };
//       const thisBar = {
//         x: xStart + barWidth * 0.35,
//         width: barWidth * 0.3,
//         height: (thisYearValues.value[i] / max) * (height - margin * 2),
//       };

//       if (
//         x >= lastBar.x &&
//         x <= lastBar.x + lastBar.width &&
//         y >= height - lastBar.height - margin &&
//         y <= height - margin
//       ) {
//         tooltip.value = {
//           visible: true,
//           x,
//           y,
//           label: labels.value[i],
//           thisYear: thisYearValues.value[i].toString(),
//           lastYear: lastYearValues.value[i].toString()
//         };
//         return;
//       }

//       if (
//         x >= thisBar.x &&
//         x <= thisBar.x + thisBar.width &&
//         y >= height - thisBar.height - margin &&
//         y <= height - margin
//       ) {
//         tooltip.value = {
//           visible: true,
//           x,
//           y,
//           label: labels.value[i],
//           thisYear: thisYearValues.value[i].toString(),
//           lastYear: lastYearValues.value[i].toString()
//         };
//         return;
//       }
//     }
//   }

//   tooltip.value.visible = false;
// };



const handleMouseMove = (e: MouseEvent) => {
  const rect = canvas.value!.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const width = canvas.value!.width;
  const height = canvasHeight;
  const margin = 50;
  const max = Math.max(...thisYearValues.value, ...lastYearValues.value);
  const step = (width - margin * 2) / (thisYearValues.value.length - 1);

  tooltip.value.visible = false;

  // Line/Area hover
  if (["line", "area"].includes(selectedType.value)) {
    for (let i = 0; i < thisYearValues.value.length; i++) {
      const cx = margin + i * step;
      const cy = height - (thisYearValues.value[i] / max) * (height - margin * 2) - margin;
      if (Math.abs(x - cx) < 10 && Math.abs(y - cy) < 10) {
        tooltip.value = {
          visible: true,
          x: cx + 10,
          y: cy - 10,
          label: labels.value[i],
          thisYear: thisYearValues.value[i].toString(),
          lastYear: lastYearValues.value[i].toString()
        };
        return;
      }
    }
  }

  // Bar hover
  if (selectedType.value === "bar") {
    const count = thisYearValues.value.length;
    const barWidth = (width - margin * 2) / count;
    for (let i = 0; i < count; i++) {
      const xStart = margin + i * barWidth;
      const lastHeight = (lastYearValues.value[i] / max) * (height - margin * 2);
      const thisHeight = (thisYearValues.value[i] / max) * (height - margin * 2);

      const bars = [
        { x: xStart, width: barWidth * 0.3, height: lastHeight },
        { x: xStart + barWidth * 0.35, width: barWidth * 0.3, height: thisHeight }
      ];

      for (const bar of bars) {
        if (
          x >= bar.x &&
          x <= bar.x + bar.width &&
          y >= height - bar.height - margin &&
          y <= height - margin
        ) {
          tooltip.value = {
            visible: true,
            x,
            y: y - 10,
            label: labels.value[i],
            thisYear: thisYearValues.value[i].toString(),
            lastYear: lastYearValues.value[i].toString()
          };
          return;
        }
      }
    }
  }

  // Pie/Donut hover
  if (["pie", "donut"].includes(selectedType.value)) {
    const cx = width / 2;
    const cy = height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const outerRadius = Math.min(width, height) / 2.5;
    const innerRadius = selectedType.value === "donut" ? outerRadius / 1.7 : outerRadius / 2.2;
    const outerThickness = selectedType.value === "donut" ? outerRadius / 3 : outerRadius;
    const innerThickness = selectedType.value === "donut" ? innerRadius / 2 : innerRadius;

    const angle = Math.atan2(dy, dx) < 0
      ? Math.atan2(dy, dx) + 2 * Math.PI
      : Math.atan2(dy, dx);

    const checkHoverRing = (
      values: number[],
      ringRadius: number,
      thickness: number
    ): number | null => {
      if (dist < ringRadius - thickness || dist > ringRadius) return null;
      const total = values.reduce((a, b) => a + b, 0);
      let start = 0;
      for (let i = 0; i < values.length; i++) {
        const slice = (values[i] / total) * Math.PI * 2;
        if (angle >= start && angle <= start + slice) return i;
        start += slice;
      }
      return null;
    };

    // Outer ring = thisYear
    let index = checkHoverRing(thisYearValues.value, outerRadius, outerThickness);
    if (index !== null) {
      tooltip.value = {
        visible: true,
        x,
        y: y - 10,
        label: labels.value[index],
        thisYear: thisYearValues.value[index].toString(),
        lastYear: lastYearValues.value[index].toString()
      };
      return;
    }

    // Inner ring = lastYear
    index = checkHoverRing(lastYearValues.value, innerRadius, innerThickness);
    if (index !== null) {
      tooltip.value = {
        visible: true,
        x,
        y: y - 10,
        label: labels.value[index],
        thisYear: thisYearValues.value[index].toString(),
        lastYear: lastYearValues.value[index].toString()
      };
      return;
    }
  }
};


const hideTooltip = () => {
  tooltip.value.visible = false;
};

const scrollLeft = () => {
  if (cardContainer.value) cardContainer.value.scrollLeft -= 100;
};
const scrollRight = () => {
  if (cardContainer.value) cardContainer.value.scrollLeft += 100;
};

const selectGraphType = (type: string) => {
  selectedType.value = type;
  nextTick(drawGraph);
};

const graphTypes = [
  { label: "Line", value: "line" },
  { label: "Bar", value: "bar" },
  { label: "Pie", value: "pie" },
  { label: "Area", value: "area" },
  { label: "Donut", value: "donut" }
];
</script>

<style scoped>
/* keep your existing styles here - omitted for brevity */
</style>

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
