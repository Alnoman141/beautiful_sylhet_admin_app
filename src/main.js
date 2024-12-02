import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import { createApp } from 'vue'
// eslint-disable-next-line import/no-named-as-default
import MasonryWall from '@yeger/vue-masonry-wall'
import vueDebounce from 'vue-debounce'

// quill editor 
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'


// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'

// element ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// Create vue app
const app = createApp(App)

app.directive('debounce', vueDebounce({ lock: true }))

app.use(ElementPlus)
app.use(MasonryWall)

// Register plugins
registerPlugins(app)

// register components
app.component('QuillEditor', QuillEditor)


// Mount vue app
app.mount('#app')
