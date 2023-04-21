const getPublic = (src: string) => {
  if (process.env.DEPLOY === "deploy") {
    return `/usdc-bridge${src}`
  }
  if (typeof window !== "undefined" && window.location?.href.includes('github')) {
    return `/usdc-bridge${src}`
  }
  return src
}

export default getPublic;