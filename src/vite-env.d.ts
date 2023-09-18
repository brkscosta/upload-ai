/// <reference types="vite/client" />

interface ImportMetaEnv {
  /*
    Base url for backed
  */
  readonly VITE_BACKEND_URL: string

  /*
    Complete API end point
  */
  readonly VITE_COMPLETE_URL: string

  /*
    API version
  */
  readonly VITE_API_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
