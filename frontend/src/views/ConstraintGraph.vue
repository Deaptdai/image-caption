<template>
  <div id="constraintGraph" style="width: 100%;height:100%;"></div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts/core';
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {GraphChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {inject, nextTick, onMounted} from 'vue';

let option;
let nodes = [
      {
        "name": "0",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "1",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "2",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "3",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "4",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "5",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "6",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "7",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "8",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "9",
        "symbolSize": 16,
        "value": 1,
        "category": 0
      },
      {
        "name": "10",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "11",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "12",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "13",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "14",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "15",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "16",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "17",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "18",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "19",
        "symbolSize": 16,
        "value": 1,
        "category": 1
      },
      {
        "name": "20",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "21",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "22",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "23",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "24",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "25",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "26",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "27",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "28",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "29",
        "symbolSize": 16,
        "value": 1,
        "category": 2
      },
      {
        "name": "30",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "31",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "32",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "33",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "34",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "35",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "36",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "37",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "38",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "39",
        "symbolSize": 16,
        "value": 1,
        "category": 3
      },
      {
        "name": "40",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "41",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "42",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "43",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "44",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "45",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "46",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "47",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "48",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      },
      {
        "name": "49",
        "symbolSize": 16,
        "value": 1,
        "category": 4
      }
    ]
let edges = []
let categories =[
  {
    "name": "Aaron"
  },
  {
    "name": "Benson"
  },
  {
    "name": "Cameron"
  },
  {
    "name": "Denny"
  },
  {
    "name": "Eddie"
  }
]
let myChart;

function setOption(nodes: any, edges: any) {
  let option: any = {
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'Constraint Graph',
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: edges,
        animation: false,
        categories: categories,
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        }
      }
    ]
  };
  return option
}

onMounted(() => {
  let chartDom = document.getElementById('constraintGraph');
  echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);
  myChart = echarts.init(chartDom);
})

function addNewConstraint(info:any) {
  console.log(info)
  edges.push({
    "source": info.source,
    "target": info.target,
    lineStyle: {
      color: info.result ? 'black' : 'red',
      width: 5,
    }
  },)
  option = setOption(nodes, edges);
  myChart.setOption(option);
}

function resetGraph() {
    edges = []; // 清空边数据
    myChart.clear(); // 清空图表
    console.log('Constraint Graph reset');
}
defineExpose({ addNewConstraint, resetGraph });
</script>

<style scoped>

</style>