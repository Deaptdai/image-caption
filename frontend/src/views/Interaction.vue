<template>
  <el-row class="plane" :gutter="20">
    <el-col :span="8">
      <img class="child" :src="image0" alt="Image 0">
      <div>{{ Id0 }}</div>
      <!-- 上传按钮 -->
      <el-upload v-if="mode === 'manual'" class="upload-demo" action="" :show-file-list="false" accept="image/*"
        :on-change="handleImage0Upload">
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
    </el-col>
    <el-col :span="8">
      <View v-if="relation === 'normal'" class="child" style="color: #909399;" />
      <Select v-else-if="relation === 'accept'" class="child" style="color: #67C23A" />
      <CloseBold v-else class="child" style="color: #F56C6C" />
    </el-col>
    <el-col :span="8">
      <img class="child" :src="image1" alt="Image 1">
      <div>{{ Id1 }}</div>
      <!-- 上传按钮 -->
      <el-upload v-if="mode === 'manual'" class="upload-demo" action="" :show-file-list="false" accept="image/*"
        :on-change="handleImage1Upload">
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
    </el-col>
  </el-row>
  <el-divider />
  <el-row class="buttonGroup">
    <el-button type="success" icon="CircleCheck" size="large" style="width: 100px" @click="relation = 'accept'">接受
    </el-button>
    <el-button type="danger" icon="CircleClose" size="large" style="width: 100px" @click="relation = 'refuse'">拒绝
    </el-button>
    <el-button type="warning" icon="CircleClose" size="large" style="width: 100px" @click="relation = 'normal'">重置
    </el-button>
    <!-- <el-button type="warning" icon="CircleClose" size="large" style="width: 150px" @click="initData">init -->
    <!-- </el-button> -->
  </el-row>
</template>

<script setup lang="ts">
const emit = defineEmits(['outputInteractionInfo', 'outputNewConstraint', 'outputDistributionInfo']);
import mockData from '@/assets/faceInteraction.json';
import { el, it } from 'element-plus/es/locale/index.mjs';
import { ref } from 'vue';

let label = mockData.result_labels;
// let interaction = mockData.result_interactions;
let image0 = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
let image1 = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
let Id0 = ref(0);
let Id1 = ref(1);
let relation = ref('normal');
let mode = ref('manual'); // 当前模式，默认为 manual
let iterId_0 = 1;
let image0_val=0;
let image1_val=1;

let timerId = null; // 用于存储定时器 ID

function handleImage0Upload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    image0.value = e.target?.result; // 更新为 Base64 数据
    image0_val = file.raw.name; // 更新为文件名
    console.log('Uploaded Image 0:', image0.value);
  };
  reader.readAsDataURL(file.raw); // 读取文件为 Base64
}

function handleImage1Upload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    image1.value = e.target?.result; // 更新为 Base64 数据
    image1_val = file.raw.name;
    console.log('Uploaded Image 1:', image1.value);
  };
  reader.readAsDataURL(file.raw); // 读取文件为 Base64
}

function extractFileName(url) {
  // 如果 url 是文件名，直接返回
  if (!url.includes('/')) {
    return url.split('.')[0]; // 去掉扩展名
  }

  // 如果 url 是完整路径，解析文件名
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.split('.')[0]; // 去掉扩展名
}

function initData_default() {
  let data = [];
  mockData.iteration.forEach((item, index) => {
    item.edges.forEach((value, i) => {
      data.push({
        iterId: item.iter,
        constraint: value,
        result: item.result[i] === 'like',
        distribution: item.result_labels,
      });
    });
  });
  return data;
}

function initData() {
  let data = [];

  const dynamicId0 = extractFileName(image0_val);
  const dynamicId1 = extractFileName(image1_val);

  // alert('Index:' + dynamicId0 + 'and' + 'Index:'+ dynamicId1);

  // 根据当前图片和 relation 值生成数据
  const constraint = [dynamicId0, dynamicId1];
  const result = relation.value === 'accept'; // 'accept' 为 true，其他为 false
  let distribution = mockData.iteration[0].result_labels; // 使用 mockData 中的分布标签

  // 将生成的数据推入数组
  data.push({
    iterId: iterId_0,
    constraint: constraint,
    result: result,
    distribution: distribution,
  });

  return data;
}

function traverseData(array, interval = 1000) {
  let index = 0; // 当前遍历的索引
  timerId = setInterval(() => {
    if (index < array.length) {
      relation.value = 'normal';
      image0.value = '/src/assets/interaction/' + String(array[index].constraint[0]) + '.svg';
      image1.value = '/src/assets/interaction/' + String(array[index].constraint[1]) + '.svg';
      Id0.value = array[index].constraint[0];
      Id1.value = array[index].constraint[1];
      console.log(array[index]);

      relation.value = array[index].result ? 'accept' : 'refuse';

      let outputInfo = {
        id: index,
        iterId: array[index].iterId,
        type: 'info',
        source: image0.value,
        sourceId: array[index].constraint[0],
        target: image1.value,
        targetId: array[index].constraint[1],
        result: array[index].result,
      };

      outputNewConstraint({
        source: array[index].constraint[0],
        target: array[index].constraint[1],
        result: array[index].result,
      });
      outputInteractionInfo(outputInfo);
      outputDistributionInfo(array[index].distribution);

      index++;

    } else {
      clearInterval(timerId);
      timerId = null;

      // 通知父组件 Mock 已完成
      emit('mockCompleted');
    }
  }, interval);
}

function stopMock() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    console.log('Mock stopped');
  }
}

function outputInteractionInfo(info) {
  emit('outputInteractionInfo', info);
}

function outputNewConstraint(info) {
  emit('outputNewConstraint', info);
}

function outputDistributionInfo(info) {
  emit('outputDistributionInfo', info);
}

function processItem_auto() {
  traverseData(initData_default());
}

function processItem_manual() {
  traverseData(initData());
  iterId_0++;
}

// 切换模式
function switchMode(newMode) {
  mode.value = newMode;
  resetState();
}

// 重置到初始状态
function resetState() {
  stopMock();
  image0.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  image1.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  Id0.value = 0;
  Id1.value = 1;
  relation.value = 'normal';
}

defineExpose({ processItem_auto, processItem_manual, stopMock, switchMode, resetState });
</script>

<style scoped>
.plane {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 垂直居中对齐 */
}

.plane>div {
  position: relative;
  /* 设置为相对定位，以便子元素可以绝对定位 */
  padding-bottom: 10px;
  /* 增加底部内边距，将内容整体向下移动 */
}

.plane>div>.child {
  height: 135px;
  /* 调整图片高度 */
  width: 135px;
  /* 调整图片宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.plane>div>div {
  position: absolute;
  /* 绝对定位 */
  bottom: -20px;
  /* 调整到图片底部 */
  left: 50%;
  /* 水平居中 */
  transform: translateX(-50%);
  /* 修正水平偏移 */
  color: #CBBD19;
  /* 设置文字颜色为黄色 */
  font-weight: bold;
  /* 设置文字加粗 */
  font-size: 16px;
  /* 设置文字大小 */
  text-align: center;
  /* 居中对齐 */
}

.buttonGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
}

.upload-demo {
  margin-top: 10px;
  text-align: center;
}
</style>