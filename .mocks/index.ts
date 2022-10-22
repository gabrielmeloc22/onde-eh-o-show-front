const IS_BROWSER = typeof window !== "undefined";
let HAS_STARTED = false;

export const initMocks = async () => {
  if (IS_BROWSER && !HAS_STARTED) {
    import("./browser").then(({ worker }) =>
      worker
        .start({
          quiet: true,
          onUnhandledRequest: "bypass",
        })
        .then(() => {
          HAS_STARTED = true;
        })
    );
  }
};
