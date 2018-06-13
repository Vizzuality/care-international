import queryString from "query-string";

const getLocation = (options) => {

  let qs = queryString.stringify({
    program: options.program === "overall" ? undefined : options.program,
  });

  let parts = [];

  if (options.year) {
    parts.push(encodeURIComponent(options.year));
  }

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

  if (options.story) {
    parts.push("story", encodeURIComponent(options.story));
  }

  let location = "/" + parts.join("/") + (qs ? `?${qs}` : "");

  return location;
};

export default getLocation;
