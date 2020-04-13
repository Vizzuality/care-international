import queryString from "query-string";
// const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? 'care-international' : null;

const getLocation = (options) => {

  let qs = queryString.stringify({
    program: options.program === "overall" ? undefined : options.program,
  });

  let parts = [];

  // if (prefix) {
  //   parts.push(encodeURIComponent(prefix));
  // }

  if (options.mainView) {
    parts.push(options.mainView);
  }

  if (options.subView) {
    parts.push(options.subView);
  }

  if (options.region) {
    parts.push(encodeURIComponent(options.region));
  }

  if (options.country) {
    parts.push(encodeURIComponent(options.country));
  }

  if (options.year) {
    parts.push(encodeURIComponent(options.year));
  }

  if (options.story) {
    parts.push("story", encodeURIComponent(options.story));
  }

  let location = "/" + parts.join("/") + (qs ? `?${qs}` : "");

  return location;
};

export default getLocation;
