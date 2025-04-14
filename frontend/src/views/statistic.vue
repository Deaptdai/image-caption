<template>
  <el-row>
    <el-col :span="8">
      <el-countdown title="启动模拟" :value="Date.now() + value" />
      <el-button class="countdown-footer" :type="isMockRunning ? 'danger' : 'success'" @click="toggleMock">
        {{ isMockRunning ? 'Stop Mock' : '开始模拟' }}
      </el-button>
    </el-col>
    <el-col :span="8">
      <el-countdown title="剩余 VIP 时间" format="HH:mm:ss" :value="value1" />
      <el-button class="countdown-footer" type="primary" @click="reset">
        重置
      </el-button>
    </el-col>
    <el-col :span="8">
      <el-countdown format="DD [days] HH:mm:ss" :value="value2">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon style="margin-right: 4px" :size="12">
              <Calendar />
            </el-icon>
            到下个月时间
          </div>
        </template>
      </el-countdown>
      <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const emit = defineEmits(['startMock', 'stopMock']);
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import { Calendar } from '@element-plus/icons-vue';

const isMockRunning = ref(false); // 控制按钮状态
const value = ref(0); // 从 0 开始计时
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2); // 未来时间戳
const value2 = ref(dayjs().add(1, 'month').startOf('month')); // 下个月的开始时间
let timerId: number | null = null; // 定时器 ID

// 页面加载时启动定时器
onMounted(() => {
  value.value = 0; // 从 0 开始计时
  timerId = setInterval(() => {
    value.value += 1000; // 每秒增加 1 秒
  }, 1000);
});

// 页面卸载时清除定时器
onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});

// 切换按钮状态并触发相应事件
function toggleMock() {
  if (isMockRunning.value) {
    emit('stopMock');
    isMockRunning.value = false;
  } else {
    emit('startMock');
    isMockRunning.value = true;
  }
}

function reset() {
  value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2;
}
</script>

<style scoped>
.el-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>