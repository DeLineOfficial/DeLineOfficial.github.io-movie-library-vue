/// <reference types="vite/client" />

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FontAwesomeIcon: typeof import('@fortawesome/vue-fontawesome')['FontAwesomeIcon']
  }
}