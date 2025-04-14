<template>
  <div class="console-content">
    <span v-for="(item, index) in infomations" :key="index" :value="item" class="console-item">
      <el-text :type="item.type" font-size="16px">
        index: {{ item.id }}, object1: {{ item.sourceId }}, object2: {{ item.targetId }},
        result:
        <el-text :type="item.result ? 'success' : 'danger'">
          {{ item.result ? 'Must-Link' : 'Cannot-Link' }}
        </el-text>
      </el-text>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let infomations = ref([]);

// 添加清空方法
function clearConsole() {
  infomations.value = [];
}

// 暴露方法供父组件调用
defineExpose({
  inputInteractionInfo,
  clearConsole,
});

// 修改 inputInteractionInfo 方法，只更新第一行内容
function inputInteractionInfo(info: any) {
  console.log(info);
  if (infomations.value.length > 0) {
    infomations.value[0] = info; // 替换第一行内容
  } else {
    infomations.value.push(info); // 如果为空，则添加第一行内容
  }
}
</script>

<style scoped>
.console-content {
  height: 16px; /* 限制高度为一行 */
  overflow: hidden; /* 隐藏多余内容 */
  white-space: nowrap; /* 强制内容不换行 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

.console-item {
  line-height: 50px; /* 与容器高度一致 */
}
</style>