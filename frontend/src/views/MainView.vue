<template>
    <div id="app">
        <div class="container">
            <el-container style="height: 100vh; overflow: hidden;">
                <el-header class="header-bg">
                    <div class="header-content">
                        主动交互聚类框架
                    </div>
                </el-header>
                <el-container>
                    <el-aside width="25%" class="aside-parent">
                        <el-card class="aside-child" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <span>交互处理</span>
                                    <!-- 添加切换按钮 -->
                                    <el-button-group>
                                        <el-button type="primary" :plain="interactionMode !== 'manual'"
                                            @click="switchInteractionMode('manual')">
                                            手动
                                        </el-button>
                                        <el-button type="primary" :plain="interactionMode !== 'auto'"
                                            @click="switchInteractionMode('auto')">
                                            自动
                                        </el-button>
                                    </el-button-group>
                                </div>
                            </template>
                            <interaction ref="interactionRef" @outputInteractionInfo="inputInteractionInfo"
                                @outputNewConstraint="addNewConstraint" @outputDistributionInfo="updateDistribution" />
                        </el-card>
                        <el-card class="aside-child" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <span>约束图</span>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div style="height: 300px">
                                <constraint-graph ref="constraintGraphRef" />
                            </div>
                        </el-card>
                        <el-card class="aside-child console-card" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <span>控制台</span>
                                    <el-button class="button" @click="clearConsole">Clean</el-button>
                                </div>
                            </template>
                            <consoles ref="consoleRef" />
                        </el-card>
                    </el-aside>
                    <el-container class="aside-parent">
                        <el-card class="main-child" shadow="hover">
                            <statistic @startMock="startMock" @stopMock="stopMock" :isMockRunning="isMockRunning" />
                        </el-card>
                        <el-card class="main-child" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <span>集群可视化</span>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div style="height: 70vh">
                                <skeleton ref="skeletonRef" />
                            </div>
                        </el-card>
                    </el-container>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import statistic from '@/views/statistic.vue';
import skeleton from '@/views/Skeleton.vue';
import interaction from '@/views/Interaction.vue';
import consoles from '@/views/Consoles.vue';
import constraintGraph from '@/views/ConstraintGraph.vue';
import axios from '@/plugins/axios';

const router = useRouter();
const interactionRef = ref<any>();
const consoleRef = ref<any>();
const constraintGraphRef = ref<any>();
const skeletonRef = ref<any>();
const isMockRunning = ref(false); // 控制按钮状态
const interactionMode = ref('manual'); // 当前交互模式

function startMock() {
    console.log('Start Mock triggered');
    if (interactionMode.value === 'auto') {
        console.log('Auto mode, start automatically');
        interactionRef.value.processItem_auto(); // 调用 Interaction 组件的逻辑
    } else {
        console.log('Manual mode, waiting for user interaction');
        interactionRef.value.processItem_manual(); // 调用 Interaction 组件的逻辑
    }
    isMockRunning.value = true; // 设置为运行状态
}

function stopMock() {
    console.log('Stop Mock triggered');
    interactionRef.value.stopMock(); // 调用 Interaction 组件的逻辑
    isMockRunning.value = false; // 设置为停止状态
}

// 重置所有组件状态
function resetComponents() {
    interactionRef.value.resetState(); // 重置 Interaction 组件
    consoleRef.value.clearConsole(); // 清空 Console 组件
    constraintGraphRef.value.resetGraph(); // 重置 Constraint Graph 组件
    skeletonRef.value.resetVisualization(); // 重置 Visualization 图表
    console.log('All components reset to initial state');
}

// 切换交互模式
function switchInteractionMode(mode: string) {
    interactionMode.value = mode;
    interactionRef.value.switchMode(mode); // 调用 Interaction 组件的切换模式方法
    resetComponents(); // 重置所有组件状态
    console.log(`Switched to ${mode} mode`);
}

function inputInteractionInfo(info: any) {
    consoleRef.value.inputInteractionInfo(info);
}

function addNewConstraint(info: any) {
    constraintGraphRef.value.addNewConstraint(info);
}

function updateDistribution(info: any) {
    skeletonRef.value.updateDistribution(info);
}

// 清空 Console 内容
function clearConsole() {
    consoleRef.value.clearConsole();
}

</script>

<style scoped>
.my_header {
    height: 70px;
    color: black;
    font-size: xxx-large;
    line-height: 70px;
    width: 100%;
}

.header-bg {
  background-color: #ffffff; /* 白色背景 */
  height: 70px; /* 高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  border-bottom: 1px solid #dcdcdc; /* 添加底部边框 */
  box-sizing: border-box; /* 包括 padding 和 border */
}

.header-content {
  width: 95%; /* 与页面内容对齐 */
  max-width: 1200px; /* 限制最大宽度 */
  font-size: 36px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  text-align: center; /* 居中对齐 */
}

:deep(.el-card__header) {
    background-color: #088DBD !important;
    /* 设置背景颜色 */
    color: white !important;
    /* 设置字体颜色 */
}


.aside-parent {
    border-radius: 10px;
    margin: 10px;
    display: flex;
    height: 130vh;
    flex-direction: column;
}

.card-header {
    font: x-large bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.aside-child {
    margin-bottom: 20px;
    height: 28.5%;
    /* 调整高度比例 */
}

.console-card {
    height: 127px;
    /* 调整 Console 容器的高度 */
    margin-bottom: 10px;
    /* 调整与其他组件的间距 */
}

.main-child {
    margin-bottom: 20px;
    height: 10%;
    /* 调整 Statistic 和 Visualization 的高度 */
}

.main-child:last-child {
    height: 58.5%;
    /* 调整 Visualization 的高度 */
    margin-bottom: 0;
}
</style>