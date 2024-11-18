import HelloSubVue from '../browserWindow/HelloSub.vue'
import HelloSubVue2 from '../browserWindow/HelloSub2.vue'
import HelloSubVue3 from '../browserWindow/HelloSub3.vue'

const subWindows = [
  {
    'key': 'subWindow1',
    'title': '打开新窗口1',
    'component': HelloSubVue,
    'props': {
      'message': '这是新窗口1',
      'prop2': 'value2',
    },
  },
  {
    'key': 'subWindow2',
    'title': '打开新窗口2',
    'component': HelloSubVue2,
    'props': {
      'message': '这是新窗口2',
      'prop2': 'value2',
    },
  },
  {
    'key': 'subWindow3',
    'title': 'Device Status',
    'component': HelloSubVue3,
    'props': {
      'message': '这是新窗口3',
      'prop2': 'value2',
    },
  },
]

export { subWindows }
