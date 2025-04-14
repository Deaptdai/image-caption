<template>
  <div id="main" style="width: 100%;height:100%;"></div>
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
      "id": 0,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 1,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 2,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 3,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 4,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 5,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 6,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 7,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 8,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 9,
      "name": "Aaron",
      "category": 4
    },
    {
      "id": 10,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 11,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 12,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 13,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 14,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 15,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 16,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 17,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 18,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 19,
      "name": "Benson",
      "category": 4
    },
    {
      "id": 20,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 21,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 22,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 23,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 24,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 25,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 26,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 27,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 28,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 29,
      "name": "Cameron",
      "category": 4
    },
    {
      "id": 30,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 31,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 32,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 33,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 34,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 35,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 36,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 37,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 38,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 39,
      "name": "Denny",
      "category": 4
    },
    {
      "id": 40,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 41,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 42,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 43,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 44,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 45,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 46,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 47,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 48,
      "name": "Eddie",
      "category": 4
    },
    {
      "id": 49,
      "name": "Eddie",
      "category": 4
    }
  ],
  "edges": [
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

function initData(n,e,c) :any{
  let Data = {nodes:[],edges:[],categories:[]}
  Data.nodes = n.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      symbolSize: 16,
      // symbol:'image://src/assets/interaction/' + String(item.id) + '.svg',
      itemStyle: {
        shadowColor: 'black'
      }
    }
  })
  Data.edges = e.map((item: any) => {
    return {
      source: item.source,
      target: item.target,
      lineStyle: {
        color: 'black',
        width: 5
      }
    }
  })
  Data.categories = c.map((item: any) => {
    return {
      name: item.name
    }
  })
  return Data
}

function setOption(nodes: any, edges: any, categories: any) {
  let option: any = {
    title: {
      text: 'Data Skeleton',
      // subtext: 'Default layout',
      top: '620px',
      left: 'right',
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
  let chartDom = document.getElementById('main');
  echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);
  myChart = echarts.init(chartDom);
  let d = initData(data.nodes,data.edges,data.categories)
  option = setOption(d.nodes, d.edges, d.categories);
  myChart.setOption(option);
})

function updateDistribution(distribution: any) {
  let nodes = data.nodes.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      category: distribution[item.id]
    }
  })
  let d = initData(nodes,data.edges,data.categories)
  option = setOption(d.nodes, d.edges, d.categories);
  myChart.setOption(option);
}

function resetVisualization() {
    // 初始化数据
    let d = initData(data.nodes, data.edges, data.categories);
    option = setOption(d.nodes, d.edges, d.categories);
    myChart.setOption(option); // 重新设置图表
    console.log('Visualization reset to initial state');
}
defineExpose({ updateDistribution, resetVisualization });
</script>

<style scoped>

</style>