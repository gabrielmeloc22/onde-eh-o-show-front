const IS_BROWSER = typeof window !== "undefined";

export const initMocks = async () => {
  if (IS_BROWSER) {
    const { worker } = require("./browser") as typeof import("./browser");
    worker.start({ onUnhandledRequest: "bypass" });
  } else {
    const { server } = await import("./server");
    server.listen();
  }
};
