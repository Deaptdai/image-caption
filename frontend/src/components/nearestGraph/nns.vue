<template>

</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {GraphChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {inject, nextTick, onMounted} from 'vue';

let option;
let data: any = {
  "nodes": [
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
  ],
  "edges":[
    {
      "source": 0,
      "target": 2
    },
    {
      "source": 0,
      "target": 3
    },
    {
      "source": 0,
      "target": 6
    },
    {
      "source": 0,
      "target": 7
    },
    {
      "source": 0,
      "target": 33
    },
    {
      "source": 1,
      "target": 4
    },
    {
      "source": 3,
      "target": 5
    },
    {
      "source": 4,
      "target": 9
    },
    {
      "source": 4,
      "target": 12
    },
    {
      "source": 6,
      "target": 8
    },
    {
      "source": 10,
      "target": 12
    },
    {
      "source": 10,
      "target": 14
    },
    {
      "source": 11,
      "target": 12
    },
    {
      "source": 11,
      "target": 13
    },
    {
      "source": 11,
      "target": 18
    },
    {
      "source": 12,
      "target": 16
    },
    {
      "source": 12,
      "target": 17
    },
    {
      "source": 12,
      "target": 33
    },
    {
      "source": 15,
      "target": 18
    },
    {
      "source": 16,
      "target": 19
    },
    {
      "source": 20,
      "target": 28
    },
    {
      "source": 21,
      "target": 22
    },
    {
      "source": 21,
      "target": 28
    },
    {
      "source": 23,
      "target": 24
    },
    {
      "source": 24,
      "target": 26
    },
    {
      "source": 25,
      "target": 26
    },
    {
      "source": 26,
      "target": 27
    },
    {
      "source": 26,
      "target": 32
    },
    {
      "source": 26,
      "target": 40
    },
    {
      "source": 28,
      "target": 29
    },
    {
      "source": 28,
      "target": 33
    },
    {
      "source": 30,
      "target": 37
    },
    {
      "source": 31,
      "target": 38
    },
    {
      "source": 32,
      "target": 35
    },
    {
      "source": 32,
      "target": 37
    },
    {
      "source": 33,
      "target": 34
    },
    {
      "source": 33,
      "target": 36
    },
    {
      "source": 33,
      "target": 38
    },
    {
      "source": 33,
      "target": 41
    },
    {
      "source": 34,
      "target": 39
    },
    {
      "source": 40,
      "target": 41
    },
    {
      "source": 40,
      "target": 43
    },
    {
      "source": 40,
      "target": 44
    },
    {
      "source": 40,
      "target": 49
    },
    {
      "source": 41,
      "target": 42
    },
    {
      "source": 41,
      "target": 48
    },
    {
      "source": 43,
      "target": 46
    },
    {
      "source": 44,
      "target": 45
    },
    {
      "source": 47,
      "target": 48
    }
  ],
  "categories": [
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
}
let myChart;

function setOption(nodes: any, edges: any, categories: any) {
  let option: any = {
    title: {
      text: 'Les Miserables',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
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
        name: 'Les Miserables',
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: edges,
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
  let chartDom = document.getElementById('nns');
  echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);
  myChart = echarts.init(chartDom);
  option = setOption(data.nodes, data.edges, data.categories);
  myChart.setOption(option);
})
</script>

<style scoped>

</style>