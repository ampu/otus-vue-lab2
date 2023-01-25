import type {App} from 'vue'
import FocusDirective from '@/directives/focus-directive'

export default function installDirectives(app: App) {
  app.directive('focus', new FocusDirective())
}
